import React, { useEffect, useState } from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MiniApp from 'js-miniapp-sdk';

const FONT_BASE_PATH = '/';
const SAMPLE_TEXT =
  'The quick brown fox jumps over the lazy dog — 素早い茶色のキツネが怠け者の犬を飛び越えた';

function displayName(filename) {
  return filename.replace(/\.(ttf|otf)$/i, '');
}

function fileFormat(filename) {
  const m = filename.match(/\.(ttf|otf)$/i);
  return m ? m[1].toUpperCase() : '';
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  tabBar: {
    borderBottom: '1px solid #e0e0e0',
    background: '#fff',
  },
  tabPanel: {
    padding: '16px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    boxSizing: 'border-box',
  },
  statusBox: {
    fontSize: '13px',
    padding: '8px 12px',
    borderRadius: '6px',
    fontFamily: 'monospace',
    background: '#f5f5f5',
    color: theme.color.primary,
    wordBreak: 'break-all',
  },
  formControl: {
    width: '100%',
    maxWidth: '100%',
  },
  previewCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    background: '#fafafa',
  },
  previewLabel: {
    fontSize: '11px',
    color: '#888',
    fontFamily: 'monospace',
  },
  previewText: {
    fontSize: '20px',
    lineHeight: 1.5,
    color: theme.color.primary,
    transition: 'font-family 0.2s ease',
  },
  // All-fonts tab
  metricsBar: {
    background: '#1a1a2e',
    color: '#e0e0e0',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontFamily: 'monospace',
    fontSize: '12px',
  },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  metricValue: {
    color: '#7ee8a2',
    fontWeight: 'bold',
  },
  fontCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    background: '#fafafa',
  },
  fontCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fontName: {
    fontSize: '12px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: theme.color.primary,
  },
  formatBadge: {
    fontSize: '10px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    padding: '1px 5px',
    borderRadius: '3px',
    background: '#e8eaf6',
    color: '#3949ab',
    marginLeft: '6px',
    verticalAlign: 'middle',
  },
  timing: {
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#888',
  },
  fontSample: {
    fontSize: '16px',
    lineHeight: 1.5,
    color: theme.color.primary,
  },
  // Shared badges
  loadBadge: {
    fontSize: '11px',
    fontFamily: 'monospace',
    padding: '2px 8px',
    borderRadius: '4px',
    alignSelf: 'flex-start',
  },
  loaded: { background: '#e6f4ea', color: '#1e7e34' },
  failed: { background: '#fce8e6', color: '#c5221f' },
  pending: { background: '#fff8e1', color: '#f57f17' },
}));

function fontFamilyName(filename) {
  return filename.replace(/\.(ttf|otf)$/, '').replace(/_/g, '-');
}

function badgeClass(status, classes) {
  return status === 'loaded'
    ? classes.loaded
    : status === 'failed'
    ? classes.failed
    : classes.pending;
}

// ─── Tab 1: Single Font Demo ──────────────────────────────────────────────────

