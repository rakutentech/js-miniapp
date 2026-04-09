import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Button,
  Divider,
  Collapse,
  TextField,
  MenuItem,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ReplayIcon from '@material-ui/icons/Replay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import WarningIcon from '@material-ui/icons/Warning';

import { CHECK_STATUS, SDK_CHECKS } from '../services/sdkChecks';
import { setStoredResult } from '../services/healthCheckStore';

// ─── Styles ──────────────────────────────────────────────────────────────────

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: { backgroundColor: '#1a237e' },
  backButton: { color: '#fff', marginRight: 4 },
  appBarTitle: {
    flex: 1,
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  content: {
    flex: 1,
    padding: '16px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  // Status card
  statusCard: {
    borderRadius: 12,
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  statusIcon: { fontSize: 56 },
  statusLabel: {
    fontWeight: 800,
    fontSize: '1.15rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  statusSub: {
    fontSize: '0.78rem',
    textAlign: 'center',
    lineHeight: 1.4,
  },
  retryButton: {
    marginTop: 4,
    borderRadius: 20,
    fontWeight: 700,
    textTransform: 'none',
    fontSize: '0.82rem',
  },
  // Info card
  infoCard: {
    borderRadius: 12,
    padding: '14px 16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    background: '#fff',
  },
  sectionLabel: {
    fontSize: '0.68rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: '#78909c',
    marginBottom: 6,
  },
  methodName: {
    fontFamily: 'monospace',
    fontSize: '0.88rem',
    fontWeight: 700,
    color: '#1a237e',
    wordBreak: 'break-all',
  },
  descText: {
    fontSize: '0.82rem',
    color: '#455a64',
    lineHeight: 1.5,
  },
  categoryBadge: {
    display: 'inline-block',
    backgroundColor: '#e8eaf6',
    color: '#3949ab',
    fontWeight: 700,
    fontSize: '0.7rem',
    borderRadius: 8,
    padding: '3px 10px',
    marginTop: 4,
  },
  divider: { margin: '6px 0' },
  // Result / error
  resultCard: {
    borderRadius: 12,
    padding: '14px 16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    background: '#fff',
  },
  resultValue: {
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    color: '#2e7d32',
    backgroundColor: '#f1f8e9',
    borderRadius: 6,
    padding: '10px 12px',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    lineHeight: 1.6,
    maxHeight: 220,
    overflowY: 'auto',
    border: '1px solid #c8e6c9',
  },
  errorCard: {
    borderRadius: 12,
    padding: '14px 16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    background: '#fff',
  },
  errorValue: {
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    color: '#c62828',
    backgroundColor: '#ffebee',
    borderRadius: 6,
    padding: '10px 12px',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    lineHeight: 1.6,
    maxHeight: 220,
    overflowY: 'auto',
    border: '1px solid #ef9a9a',
  },
  expandRow: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    marginTop: 6,
    color: '#546e7a',
    fontSize: '0.75rem',
  },
  // Manual trigger card
  manualCard: {
    borderRadius: 12,
    padding: '14px 16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    background: '#fff',
    border: '1px solid #e8eaf6',
  },
  manualTitle: {
    fontWeight: 700,
    fontSize: '0.85rem',
    color: '#1a237e',
    marginBottom: 12,
  },
  fieldRow: {
    marginBottom: 10,
  },
  warningBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#fff3e0',
    border: '1px solid #ffcc02',
    borderRadius: 8,
    padding: '8px 12px',
    marginBottom: 12,
    fontSize: '0.78rem',
    color: '#e65100',
    lineHeight: 1.4,
  },
  triggerButton: {
    marginTop: 4,
    borderRadius: 20,
    fontWeight: 700,
    textTransform: 'none',
    fontSize: '0.82rem',
    backgroundColor: '#1a237e',
    color: '#fff',
    '&:hover': { backgroundColor: '#283593' },
    '&:disabled': { backgroundColor: '#c5cae9', color: '#fff' },
  },
  manualResultBox: {
    marginTop: 12,
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    borderRadius: 6,
    padding: '10px 12px',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    lineHeight: 1.6,
    border: '1px solid',
  },
  reasonCard: {
    borderRadius: 12,
    padding: '14px 16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    background: '#fffde7',
    border: '1px solid #ffe082',
  },
  reasonText: {
    fontSize: '0.82rem',
    color: '#e65100',
    lineHeight: 1.5,
  },
}));

// ─── Status visual config ─────────────────────────────────────────────────────

