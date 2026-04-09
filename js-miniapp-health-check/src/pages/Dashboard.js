import React, { useReducer, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Divider,
  Button,
  Chip,
  Tooltip,
  Paper,
  Collapse,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
  SDK_CHECKS,
  CHECK_STATUS,
  getChecksByCategory,
  getSummaryStats,
} from '../services/sdkChecks';
import {
  hasStoredResults,
  getStoredResults,
  getStoredLastRunAt,
  setStoredResult,
  setStoredLastRunAt,
  clearStore,
} from '../services/healthCheckStore';
import StatusBadge from '../components/StatusBadge';

const TIMEOUT_MS = 30000;

// ─── Styles ──────────────────────────────────────────────────────────────────

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f4f6f8',
  },
  appBar: {
    backgroundColor: '#1a237e',
    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  titleBlock: {
    flex: 1,
  },
  appTitle: {
    fontWeight: 700,
    fontSize: '1.1rem',
    lineHeight: 1.2,
    color: '#fff',
  },
  appSubtitle: {
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1,
  },
  runButton: {
    backgroundColor: '#fff',
    color: '#1a237e',
    fontWeight: 700,
    fontSize: '0.72rem',
    padding: '5px 14px',
    borderRadius: 20,
    '&:hover': {
      backgroundColor: '#e8eaf6',
    },
    '&:disabled': {
      backgroundColor: 'rgba(255,255,255,0.4)',
      color: 'rgba(255,255,255,0.6)',
    },
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 8px 24px',
  },
  summaryCard: {
    borderRadius: 12,
    padding: '12px 16px',
    marginBottom: 12,
    background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  summaryLabel: {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: '#546e7a',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  summaryRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  statChip: {
    fontWeight: 700,
    fontSize: '0.72rem',
    height: 26,
    borderRadius: 13,
    cursor: 'pointer',
    transition: 'transform 0.1s, box-shadow 0.1s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  statChipActive: {
    boxShadow: '0 0 0 2px #1a237e',
    transform: 'scale(1.05)',
  },
  lastRunText: {
    fontSize: '0.68rem',
    color: '#90a4ae',
    marginTop: 6,
  },
  activeFilterBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e8eaf6',
    borderRadius: 8,
    padding: '6px 12px',
    marginBottom: 8,
    fontSize: '0.75rem',
    color: '#1a237e',
    fontWeight: 600,
  },
  clearFilter: {
    fontSize: '0.7rem',
    color: '#3949ab',
    cursor: 'pointer',
    fontWeight: 700,
    textDecoration: 'underline',
  },
  categorySection: {
    marginBottom: 8,
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 14px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  categoryTitle: {
    flex: 1,
    fontWeight: 700,
    fontSize: '0.85rem',
    color: '#1a237e',
  },
  categoryCount: {
    fontSize: '0.72rem',
    color: '#90a4ae',
    marginRight: 8,
  },
  categoryPassCount: {
    color: '#2e7d32',
    fontWeight: 700,
  },
  categoryFailCount: {
    color: '#c62828',
    fontWeight: 700,
  },
  checkList: {
    padding: 0,
    backgroundColor: '#fff',
  },
  // Replaced ListItemSecondaryAction approach with a fully-clickable flex row
  checkItem: {
    padding: 0,
    cursor: 'pointer',
    display: 'block',
    '&:hover': {
      backgroundColor: '#f0f4ff',
    },
    borderLeft: '3px solid transparent',
  },
  checkItemFailed: {
    borderLeft: '3px solid #ef5350',
    backgroundColor: '#fff8f8',
    '&:hover': {
      backgroundColor: '#ffebee',
    },
  },
  checkItemSuccess: {
    borderLeft: '3px solid #66bb6a',
  },
  checkItemSkipped: {
    borderLeft: '3px solid #ffca28',
    opacity: 0.8,
  },
  checkRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 14px',
    width: '100%',
    gap: 8,
  },
  checkText: {
    flex: 1,
    minWidth: 0,
  },
  checkName: {
    fontFamily: 'monospace',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#263238',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  checkMeta: {
    fontSize: '0.68rem',
    color: '#78909c',
    marginTop: 2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  checkRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  chevron: {
    fontSize: 16,
    color: '#b0bec5',
  },
  divider: {
    marginLeft: 14,
  },
}));

