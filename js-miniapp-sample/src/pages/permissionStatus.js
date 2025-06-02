import React, { useState, useEffect } from 'react';

import { Card, Grid, Button, makeStyles } from '@material-ui/core';
import MiniApp, {
  MAAnalyticsActionType,
  MAAnalyticsEventType,
  PermissionName,
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

const PermissionStatus = () => {
  const classes = useStyles();

  const [cameraPermission, setCameraPermission] = useState('');
  const [microphonePermission, setMicrophonePermission] = useState('');
  const [galleryPermission, setGalleryPermission] = useState('');

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'PermissionStatus',
      'Screen',
      'Page',
      ''
    );
  });

  function clear() {
    setCameraPermission('');
    setMicrophonePermission('');
    setGalleryPermission('');
  }

  async function getPermission(type) {
    try {
      const result = await MiniApp.getPermissionStatus(type);
      if (type === PermissionName.CAMERA) setCameraPermission(result);
      if (type === PermissionName.MICROPHONE) setMicrophonePermission(result);
      if (type === PermissionName.GALLERY) setGalleryPermission(result);
    } catch (error) {
      if (type === PermissionName.CAMERA) setCameraPermission(error);
      if (type === PermissionName.MICROPHONE) setMicrophonePermission(error);
      if (type === PermissionName.GALLERY) setGalleryPermission(error);
    }
  }

  return (
    <Card className={classes.root}>
      <Grid className={classes.grid} align="center">
        <h2>Get Permission Status</h2>
        <div className={classes.contentSection}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getPermission(PermissionName.CAMERA)}
          >
            Get Camera Permission
          </Button>
          <label className={classes.label}>{cameraPermission}</label>
        </div>
        <div className={classes.contentSection}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getPermission(PermissionName.MICROPHONE)}
          >
            Get Microphone Permission
          </Button>
          <label className={classes.label}>{microphonePermission}</label>
        </div>
        <div className={classes.contentSection}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getPermission(PermissionName.GALLERY)}
          >
            Get Gallery Permission
          </Button>
          <label className={classes.label}>{galleryPermission}</label>
        </div>
        <div className={classes.contentSection}>
          <Button variant="contained" color="primary" onClick={() => clear()}>
            Clear All
          </Button>
        </div>
      </Grid>
    </Card>
  );
};

export default PermissionStatus;
