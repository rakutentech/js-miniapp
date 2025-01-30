import React, { useRef, useState, useEffect } from 'react';

import { Card, Grid, Button, makeStyles } from '@material-ui/core';
import { sendAnalytics } from './helper';
import { MAAnalyticsActionType, MAAnalyticsEventType } from 'js-miniapp-sdk';
import MiniApp from 'js-miniapp-sdk';

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
  const [backCamera] = useState(undefined);
  const [cameraPermission, setCameraPermission] = useState('');
  const [microphonePermission, setMicrophonePermission] = useState('');

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

  function checkCameraPermission() {
    console.log('Checking Camera permission');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          console.log('Camera permission granted.');
          setCameraPermission('Camera permission granted.');
          stream.getTracks().forEach((track) => track.stop()); // Stop the stream after checking
        })
        .catch(function (error) {
          console.log('Camera permission denied: ', error);
          setCameraPermission('Camera permission denied.');
        });
    } else {
      console.log('Camera permission not supported in this browser.');
      setCameraPermission('Camera permission not supported in this browser.');
    }
  }

  function checkMicrophonePermission() {
    console.log('Checking Microphone permission...');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          console.log('Microphone permission granted.');
          setMicrophonePermission('Microphone permission granted.');
          stream.getTracks().forEach((track) => track.stop()); // Stop the stream after checking
        })
        .catch(function (error) {
          console.log('Microphone permission denied: ', error);
          setMicrophonePermission('Microphone permission denied.');
        });
    } else {
      console.log('Microphone permission not supported in this browser.');
      setMicrophonePermission('Microphone permission not supported in this browser.');
    }
  }

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
            value={backCamera}
            ref={cameraRef}
          />
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
            onClick={() => checkCameraPermission()}
          >
            Check Camera Permissions
          </Button>
          <label className={classes.label}>{cameraPermission}</label>
        </div>
        <div className={classes.contentSection}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => checkMicrophonePermission()}
          >
            Check Microphone Permissions
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
