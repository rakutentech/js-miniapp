import React, { useState, useEffect } from 'react';

import {
  Button,
  TextField,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';
import {
  MiniAppEvents,
  MiniAppKeyboardEvents,
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';
import { sendAnalytics } from './helper';
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
  formInput: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    background: 'white',
  },
}));

const EXTERNAL_WEBVIEW_URL = 'https://www.google.com';

const NativeEvents = () => {
  const classes = useStyles();
  let [externalWebviewCloseEventCount, setExternalWebviewCloseEventCount] =
    useState(0);
  let [pauseEventCount, setPauseEventCount] = useState(0);
  let [resumeEventCount, setResumeEventCount] = useState(0);
  let [navigationBarHeight, setNavigationBarHeight] = useState(0);
  let [screenHeight, setScreenHeight] = useState(0);
  let [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Event Listener',
      'Screen',
      'Page',
      ''
    );
  });

  window.addEventListener(MiniAppEvents.EXTERNAL_WEBVIEW_CLOSE, function (e) {
    let message = e.detail.message;
    console.log(message);
    externalWebviewCloseEventCount++;
    setExternalWebviewCloseEventCount(externalWebviewCloseEventCount);
  });

  window.addEventListener(MiniAppEvents.PAUSE, function (e) {
    let message = e.detail.message;
    console.log(message);
    pauseEventCount++;
    setPauseEventCount(pauseEventCount);
  });

  window.addEventListener(MiniAppEvents.RESUME, function (e) {
    let message = e.detail.message;
    console.log(message);
    resumeEventCount++;
    setResumeEventCount(resumeEventCount);
  });

  window.addEventListener(MiniAppKeyboardEvents.KEYBOARDSHOWN, function (e) {
    let message = e.detail.message;
    let navigationBarHeightValue = e.detail.navigationBarHeight;
    let screenHeightValue = e.detail.screenHeight;
    let keyboardHeightValue = e.detail.keyboardHeight;
    console.log(
      message +
        ', ' +
        navigationBarHeightValue +
        ', ' +
        screenHeight +
        ', ' +
        keyboardHeight
    );
    navigationBarHeight = navigationBarHeightValue;
    screenHeight = screenHeightValue;
    keyboardHeight = keyboardHeightValue;
    setNavigationBarHeight(navigationBarHeightValue);
    setScreenHeight(screenHeightValue);
    setKeyboardHeight(keyboardHeightValue);
  });

  window.addEventListener(MiniAppKeyboardEvents.KEYBOARDHIDDEN, function (e) {
    let message = e.detail.message;
    let hiddenNavigationBarHeightValue = e.detail.navigationBarHeight;
    let hiddenScreenHeightValue = e.detail.screenHeight;
    let hiddenKeyboardHeightValue = e.detail.keyboardHeight;
    console.log(
      message +
        ', ' +
        hiddenNavigationBarHeightValue +
        ', ' +
        hiddenScreenHeightValue +
        ', ' +
        hiddenKeyboardHeightValue
    );
    navigationBarHeight = hiddenNavigationBarHeightValue;
    screenHeight = hiddenScreenHeightValue;
    keyboardHeight = hiddenKeyboardHeightValue;
    setNavigationBarHeight(hiddenNavigationBarHeightValue);
    setScreenHeight(hiddenScreenHeightValue);
    setKeyboardHeight(hiddenKeyboardHeightValue);
  });

  function onOpenExternalWebview() {
    let url = new URL(EXTERNAL_WEBVIEW_URL);
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
          <p>External Webview Closed: {externalWebviewCloseEventCount}</p>
          <p>Mini App Paused: {pauseEventCount}</p>
          <p>Mini App Resumed: {resumeEventCount}</p>
        </div>
        <hr />
        <div>
          <p>Keyboard Events</p>
          <TextField
            className={classes.formInput}
            variant="outlined"
            placeholder="Toggle Keyboard..."
          ></TextField>
          <p>Navigation Bar Height: {navigationBarHeight}</p>
          <p>Screen Height: {screenHeight}</p>
          <p>Keyboard Height: {keyboardHeight}</p>
        </div>
      </GreyCard>
    </div>
  );
};

export default NativeEvents;
