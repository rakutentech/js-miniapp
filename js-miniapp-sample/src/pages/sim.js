import React, { useReducer } from 'react';

import { Button, Typography, makeStyles } from '@material-ui/core';
import MiniApp, { DevicePermission } from 'js-miniapp-sdk';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '2em',
  },
  section: {
    marginTop: '4em',
  },
}));

const initialState = {
  simInstalled: {
    result: null,
    error: false,
  },
  phoneStatePermission: {
    result: null,
    error: false,
  },
};

function dataFetchReducer(state, action) {
  switch (action.type) {
    case 'SIM_INSTALLED_FETCH':
      return { ...state, simInstalled: { result: null, error: false } };
    case 'SIM_INSTALLED_SUCCESS':
      return {
        ...state,
        simInstalled: { result: action.result, error: false },
      };
    case 'SIM_INSTALLED_FAILED':
      return {
        ...state,
        simInstalled: { result: null, error: action.error },
      };
    case 'PHONE_STATE_FETCH':
      return { ...state, phoneStatePermission: { result: null, error: false } };
    case 'PHONE_STATE_SUCCESS':
      return {
        ...state,
        phoneStatePermission: { result: action.result, error: false },
      };
    case 'PHONE_STATE_FAILED':
      return {
        ...state,
        phoneStatePermission: { result: null, error: action.error },
      };
    default:
      throw new Error('Unknown action type');
  }
}

function SimStatus() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const handleIsSimInstalled = async () => {
    dispatch({ type: 'SIM_INSTALLED_FETCH' });
    try {
      const result = await MiniApp.miniappUtils.isSimInstalled();
      if (result) {
        dispatch({ type: 'SIM_INSTALLED_SUCCESS', result });
        alert('Success! Sim is installed');
      } else {
        dispatch({
          type: 'SIM_INSTALLED_FAILED',
          error: 'Sim is not installed',
        });
        alert('Sim is not installed');
      }
    } catch (error) {
      dispatch({
        type: 'SIM_INSTALLED_FAILED',
        error:
          error.message || String(error),
      });
      alert('Fail! Sim installed check failed');
    }
  };

  const handleRequestPhoneStatePermission = async () => {
    dispatch({ type: 'PHONE_STATE_FETCH' });
    try {
      const result = await MiniApp.requestPermission(
        DevicePermission.PHONE_STATE
      );
      dispatch({ type: 'PHONE_STATE_SUCCESS', result });
    } catch (error) {
      dispatch({
        type: 'PHONE_STATE_FAILED',
        error: error.message || String(error),
      });
    }
  };

  return (
    <div>
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleIsSimInstalled}
        >
          Check if Sim Installed
        </Button>
        {(state.simInstalled.result != null || state.simInstalled.error) && (
          <Typography
            variant="body1"
            style={{
              marginTop: '20px',
              wordBreak: 'break-all',
              color: state.simInstalled.error ? 'red' : 'green',
            }}
          >
            {state.simInstalled.error
              ? state.simInstalled.error
              : `Sim is installed: ${state.simInstalled.result}`}
          </Typography>
        )}
      </div>
      <div className={classes.section}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRequestPhoneStatePermission}
        >
          Request Phone State Permission
        </Button>
        {(state.phoneStatePermission.result != null ||
          state.phoneStatePermission.error) && (
          <Typography
            variant="body1"
            style={{
              marginTop: '20px',
              wordBreak: 'break-all',
              color: state.phoneStatePermission.error ? 'red' : 'green',
            }}
          >
            {state.phoneStatePermission.error
              ? state.phoneStatePermission.error
              : `Phone state permission granted: ${state.phoneStatePermission.result}`}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default SimStatus;
