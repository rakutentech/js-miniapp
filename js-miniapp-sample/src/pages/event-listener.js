import React from 'react';
import { MiniAppEvents } from 'js-miniapp-sdk';

import {
  Button,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';

import GreyCard from '../components/GreyCard';

const useStyles = makeStyles((theme) => ({
  scrollable: {
    overflowY: 'auto',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    height: 'auto',
  },
  actions: {
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  info: {
    fontSize: 16,
    lineBreak: 'anywhere',
    wordBreak: 'break-all',
    color: theme.color.primary,
    marginTop: 0,
    paddingBottom: 10,
  },
}));

let externalwebviewcloseeventcount = 0;
let pauseeventcount = 0;
let resumeeventcount = 0;

window.addEventListener(MiniAppEvents.externalwebviewclose, function (e) {
  let message = e.detail;
  console.log(message);
  externalwebviewcloseeventcount++;
  document.getElementById('webviewclose').textContent = 'External Webview Closed: ' + externalwebviewcloseeventcount;
});

window.addEventListener(MiniAppEvents.pause, function (e) {
  let message = e.detail;
  console.log(message);
  pauseeventcount++;
  document.getElementById('pause').textContent = 'Mini App Paused: ' + pauseeventcount;
});

window.addEventListener(MiniAppEvents.resume, function (e) {
  let message = e.detail;
  console.log(message);
  resumeeventcount++;
  document.getElementById('resume').textContent = 'Mini App Resumed: ' + resumeeventcount;
  ;
});

const NativeEvents = () => {
  const classes = useStyles();

  function onOpenExternalWebview() {
    const EXTERNAL_WEBVIEW_URL = 'https://www.google.com'
    var url = new URL(EXTERNAL_WEBVIEW_URL);
    window.location.href = url;
  }

  return (
    <div className={classes.scrollable}>
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>
          <p>Event Listener</p>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            onClick={onOpenExternalWebview}
          >
            Open External Webview
          </Button>
        </CardActions>
        <div className={classes.info}>
          <p id="webviewclose">External Webview Closed: {externalwebviewcloseeventcount}</p>
          <p id="pause">Mini App Paused: {pauseeventcount}</p>
          <p id="resume">Mini App Resumed: {resumeeventcount}</p>
        </div>
      </GreyCard>
    </div>
  );
};

export default NativeEvents;