// ─── Reducer ─────────────────────────────────────────────────────────────────

function buildInitialState() {
  // Restore from store if available (back navigation, re-mount).
  // Merge stored results with defaults so any check missing from the store
  // (e.g. non-auto-testable checks that were never explicitly saved) still
  // renders with the correct SKIPPED status instead of showing as Pending.
  if (hasStoredResults()) {
    const stored = getStoredResults();
    const results = {};
    for (const check of SDK_CHECKS) {
      results[check.id] = stored[check.id] || {
        status: check.isAutoTestable ? CHECK_STATUS.PENDING : CHECK_STATUS.SKIPPED,
        result: null,
        error: null,
      };
    }
    return { results, lastRunAt: getStoredLastRunAt(), isRunning: false };
  }
  const results = {};
  for (const check of SDK_CHECKS) {
    results[check.id] = {
      status: check.isAutoTestable ? CHECK_STATUS.PENDING : CHECK_STATUS.SKIPPED,
      result: null,
      error: null,
    };
  }
  return { results, lastRunAt: null, isRunning: false };
}

function reducer(state, action) {
  switch (action.type) {
    case 'START_RUN':
      return {
        ...state,
        isRunning: true,
        results: SDK_CHECKS.reduce((acc, check) => {
          acc[check.id] = {
            status: check.isAutoTestable ? CHECK_STATUS.PENDING : CHECK_STATUS.SKIPPED,
            result: null,
            error: null,
          };
          return acc;
        }, {}),
      };
    case 'SET_RUNNING':
      return {
        ...state,
        results: {
          ...state.results,
          [action.id]: { status: CHECK_STATUS.RUNNING, result: null, error: null },
        },
      };
    case 'SET_SUCCESS':
      return {
        ...state,
        results: {
          ...state.results,
          [action.id]: { status: CHECK_STATUS.SUCCESS, result: action.result, error: null },
        },
      };
    case 'SET_FAILURE':
      return {
        ...state,
        results: {
          ...state.results,
          [action.id]: { status: CHECK_STATUS.FAILURE, result: null, error: action.error },
        },
      };
    case 'FINISH_RUN':
      return { ...state, isRunning: false, lastRunAt: action.at };
    default:
      return state;
  }
}

