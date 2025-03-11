import React, { useReducer } from 'react';

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
  forceLogoutState: {
    result: null,
    isError: false,
  },
};

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FORCE_LOGOUT_FETCH':
      return {
        ...state,
        forceLogoutState: {
          ...state.forceLogoutState,
          result: null,
          isError: false,
        },
      };
    case 'FORCE_LOGOUT_SUCCESS':
      return {
        ...state,
        forceLogoutState: {
          ...state.forceLogoutState,
          result: action.result,
        },
      };
    case 'FORCE_LOGOUT_FAILED':
      return {
        ...state,
        forceLogoutState: {
          ...state.forceLogoutState,
          isError: true,
        },
      };
    default:
      console.log('Unknown action type');
  }
};

function ForceLogOutComponent() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const handleForceLogout = async () => {
    dispatch({
      type: 'FORCE_LOGOUT_FETCH',
    });
    try {
      const result = await MiniApp.forceLogout();
      dispatch({
        type: 'FORCE_LOGOUT_SUCCESS',
        result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'FORCE_LOGOUT_FAILED',
      });
    }
  };

  return (
    <div>
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleForceLogout}
        >
          Send force logout signal
        </Button>
        {(state.forceLogoutState.result != null || state.forceLogoutState.isError) && (
          <Typography
            variant="body1"
            color={state.forceLogoutState.isError ? 'error' : 'textSecondary'}
            style={{ marginTop: '20px', wordBreak: 'break-all' }}
          >
            {state.forceLogoutState.isError
              ? 'Encountered error while calling forceLogout'
              : `Force logout result: ${state.forceLogoutState.result}`}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default ForceLogOutComponent;