function getStatusVisual(status) {
  switch (status) {
    case CHECK_STATUS.SUCCESS:
      return {
        bg: '#e8f5e9', borderColor: '#a5d6a7', iconColor: '#2e7d32', labelColor: '#2e7d32',
        label: 'Passed', icon: CheckCircleOutlineIcon,
        sub: 'This SDK interface responded successfully.',
      };
    case CHECK_STATUS.FAILURE:
      return {
        bg: '#ffebee', borderColor: '#ef9a9a', iconColor: '#c62828', labelColor: '#c62828',
        label: 'Failed', icon: HighlightOffIcon,
        sub: 'This SDK interface returned an error. See details below.',
      };
    case CHECK_STATUS.SKIPPED:
      return {
        bg: '#fff8e1', borderColor: '#ffe082', iconColor: '#f57f17', labelColor: '#e65100',
        label: 'Manual Only', icon: PauseCircleOutlineIcon,
        sub: 'This interface requires user interaction. Use the trigger panel below.',
      };
    default:
      return {
        bg: '#f5f5f5', borderColor: '#e0e0e0', iconColor: '#9e9e9e', labelColor: '#616161',
        label: 'Pending', icon: HelpOutlineIcon,
        sub: 'This check has not been run yet.',
      };
  }
}

// ─── Manual Trigger Panel ─────────────────────────────────────────────────────

