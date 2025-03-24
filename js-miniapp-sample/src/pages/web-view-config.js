// @flow
import React from 'react';

import {
  Card,
  CardContent,
  makeStyles,
  Switch,
  FormControlLabel,
  Typography,
  Box,
  CircularProgress,
} from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';

import useWebViewConfigStore from '../store/web-view-config';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    width: '100%',
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
  toggleButton: {
    '&.Mui-selected': {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  iosSwitchBase: {
    '&.Mui-checked': {
      color: theme.palette.common.white,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  iosSwitchTrack: {
    borderRadius: 20 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      left: 12,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.common.white
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
    },
    '&:after': {
      right: 12,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.common.white
      )}" d="M19,13H5V11H19V13Z"/></svg>')`,
    },
  },
}));

const WebViewConfig = () => {
  const classes = useStyles();
  const allowBackForwardNavigationGestures = useWebViewConfigStore(
    (state) => state.allowBackForwardNavigationGestures
  );
  const forceInternalWebView = useWebViewConfigStore(
    (state) => state.forceInternalWebView
  );
  const {
    initAllowBackForwardNavigationGestures,
    successAllowBackForwardNavigationGestures,
    failAllowBackForwardNavigationGestures,
    initForceInternalWebView,
    successForceInternalWebView,
    failForceInternalWebView,
  } = useWebViewConfigStore();

  const allowBackForwardEvent = {
    initFunc: initAllowBackForwardNavigationGestures,
    function: MiniApp?.webviewManager?.allowBackForwardNavigationGestures,
    successFunc: successAllowBackForwardNavigationGestures,
    failFunc: failAllowBackForwardNavigationGestures,
  };

  const forceInternalWebViewEvent = {
    initFunc: initForceInternalWebView,
    function: MiniApp?.webviewManager?.forceInternalWebView,
    successFunc: successForceInternalWebView,
    failFunc: failForceInternalWebView,
  };

  const handleToggleChange = (data, event) => {
    data.initFunc();
    const newToggleValue = event.target.checked;
    try {
      data
        .function(newToggleValue)
        .then((response) => {
          console.log('Response: ', response);
          data.successFunc(newToggleValue);
        })
        .catch((error) => {
          console.log('Error: ', error);
          data.failFunc(error.message || error);
        });
    } catch (error) {
      console.log('Error: ', error);
      data.failFunc(error.message || error);
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2>Web View Configuration</h2>
        <FormControlLabel
          control={
            <Switch
              checked={allowBackForwardNavigationGestures.result || false}
              disabled={allowBackForwardNavigationGestures.isLoading}
              onChange={(event) =>
                handleToggleChange(allowBackForwardEvent, event)
              }
              classes={{
                switchBase: classes.iosSwitchBase,
                track: classes.iosSwitchTrack,
              }}
            />
          }
          label="Allow Back/Forward Navigation Gestures"
        />
        {allowBackForwardNavigationGestures.isLoading && (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
        {allowBackForwardNavigationGestures.error && (
          <Typography
            variant="body1"
            color={'error'}
            style={{ marginTop: '20px', wordBreak: 'break-all' }}
          >
            {allowBackForwardNavigationGestures.error}
          </Typography>
        )}

        <FormControlLabel
          control={
            <Switch
              checked={forceInternalWebView.result || false}
              disabled={forceInternalWebView.isLoading}
              onChange={(event) =>
                handleToggleChange(forceInternalWebViewEvent, event)
              }
              classes={{
                switchBase: classes.iosSwitchBase,
                track: classes.iosSwitchTrack,
              }}
            />
          }
          label="Force use of internal web view"
        />
        {forceInternalWebView.isLoading && (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
        {forceInternalWebView.error && (
          <Typography
            variant="body1"
            color={'error'}
            style={{ marginTop: '20px', wordBreak: 'break-all' }}
          >
            {forceInternalWebView.error}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default WebViewConfig;
