// @flow
import React, { useReducer, useRef } from 'react';

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

const initialState = {
  allowBackForwardNavigationGestures: {
    result: false,
    isLoading: false,
    isError: false,
  },
  forceInternalWebView: {
    result: false,
    isLoading: false,
    isError: false,
  },
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'ALLOW_BACK_FORWARD_INIT':
      return {
        ...state,
        allowBackForwardNavigationGestures: {
          ...state?.allowBackForwardNavigationGestures,
          isLoading: true,
          isError: false,
        },
      };
    case 'ALLOW_BACK_FORWARD_SUCCESS':
      return {
        ...state,
        allowBackForwardNavigationGestures: {
          ...state?.allowBackForwardNavigationGestures,
          result: action.result,
          isLoading: false,
        },
      };
    case 'ALLOW_BACK_FORWARD_FAILED':
      return {
        ...state,
        allowBackForwardNavigationGestures: {
          ...state?.allowBackForwardNavigationGestures,
          isLoading: false,
          isError: true,
        },
      };
    case 'FORCE_INTERNAL_INIT':
      return {
        ...state,
        forceInternalWebView: {
          ...state?.forceInternalWebView,
          isLoading: true,
          isError: false,
        },
      };
    case 'FORCE_INTERNAL_SUCCESS':
      return {
        ...state,
        forceInternalWebView: {
          ...state?.forceInternalWebView,
          result: action.result,
          isLoading: false,
        },
      };
    case 'FORCE_INTERNAL_FAILED':
      return {
        ...state,
        forceInternalWebView: {
          ...state?.forceInternalWebView,
          isLoading: false,
          isError: true,
        },
      };
    default:
      console.log('Unknown action type');
  }
};

const WebViewConfig = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const toggle1 = useRef();

  const allowBackForwardEvent = {
    dispatchType: 'ALLOW_BACK_FORWARD',
    function: MiniApp?.webviewManager?.allowBackForwardNavigationGestures,
  };

  const forceInternalWebViewEvent = {
    dispatchType: 'FORCE_INTERNAL',
    function: MiniApp?.webviewManager?.forceInternalWebView,
  };

  const handleToggleChange = (data, event) => {
    dispatch({ type: `${data.dispatchType}_INIT`, result: null });
    const newToggleValue = event.target.checked;
    try {
      data
        .function(newToggleValue)
        .then((response) => {
          console.log('Response: ', response);
          dispatch({
            type: `${data.dispatchType}_SUCCESS`,
            result: newToggleValue,
          });
        })
        .catch((error) => {
          console.log('Error: ', error);
          dispatch({ type: `${data.dispatchType}_FAILED`, result: null });
        });
    } catch (error) {
      console.log('Error: ', error);
      dispatch({ type: `${data.dispatchType}_FAILED`, result: null });
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2>Web View Configuration</h2>
        <FormControlLabel
          control={
            <Switch
              ref={toggle1}
              checked={
                state?.allowBackForwardNavigationGestures?.result || false
              }
              disabled={state?.allowBackForwardNavigationGestures?.isLoading}
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
        {state?.allowBackForwardNavigationGestures?.isLoading && (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
        {state?.allowBackForwardNavigationGestures?.isError && (
          <Typography
            variant="body1"
            color={'error'}
            style={{ marginTop: '20px', wordBreak: 'break-all' }}
          >
            Encountered error while calling allowBackForwardNavigationGestures
          </Typography>
        )}

        <FormControlLabel
          control={
            <Switch
              checked={state?.forceInternalWebView?.result || false}
              disabled={state?.forceInternalWebView?.isLoading}
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
        {state?.forceInternalWebView?.isLoading && (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
        {state?.forceInternalWebView?.isError && (
          <Typography
            variant="body1"
            color={'error'}
            style={{ marginTop: '20px', wordBreak: 'break-all' }}
          >
            Encountered error while calling forceInternalWebView
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default WebViewConfig;