function ManualTriggerPanel({ check, onResult }) {
  const classes = useStyles();
  const { manualConfig } = check;

  // Initialise field values from defaultValue
  const [values, setValues] = useState(() =>
    (manualConfig.fields || []).reduce((acc, f) => {
      acc[f.id] = f.defaultValue || '';
      return acc;
    }, {})
  );
  const [running, setRunning] = useState(false);
  const [triggerResult, setTriggerResult] = useState(null); // { status, result?, error? }

  const handleChange = (id, value) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleTrigger = async () => {
    setRunning(true);
    setTriggerResult(null);
    try {
      const { result } = await manualConfig.run(values);
      const data = { status: CHECK_STATUS.SUCCESS, result, error: null };
      setTriggerResult(data);
      setStoredResult(check.id, data);
      onResult(data);
    } catch (err) {
      const errorMsg =
        err?.message || (typeof err === 'string' ? err : JSON.stringify(err)) || 'Unknown error';
      const data = { status: CHECK_STATUS.FAILURE, result: null, error: errorMsg };
      setTriggerResult(data);
      setStoredResult(check.id, data);
      onResult(data);
    }
    setRunning(false);
  };

  return (
    <Paper className={classes.manualCard} elevation={0}>
      <Typography className={classes.manualTitle}>Trigger Manually</Typography>

      {manualConfig.warning && (
        <div className={classes.warningBanner}>
          <WarningIcon style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }} />
          <span>{manualConfig.warning}</span>
        </div>
      )}

      {(manualConfig.fields || []).map((field) => (
        <div key={field.id} className={classes.fieldRow}>
          {field.type === 'select' ? (
            <TextField
              select
              label={field.label}
              value={values[field.id]}
              onChange={(e) => handleChange(field.id, e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
            >
              {(field.options || []).map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField
              label={field.label}
              value={values[field.id]}
              onChange={(e) => handleChange(field.id, e.target.value)}
              variant="outlined"
              size="small"
              fullWidth
              multiline={field.type === 'multiline'}
              rows={field.type === 'multiline' ? 3 : 1}
              placeholder={field.placeholder || ''}
            />
          )}
        </div>
      ))}

      <Button
        className={classes.triggerButton}
        variant="contained"
        startIcon={<PlayArrowIcon style={{ fontSize: 16 }} />}
        onClick={handleTrigger}
        disabled={running}
        fullWidth
      >
        {running ? 'Running…' : 'Trigger'}
      </Button>

      {triggerResult && (
        <div
          className={classes.manualResultBox}
          style={
            triggerResult.status === CHECK_STATUS.SUCCESS
              ? { backgroundColor: '#f1f8e9', color: '#2e7d32', borderColor: '#c8e6c9' }
              : { backgroundColor: '#ffebee', color: '#c62828', borderColor: '#ef9a9a' }
          }
        >
          {triggerResult.status === CHECK_STATUS.SUCCESS
            ? `✓ ${triggerResult.result}`
            : `✗ ${triggerResult.error}`}
        </div>
      )}
    </Paper>
  );
}

// ─── Detail Page ─────────────────────────────────────────────────────────────

function Detail() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const { checkId, result: initialResult } = location.state || {};
  const check = SDK_CHECKS.find((c) => c.id === checkId);
  const [result, setResult] = useState(initialResult || {});
  const [isRetrying, setIsRetrying] = useState(false);
  const [showTips, setShowTips] = useState(false);

  if (!check) {
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar} elevation={0}>
          <Toolbar variant="dense">
            <IconButton edge="start" className={classes.backButton} onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography className={classes.appBarTitle}>Detail</Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <Typography>No check data found.</Typography>
          <Button onClick={() => navigate(-1)} variant="contained">Go Back</Button>
        </div>
      </div>
    );
  }

  const visual = getStatusVisual(result.status || CHECK_STATUS.PENDING);
  const StatusIcon = visual.icon;

  const handleRetry = async () => {
    if (!check.isAutoTestable || isRetrying) return;
    setIsRetrying(true);
    setResult({ status: CHECK_STATUS.RUNNING });
    try {
      const { result: res } = await check.run();
      const data = { status: CHECK_STATUS.SUCCESS, result: res, error: null };
      setResult(data);
      setStoredResult(check.id, data);
    } catch (err) {
      const errorMsg =
        err?.message || (typeof err === 'string' ? err : JSON.stringify(err)) || 'Unknown error';
      const data = { status: CHECK_STATUS.FAILURE, result: null, error: errorMsg };
      setResult(data);
      setStoredResult(check.id, data);
    }
    setIsRetrying(false);
  };

  return (
    <div className={classes.root}>
      {/* App Bar */}
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.backButton} onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography className={classes.appBarTitle}>{check.name}</Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.content}>

        {/* Status Card */}
        <Paper
          className={classes.statusCard}
          style={{ background: visual.bg, border: `1px solid ${visual.borderColor}` }}
          elevation={0}
        >
          <StatusIcon className={classes.statusIcon} style={{ color: visual.iconColor }} />
          <Typography className={classes.statusLabel} style={{ color: visual.labelColor }}>
            {visual.label}
          </Typography>
          <Typography className={classes.statusSub} style={{ color: visual.labelColor }}>
            {visual.sub}
          </Typography>
          {check.isAutoTestable && (
            <Button
              className={classes.retryButton}
              variant="outlined"
              size="small"
              startIcon={<ReplayIcon style={{ fontSize: 15 }} />}
              onClick={handleRetry}
              disabled={isRetrying}
              style={{ borderColor: visual.iconColor, color: visual.iconColor, marginTop: 8 }}
            >
              {isRetrying ? 'Retrying…' : 'Retry This Check'}
            </Button>
          )}
        </Paper>

        {/* Interface Info */}
        <Paper className={classes.infoCard} elevation={0}>
          <Typography className={classes.sectionLabel}>Interface</Typography>
          <Typography className={classes.methodName}>{check.name}</Typography>
          <span className={classes.categoryBadge}>{check.category}</span>
          <Divider className={classes.divider} />
          <Typography className={classes.sectionLabel}>Description</Typography>
          <Typography className={classes.descText}>{check.description}</Typography>
          <Typography style={{ marginTop: 8, fontSize: '0.75rem', color: '#78909c', fontStyle: 'italic' }}>
            {check.isAutoTestable ? '✓ Auto-testable' : '⚠ Manual / user interaction required'}
          </Typography>
        </Paper>

        {/* Success result */}
        {result.status === CHECK_STATUS.SUCCESS && result.result && (
          <Paper className={classes.resultCard} elevation={0}>
            <Typography className={classes.sectionLabel}>Response</Typography>
            <div className={classes.resultValue}>{result.result}</div>
          </Paper>
        )}

        {/* Failure error */}
        {result.status === CHECK_STATUS.FAILURE && (
          <Paper className={classes.errorCard} elevation={0}>
            <Typography className={classes.sectionLabel}>Error Details</Typography>
            <div className={classes.errorValue}>{result.error}</div>
            <div className={classes.expandRow} onClick={() => setShowTips((v) => !v)}>
              {showTips ? <ExpandLessIcon style={{ fontSize: 16 }} /> : <ExpandMoreIcon style={{ fontSize: 16 }} />}
              <span style={{ marginLeft: 4 }}>{showTips ? 'Hide' : 'Show'} troubleshooting tips</span>
            </div>
            <Collapse in={showTips}>
              <div style={{ marginTop: 10, padding: '10px 12px', backgroundColor: '#f8f8f8', borderRadius: 6, border: '1px solid #e0e0e0' }}>
                <Typography style={{ fontSize: '0.78rem', color: '#455a64', lineHeight: 1.6 }}>
                  Common reasons for failure:
                  <br />• The host app does not support this SDK feature.
                  <br />• Required permissions have not been granted.
                  <br />• The host app returned an authorization or scope error.
                  <br />• The SDK bridge is not initialised in this environment.
                  <br />• The feature requires a newer host app version.
                </Typography>
              </div>
            </Collapse>
          </Paper>
        )}

        {/* Manual reason */}
        {result.status === CHECK_STATUS.SKIPPED && check.reason && (
          <Paper className={classes.reasonCard} elevation={0}>
            <Typography className={classes.sectionLabel}>Why manual?</Typography>
            <Typography className={classes.reasonText}>{check.reason}</Typography>
          </Paper>
        )}

        {/* Manual Trigger Panel — shown for all non-auto-testable checks */}
        {!check.isAutoTestable && check.manualConfig && (
          <ManualTriggerPanel
            check={check}
            onResult={(data) => setResult(data)}
          />
        )}

      </div>
    </div>
  );
}

export default Detail;
