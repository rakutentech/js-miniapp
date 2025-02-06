import React, { useRef, useState, useEffect } from 'react';

import { Card, Grid, Button, makeStyles } from '@material-ui/core';
import { sendAnalytics } from './helper';
import { MAAnalyticsActionType, MAAnalyticsEventType } from 'js-miniapp-sdk';

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

const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;

recognition.onresult = (event) => {
  document.getElementById('output').innerText = event.results[0][0].transcript;
};

const Camera = () => {
  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState('Checking...');
  const [microphonePermission, setMicrophonePermission] =
    useState('Checking...');

  const cameraRef = useRef(null);

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Camera',
      'Screen',
      'Page',
      ''
    );
  });
  const setFiles = (e) => {
    const files = e.target.files;
    if (!files && files.length > 0) {
      return;
    }
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  function clear() {
    setImage(null);
    if (cameraRef.current !== null) {
      cameraRef.current.value = '';
    }
  }

  function updateStatus(type, status) {
    if (type === 'microphone') setMicrophonePermission(status);
    if (type === 'camera') setCameraPermission(status);
  }

  async function requestPermission(type) {
    try {
      console.log('[Leo]: requestPermission');
      const constraints =
        type === 'microphone' ? { audio: true } : { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(`[Leo]: ${type} permission granted.`);
      updateStatus(type, 'granted');
      stream.getTracks().forEach((track) => track.stop()); // Stop stream after requesting
    } catch (error) {
      console.error(`[Leo]: ${type} permission denied:`, error);
      updateStatus(type, 'denied');
    }
  }

  const handleFileInputClick = async () => {
    if (cameraPermission === 'denied') {
      alert('Please go to settings and enable camera permission.');
      return;
    }
    cameraRef.current.click();
  };

  return (
    <Card className={classes.root}>
      <Card id="imageBox" className={classes.imageBox} hidden={image == null}>
        <img
          id="imageBoxContent"
          alt="CapturedPicture"
          className={classes.imageBoxContent}
          src={image}
        />
      </Card>
      <Grid className={classes.grid} align="center">
        <div className={classes.contentSection}>
          <label className={classes.label}>Pick Image</label>
          <input
            id="cameraBack"
            type="file"
            accept=".jpg,.jpeg,.png,.svg,.gif"
            onChange={setFiles}
            data-testid="file-input-image-back"
            capture="environment"
            ref={cameraRef}
            style={{ display: 'none' }} // Hide the input element
          />
          <Button variant="contained" color="primary" onClick={handleFileInputClick}>
            Open Camera
          </Button>
        </div>
        <div className={classes.contentSection}>
          <Button variant="contained" color="primary" onClick={() => clear()}>
            Clear
          </Button>
        </div>
        <br />
        <div className={classes.contentSection}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => requestPermission('camera')}
          >
            Request Camera Permission
          </Button>
          <label className={classes.label}>{cameraPermission}</label>
        </div>
        <div className={classes.contentSection}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => requestPermission('microphone')}
          >
            Request Microphone Permission
          </Button>
          <label className={classes.label}>{microphonePermission}</label>
        </div>
        <div className={classes.contentSection}>
          <Button
            id="start"
            variant="contained"
            color="primary"
            onClick={() => recognition.start()}
          >
            Start Speech Recognition
          </Button>
        </div>
        <div className={classes.contentSection}>
          <Button
            id="stop"
            variant="contained"
            color="primary"
            onClick={() => recognition.stop()}
          >
            Stop Speech Recognition
          </Button>
        </div>
        <div className={classes.contentSection}>
          <label id="output" className={classes.label}></label>
        </div>
      </Grid>
    </Card>
  );
};

export { Camera };
export default Camera;
