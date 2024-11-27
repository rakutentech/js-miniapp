import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';
import MiniApp, {
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';
import { sendAnalytics } from './helper';
import GreyCard from '../components/GreyCard';
import roadGif from '../assets/images/gif/road.gif';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: '40px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  content: {
    height: 'auto',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  actions: {
    justifyContent: 'center',
    marginTop: '20px',
  },
  textfield: {
    width: '100%',
    maxWidth: 400,
    marginBottom: '20px',
    background: 'white',
    '& input': {
      color: theme.palette.primary.main,
      lineHeight: '1.5em',
      fontSize: '1.2em',
    },
  },
  button: {
    width: '100%',
    maxWidth: 200,
    padding: '10px 0',
    fontSize: '1em',
  },
}));

function Share() {
  const classes = useStyles();
  const defaultInputValue = 'This is Sample text to share';
  const defaultUrl = 'https://www.rakuten.com/';
  const [inputValue, setInputValue] = useState(defaultInputValue);
  const [url, setUrl] = useState(defaultUrl);

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Share',
      'Screen',
      'Page',
      ''
    );
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  const handleUrlInput = (e) => {
    e.preventDefault();
    setUrl(e.currentTarget.value);
  };

  const shareContent = async () => {
    const response = await fetch(roadGif);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const imageData = new Uint8Array(arrayBuffer);

    const info = {
      content: inputValue,
      url: url,
      fileBlobList: [imageData],
    };
    console.log('Info: ', info);
    MiniApp.shareInfo(info)
      .then((success) => {
        console.log('Sharing Success');
      })
      .catch((error) => {
        console.error('Error sharing content: ', error);
      });
  };

  const downloadAndShareImageBlob = async () => {
    shareImageWithNativeApp('https://picsum.photos/200');
  };

  async function fetchImageAsArrayBuffer(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  async function shareImageWithNativeApp(url) {
    const imageData = await fetchImageAsArrayBuffer(url);
    const info = {
      content: 'Check out this image!',
      url: 'https://www.rakuten.co.jp/',
      fileBlobList: [imageData],
    };
    if (url) {
      info.url = url;
    }
    console.log('Info: ', info);
    MiniApp.shareInfo(info)
      .then((success) => {
        console.log('Sharing Success');
      })
      .catch((error) => {
        console.error('Error sharing downloaded image: ', error);
      });
  }

  return (
    <GreyCard className={classes.card}>
      <CardContent className={classes.content}>
        <TextField
          type="text"
          className={classes.textfield}
          onChange={handleInput}
          placeholder="Enter content here"
          defaultValue={defaultInputValue}
          variant="outlined"
          color="primary"
          multiline
          rowsMax="5"
          inputProps={{
            'data-testid': 'input-field',
          }}
        />
        <TextField
          type="text"
          className={classes.textfield}
          onChange={handleUrlInput}
          placeholder="Enter URL here"
          value={url}
          variant="outlined"
          color="primary"
          inputProps={{
            'data-testid': 'url-input',
          }}
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          className={classes.button}
          onClick={shareContent}
          variant="contained"
        >
          Share
        </Button>
        <Button
          color="secondary"
          className={classes.button}
          onClick={downloadAndShareImageBlob}
          variant="contained"
        >
          Download and Share
        </Button>
      </CardActions>
    </GreyCard>
  );
}

export default Share;
