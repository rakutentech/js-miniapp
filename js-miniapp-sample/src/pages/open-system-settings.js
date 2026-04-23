import React, { useState, useEffect } from 'react';

import { Card, Grid, Button, TextField, makeStyles } from '@material-ui/core';
import MiniApp, {
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';

import { sendAnalytics } from './helper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '100%',
    overflowY: 'auto',
  },
  grid: {
    display: 'flex',
    height: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
  },
  contentSection: {
    height: '30%',
    padding: '10px',
  },
  label: {
    display: 'block',
    fontSize: 12,
    width: '100%',
    color: theme.color.primary,
  },
}));

const OpenSystemSettings = () => {
  const classes = useStyles();
  const [result, setResult] = useState('');
  const [settingsType, setSettingsType] = useState('APP_SETTINGS');

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'openSystemSettings',
      'Screen',
      'Page',
      ''
    );
  });

  function clear() {
    setResult('');
  }

  async function openSettings() {
    try {
      const res = await MiniApp.openSystemSettings(settingsType);
      setResult(res.toString());
    } catch (error) {
      setResult(String(error));
    }
  }

  return (
    <Card className={classes.root}>
      <Grid className={classes.grid} align="center">
        <h2>Open System Settings</h2>
        <div className={classes.contentSection}>
          <TextField
            label="Settings Type"
            value={settingsType}
            onChange={(e) => setSettingsType(e.target.value)}
            placeholder="e.g. APP_SETTINGS"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => openSettings()}
            style={{ marginTop: '10px' }}
          >
            Open Settings
          </Button>
          <label className={classes.label}>{result}</label>
        </div>
        <div className={classes.contentSection}>
          <Button variant="contained" color="primary" onClick={() => clear()}>
            Clear
          </Button>
        </div>
      </Grid>
    </Card>
  );
};

export default OpenSystemSettings;