// ─── Timeout helper ───────────────────────────────────────────────────────────

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${ms / 1000}s`)), ms)
  );
  return Promise.race([promise, timeout]);
}

// ─── Category Panel ───────────────────────────────────────────────────────────

function CategoryPanel({ categoryName, checks, results, onCheckClick }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const passed = checks.filter((c) => results[c.id]?.status === CHECK_STATUS.SUCCESS).length;
  const failed = checks.filter((c) => results[c.id]?.status === CHECK_STATUS.FAILURE).length;
  const total = checks.filter((c) => c.isAutoTestable).length;

  if (checks.length === 0) return null;

  return (
    <Paper className={classes.categorySection} elevation={0}>
      <div className={classes.categoryHeader} onClick={() => setOpen((o) => !o)}>
        <Typography className={classes.categoryTitle}>{categoryName}</Typography>
        {total > 0 && (
          <span className={classes.categoryCount}>
            {failed > 0 && (
              <span className={classes.categoryFailCount}>{failed}✗ </span>
            )}
            <span className={classes.categoryPassCount}>{passed}</span>
            <span>/{total}</span>
          </span>
        )}
        {open ? (
          <ExpandLessIcon style={{ fontSize: 18, color: '#90a4ae' }} />
        ) : (
          <ExpandMoreIcon style={{ fontSize: 18, color: '#90a4ae' }} />
        )}
      </div>
      <Collapse in={open}>
        <List className={classes.checkList} disablePadding>
          {checks.map((check, idx) => {
            const r = results[check.id] || {};
            const isFailed = r.status === CHECK_STATUS.FAILURE;
            const isSuccess = r.status === CHECK_STATUS.SUCCESS;
            const isSkipped = r.status === CHECK_STATUS.SKIPPED;

            return (
              <React.Fragment key={check.id}>
                {idx > 0 && <Divider className={classes.divider} />}
                <ListItem
                  disableGutters
                  className={`${classes.checkItem} ${
                    isFailed
                      ? classes.checkItemFailed
                      : isSuccess
                      ? classes.checkItemSuccess
                      : isSkipped
                      ? classes.checkItemSkipped
                      : ''
                  }`}
                  onClick={() => onCheckClick(check, r)}
                >
                  <div className={classes.checkRow}>
                    <div className={classes.checkText}>
                      <div className={classes.checkName}>{check.name}</div>
                      <div className={classes.checkMeta}>
                        {isFailed && r.error
                          ? `✗ ${r.error}`
                          : isSuccess && r.result
                          ? `✓ ${r.result}`
                          : isSkipped
                          ? check.reason
                          : check.description}
                      </div>
                    </div>
                    <div className={classes.checkRight}>
                      <StatusBadge status={r.status || CHECK_STATUS.PENDING} />
                      <ChevronRightIcon className={classes.chevron} />
                    </div>
                  </div>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Collapse>
    </Paper>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

const FILTER_LABELS = {
  [CHECK_STATUS.SUCCESS]: 'Passed',
  [CHECK_STATUS.FAILURE]: 'Failed',
  [CHECK_STATUS.SKIPPED]: 'Manual',
  [CHECK_STATUS.PENDING]: 'Pending',
};

function Dashboard() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, null, buildInitialState);
  const [activeFilter, setActiveFilter] = useState(null);
  const runningRef = useRef(false);

  const runAllChecks = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setActiveFilter(null);
    clearStore();
    dispatch({ type: 'START_RUN' });

    const autoChecks = SDK_CHECKS.filter((c) => c.isAutoTestable);

    for (const check of autoChecks) {
      dispatch({ type: 'SET_RUNNING', id: check.id });
      try {
        const { result } = await withTimeout(check.run(), TIMEOUT_MS);
        const resultData = { status: CHECK_STATUS.SUCCESS, result, error: null };
        dispatch({ type: 'SET_SUCCESS', id: check.id, result });
        setStoredResult(check.id, resultData);
      } catch (err) {
        const errorMsg =
          err?.message ||
          (typeof err === 'string' ? err : JSON.stringify(err)) ||
          'Unknown error';
        const resultData = { status: CHECK_STATUS.FAILURE, result: null, error: errorMsg };
        dispatch({ type: 'SET_FAILURE', id: check.id, error: errorMsg });
        setStoredResult(check.id, resultData);
      }
    }

    const finishedAt = new Date();
    dispatch({ type: 'FINISH_RUN', at: finishedAt });
    setStoredLastRunAt(finishedAt); // results already saved per-check via setStoredResult
    runningRef.current = false;
  }, []);

  // Only auto-run on first launch (store empty).
  // Coming back from Detail page keeps existing results.
  useEffect(() => {
    if (!hasStoredResults()) {
      runAllChecks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckClick = (check, result) => {
    // Pass only serializable data — functions on check cannot survive history.state
    navigate('/detail', { state: { checkId: check.id, result } });
  };

  const handleFilterToggle = (status) => {
    setActiveFilter((prev) => (prev === status ? null : status));
  };

  const stats = getSummaryStats(state.results);
  const checksByCategory = getChecksByCategory();

  // Apply active filter to category groups
  const filteredChecksByCategory = {};
  for (const [category, checks] of Object.entries(checksByCategory)) {
    const filtered = activeFilter
      ? checks.filter((c) => {
          const status = state.results[c.id]?.status;
          if (activeFilter === CHECK_STATUS.PENDING) {
            return status === CHECK_STATUS.PENDING || status === CHECK_STATUS.RUNNING;
          }
          return status === activeFilter;
        })
      : checks;
    if (filtered.length > 0) {
      filteredChecksByCategory[category] = filtered;
    }
  }

  const formatTime = (date) => {
    if (!date) return null;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const summaryChips = [
    {
      status: null,
      label: `All (${stats.total})`,
      bg: '#e8eaf6',
      color: '#1a237e',
      border: '#c5cae9',
    },
    {
      status: CHECK_STATUS.SUCCESS,
      label: `Passed (${stats.passed})`,
      bg: '#e8f5e9',
      color: '#2e7d32',
      border: '#a5d6a7',
    },
    {
      status: CHECK_STATUS.FAILURE,
      label: `Failed (${stats.failed})`,
      bg: stats.failed > 0 ? '#ffebee' : '#f5f5f5',
      color: stats.failed > 0 ? '#c62828' : '#9e9e9e',
      border: stats.failed > 0 ? '#ef9a9a' : '#e0e0e0',
    },
    {
      status: CHECK_STATUS.SKIPPED,
      label: `Manual (${stats.skipped})`,
      bg: '#fff8e1',
      color: '#f57f17',
      border: '#ffe082',
    },
    {
      status: CHECK_STATUS.PENDING,
      label: `Pending (${stats.pending + stats.running})`,
      bg: '#f5f5f5',
      color: '#757575',
      border: '#e0e0e0',
    },
  ];

  return (
    <div className={classes.root}>
      {/* ── App Bar ── */}
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar className={classes.toolbar} variant="dense">
          <div className={classes.titleBlock}>
            <Typography className={classes.appTitle}>SDK Health Check</Typography>
            <Typography className={classes.appSubtitle}>
              JS MiniApp SDK · v1.27.0
            </Typography>
          </div>
          <Tooltip title={state.isRunning ? 'Running…' : 'Run all checks'}>
            <span>
              <Button
                className={classes.runButton}
                startIcon={
                  state.isRunning ? (
                    <RefreshIcon
                      style={{ fontSize: 16, animation: 'spin 1s linear infinite' }}
                    />
                  ) : (
                    <PlayArrowIcon style={{ fontSize: 16 }} />
                  )
                }
                onClick={runAllChecks}
                disabled={state.isRunning}
                size="small"
              >
                {state.isRunning ? 'Running' : 'Run All'}
              </Button>
            </span>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* ── Scrollable Content ── */}
      <div className={classes.scrollArea}>
        {/* Summary Card */}
        <div className={classes.summaryCard}>
          <Typography className={classes.summaryLabel}>
            Summary — tap to filter
          </Typography>
          <div className={classes.summaryRow}>
            {summaryChips.map(({ status, label, bg, color, border }) => {
              const isActive = activeFilter === status;
              return (
                <Chip
                  key={label}
                  label={label}
                  size="small"
                  className={`${classes.statChip} ${isActive ? classes.statChipActive : ''}`}
                  style={{ backgroundColor: bg, color, border: `1px solid ${border}` }}
                  onClick={() => handleFilterToggle(status)}
                />
              );
            })}
          </div>
          {state.lastRunAt && (
            <Typography className={classes.lastRunText}>
              Last run: {formatTime(state.lastRunAt)} · {stats.total} total checks ·{' '}
              {TIMEOUT_MS / 1000}s timeout per check
            </Typography>
          )}
          {!state.lastRunAt && state.isRunning && (
            <Typography className={classes.lastRunText}>
              Running checks… ({stats.running} active, {TIMEOUT_MS / 1000}s timeout each)
            </Typography>
          )}
        </div>

        {/* Active filter banner */}
        {activeFilter !== null && (
          <div className={classes.activeFilterBanner}>
            <span>Showing: {FILTER_LABELS[activeFilter] || 'All'}</span>
            <span
              className={classes.clearFilter}
              onClick={() => setActiveFilter(null)}
            >
              Show all
            </span>
          </div>
        )}

        {/* Category Sections */}
        {Object.keys(filteredChecksByCategory).length === 0 ? (
          <Paper
            style={{
              borderRadius: 10,
              padding: '24px 16px',
              textAlign: 'center',
              color: '#90a4ae',
              fontSize: '0.85rem',
            }}
            elevation={0}
          >
            No checks match this filter.
          </Paper>
        ) : (
          Object.entries(filteredChecksByCategory).map(([category, checks]) => (
            <CategoryPanel
              key={category}
              categoryName={category}
              checks={checks}
              results={state.results}
              onCheckClick={handleCheckClick}
            />
          ))
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Dashboard;
