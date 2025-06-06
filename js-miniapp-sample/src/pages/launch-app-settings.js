import React, { useState, useEffect } from 'react';

import { Card, Grid, Button, makeStyles } from '@material-ui/core';
import MiniApp, {
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';

import { sendAnalytics } from './helper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '100%',
    overflowY: 'auto', // Add this line to make the page scrollable
  },
  grid: {
    display: 'flex',
    height: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
  },
  table: {
    minWidth: '80%',
  },
  content: {
    height: '50%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
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
  imageBox: {
    height: '250px',
    margin: '20px',
  },
  imageBoxContent: {
    height: '250px',
    objectFit: 'contain',
  },
}));

const LaunchAppSettings = () => {
  const classes = useStyles();

  const [launchAppSettings, setLaunchAppSettings] = useState('');

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'launchAppSettings',
      'Screen',
      'Page',
      ''
    );
  });

  function clear() {
    setLaunchAppSettings('');
  }

  async function getLaunchAppSettings() {
    try {
      const result = await MiniApp.miniappUtils.launchAppSettings();
      setLaunchAppSettings(result.toString());
    } catch (error) {
      setLaunchAppSettings(error);
    }
  }

  return (
    <Card className={classes.root}>
      <Grid className={classes.grid} align="center">
        <h2>Get Launch App Settings</h2>
        <div className={classes.contentSection}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getLaunchAppSettings()}
          >
            Get Launch App Settings
          </Button>
          <label className={classes.label}>{launchAppSettings}</label>
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

export default LaunchAppSettings;
