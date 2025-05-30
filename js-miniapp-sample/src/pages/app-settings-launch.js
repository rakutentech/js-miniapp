import React, { useReducer, useState } from 'react';

import { Button, Typography, makeStyles } from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '2em',
  },
  formButton: {
    marginLeft: '1em',
    marginRight: '1em',
  },
  formInput: {
    width: '90%',
    marginTop: 10,
  },
}));

export const initialState = {
  appSettingsLaunchState: {
    result: null,
    error: false,
  }
};

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'APP_SETTINGS_LAUNCH_SUPPORTED_FETCH':
      return {
        ...state,
        appSettingsLaunchState: {
          ...state.appSettingsLaunchState,
          result: null,
          error: '',
        },
      };
    case 'APP_SETTINGS_LAUNCH_SUCCESS':
      return {
        ...state,
        appSettingsLaunchState: {
          ...state.appSettingsLaunchState,
          result: action.result,
        },
      };
    case 'APP_SETTINGS_LAUNCH_FAILED':
      return {
        ...state,
        appSettingsLaunchState: {
          ...state.appSettingsLaunchState,
          error: action.error,
        },
      };
    default:
      console.log('Unknown action type');
  }
};

function AppSettingsLaunchComponent() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const handleAppSettingsLaunch = async () => {
    dispatch({
      type: 'APP_SETTINGS_LAUNCH_SUPPORTED_FETCH',
    });
    try {
      const result = await MiniApp.appSettingsLaunch.launchAppSettings();
      dispatch({
        type: 'APP_SETTINGS_LAUNCH_SUCCESS',
        result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'APP_SETTINGS_LAUNCH_FAILED',
        error:
          error.message || 'Encountered error while calling launchAppSettings',
      });
    }
  };

  return (
    <div>
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAppSettingsLaunch}
        >
          Check if app settings launched
        </Button>
        {(state.appSettingsLaunchState.result != null || state.appSettingsLaunchState.error) && (
          <Typography
            variant="body1"
            color={state.appSettingsLaunchState.error ? 'error' : 'textSecondary'}
            style={{ marginTop: '20px', wordBreak: 'break-all' }}
          >
            {state.appSettingsLaunchState.error
              ? state.appSettingsLaunchState.error
              : `app settings Launch is supported: ${state.appSettingsLaunchState.result}`}
          </Typography>
        )}
        
      </div>
    </div>
  );
}

export default AppSettingsLaunchComponent;
