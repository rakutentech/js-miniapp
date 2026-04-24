import React, { useReducer } from 'react';

import { Button, Typography, makeStyles } from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '2em',
  },
}));

const initialState = {
  simInstalled: {
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
    default:
      throw new Error('Unknown action type');
  }
}

function Sim() {
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
          error.message || 'Encountered error while calling isSimInstalled',
      });
      alert('Fail! Sim installed check failed');
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
            color={state.simInstalled.error ? 'error' : 'textSecondary'}
            style={{ marginTop: '20px', wordBreak: 'break-all' }}
          >
            {state.simInstalled.error
              ? state.simInstalled.error
              : `Sim is installed: ${state.simInstalled.result}`}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Sim;