function SingleFontTab({ availableFonts, fontData, fetchError }) {
  const classes = useStyles();
  const [selectedFont, setSelectedFont] = useState('');

  useEffect(() => {
    if (availableFonts && availableFonts.length > 0 && !selectedFont) {
      setSelectedFont(availableFonts[0]);
    }
  }, [availableFonts, selectedFont]);

  const selectedFamily = selectedFont ? fontFamilyName(selectedFont) : '';
  const selected = selectedFont ? fontData[selectedFont] : null;
  const enumKey = selectedFont ? displayName(selectedFont) : '';

  return (
    <div className={classes.tabPanel}>
      <div className={classes.statusBox}>
        {fetchError
          ? `Error: ${fetchError}`
          : availableFonts === null
          ? 'Fetching available fonts from host…'
          : `${availableFonts.length} fonts available from host`}
      </div>

      {availableFonts && availableFonts.length > 0 && (
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="font-select-label">Select Font</InputLabel>
          <Select
            labelId="font-select-label"
            value={selectedFont}
            onChange={(e) => setSelectedFont(e.target.value)}
            label="Select Font"
          >
            {availableFonts.map((filename) => {
              const key = displayName(filename);
              const status = fontData[filename]?.status;
              return (
                <MenuItem key={filename} value={filename}>
                  {key}
                  <span style={{ fontSize: '10px', marginLeft: '6px', color: '#3949ab', fontFamily: 'monospace', fontWeight: 'bold' }}>
                    {fileFormat(filename)}
                  </span>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}

      {selectedFont && (
        <div className={classes.previewCard}>
          <span className={classes.previewLabel}>
            {enumKey}
            <span className={classes.formatBadge}>{selectedFont ? fileFormat(selectedFont) : ''}</span>
          </span>
          <span className={classes.previewLabel} style={{ marginTop: '6px' }}>
            {selectedFont}
          </span>
          {selected && (
            <span className={`${classes.loadBadge} ${badgeClass(selected.status, classes)}`}>
              {selected.status}
            </span>
          )}
          <Typography
            className={classes.previewText}
            style={{ fontFamily: `'${selectedFamily}', sans-serif` }}
          >
            {SAMPLE_TEXT}
          </Typography>
        </div>
      )}
    </div>
  );
}

// ─── Tab 2: All Fonts Performance ─────────────────────────────────────────────

function AllFontsTab({ availableFonts, fontData, totalMs, fetchError }) {
  const classes = useStyles();

  const loadedCount = Object.values(fontData).filter((d) => d.status === 'loaded').length;
  const failedCount = Object.values(fontData).filter((d) => d.status === 'failed').length;
  const pendingCount = Object.values(fontData).filter((d) => d.status === 'loading').length;

  return (
    <div className={classes.tabPanel}>
      <div className={classes.statusBox}>
        {fetchError
          ? `Error: ${fetchError}`
          : availableFonts === null
          ? 'Fetching available fonts from host…'
          : `${availableFonts.length} fonts — loading all simultaneously`}
      </div>

      {availableFonts && (
        <div className={classes.metricsBar}>
          <div className={classes.metricRow}>
            <span>Total time</span>
            <span className={classes.metricValue}>
              {totalMs !== null ? `${totalMs} ms` : pendingCount > 0 ? '…' : '—'}
            </span>
          </div>
          <div className={classes.metricRow}>
            <span>Loaded</span>
            <span className={classes.metricValue}>{loadedCount} / {availableFonts.length}</span>
          </div>
          <div className={classes.metricRow}>
            <span>Failed</span>
            <span style={{ color: failedCount > 0 ? '#ff6b6b' : '#7ee8a2', fontWeight: 'bold' }}>
              {failedCount}
            </span>
          </div>
          <div className={classes.metricRow}>
            <span>Pending</span>
            <span style={{ color: pendingCount > 0 ? '#ffd93d' : '#7ee8a2', fontWeight: 'bold' }}>
              {pendingCount}
            </span>
          </div>
        </div>
      )}

      {availableFonts &&
        availableFonts.map((filename) => {
          const key = displayName(filename);
          const data = fontData[filename] ?? { status: 'loading', durationMs: null };
          const family = fontFamilyName(filename);
          return (
            <div key={filename} className={classes.fontCard}>
              <div className={classes.fontCardHeader}>
                <span className={classes.fontName}>
                  {key}
                  <span className={classes.formatBadge}>{fileFormat(filename)}</span>
                </span>
                <span className={classes.timing}>
                  {data.durationMs !== null ? `${data.durationMs} ms` : '…'}
                </span>
              </div>
              <span className={`${classes.loadBadge} ${badgeClass(data.status, classes)}`}>
                {data.status}
              </span>
              <Typography
                className={classes.fontSample}
                style={{ fontFamily: `'${family}', sans-serif` }}
              >
                {SAMPLE_TEXT}
              </Typography>
            </div>
          );
        })}
    </div>
  );
}

// ─── Root component — single font load, shared by both tabs ───────────────────

function FontTest() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const [availableFonts, setAvailableFonts] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  // fontData: { [filename]: { status: 'loading'|'loaded'|'failed', durationMs: number|null } }
  const [fontData, setFontData] = useState({});
  const [totalMs, setTotalMs] = useState(null);

  useEffect(() => {
    try {
      MiniApp.miniappUtils
        .getAvailableFonts()
        .then((list) => {
          setAvailableFonts(list);
          setFontData(
            Object.fromEntries(list.map((f) => [f, { status: 'loading', durationMs: null }]))
          );

          const batchStart = performance.now();
          let settled = 0;

          list.forEach((filename) => {
            const family = fontFamilyName(filename);
            const ext = filename.endsWith('.otf') ? 'opentype' : 'truetype';
            const url = `${FONT_BASE_PATH}${filename}`;
            const t0 = performance.now();
            const face = new FontFace(family, `url(${url}) format('${ext}')`);

            face
              .load()
              .then((loaded) => {
                document.fonts.add(loaded);
                const dur = Math.round(performance.now() - t0);
                setFontData((prev) => ({
                  ...prev,
                  [filename]: { status: 'loaded', durationMs: dur },
                }));
              })
              .catch(() => {
                const dur = Math.round(performance.now() - t0);
                setFontData((prev) => ({
                  ...prev,
                  [filename]: { status: 'failed', durationMs: dur },
                }));
              })
              .then(() => {
                settled += 1;
                if (settled === list.length) {
                  setTotalMs(Math.round(performance.now() - batchStart));
                }
              });
          });
        })
        .catch((err) => setFetchError(String(err)));
    } catch (e) {
      setFetchError(String(e));
    }
  }, []);

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabBar}
        value={tab}
        onChange={(_, v) => setTab(v)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Single Font" />
        <Tab label="All Fonts" />
      </Tabs>

      {tab === 0 && (
        <SingleFontTab
          availableFonts={availableFonts}
          fontData={fontData}
          fetchError={fetchError}
        />
      )}
      {tab === 1 && (
        <AllFontsTab
          availableFonts={availableFonts}
          fontData={fontData}
          totalMs={totalMs}
          fetchError={fetchError}
        />
      )}
    </div>
  );
}

export default FontTest;