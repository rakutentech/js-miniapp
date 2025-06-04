import React, { useReducer, useState } from 'react';

import { TextField, Button, Typography, makeStyles } from '@material-ui/core';
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
  eSimSupport: {
    result: null,
    error: false,
  },
  eSimConfig: {
    result: null,
    error: false,
  },
};

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'SIM_SUPPORTED_FETCH':
      return {
        ...state,
        eSimSupport: {
          ...state.eSimSupport,
          result: null,
          error: '',
        },
      };
    case 'SIM_SUPPORTED_SUCCESS':
      return {
        ...state,
        eSimSupport: {
          ...state.eSimSupport,
          result: action.result,
        },
      };
    case 'SIM_SUPPORTED_FAILED':
      return {
        ...state,
        eSimSupport: {
          ...state.eSimSupport,
          error: action.error,
        },
      };
    case 'SIM_CONFIG_INIT':
      return {
        ...state,
        eSimConfig: {
          ...state.eSimConfig,
          result: null,
          error: '',
        },
      };
    case 'SIM_CONFIG_SUCCESS':
      return {
        ...state,
        eSimConfig: {
          ...state.eSimConfig,
          result: action.result,
        },
      };
    case 'SIM_CONFIG_FAILED':
      return {
        ...state,
        eSimConfig: {
          ...state.eSimConfig,
          error: action.error,
        },
      };
    default:
      console.log('Unknown action type');
  }
};

const clearConfigInput = {
  address: '',
  confirmationCode: '',
  eid: '',
  iccid: '',
  matchingId: '',
  oid: '',
};

function ESimComponent() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const [configInput, setConfigInput] = useState(clearConfigInput);

  const handleIsEsimSupported = async () => {
    dispatch({
      type: 'SIM_SUPPORTED_FETCH',
    });
    try {
      const result = await MiniApp.esimService.isEsimSupported();
      if (result) {
        dispatch({
          type: 'SIM_SUPPORTED_SUCCESS',
          result,
        });
        alert('Success! Esim is supported');
      } else {
        dispatch({
          type: 'SIM_SUPPORTED_FAILED',
          error: 'Esim supported is not available',
        });
        alert('Esim support is not available');
      }
    } catch (error) {
      dispatch({
        type: 'SIM_SUPPORTED_FAILED',
        error:
          error.message || 'Encountered error while calling isESimSupported',
      });
      alert('Fail! Esim is support failed');
    }
  };

  const handleSendEsimConfig = async () => {
    console.log(configInput);
    dispatch({
      type: 'SIM_CONFIG_INIT',
    });
    try {
      const result = await MiniApp.esimService.setupAndInstallEsim(configInput);
      if (result) {
        dispatch({
          type: 'SIM_CONFIG_SUCCESS',
          result,
        });
      } else {
        dispatch({
          type: 'SIM_CONFIG_FAILED',
          error: 'Esim setupAndInstallEsim is not available',
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'SIM_CONFIG_FAILED',
        error:
          error.message ||
          'Encountered error while calling setupAndInstallEsim',
      });
    }
  };

  return (
    <div>
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleIsEsimSupported}
        >
          Check if eSim Supported
        </Button>
        {(state.eSimSupport.support != null || state.eSimSupport.error) && (
          <Typography
            variant="body1"
            color={state.eSimSupport.error ? 'error' : 'textSecondary'}
            style={{ marginTop: '20px', wordBreak: 'break-all' }}
          >
            {state.eSimSupport.error
              ? state.eSimSupport.error
              : `eSim is supported: ${state.eSimSupport.support}`}
          </Typography>
        )}
      </div>
      <div className={classes.container}>
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-smdpAddress"
          label={'address'}
          value={configInput.address}
          required
          onChange={(e) =>
            setConfigInput({
              ...configInput,
              address: e.target.value,
            })
          }
        />
        {/* <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-confirmationCode"
          label={'confirmationCode'}
          value={configInput.confirmationCode}
          onChange={(e) =>
            setConfigInput({
              ...configInput,
              confirmationCode: e.target.value,
            })
          }
        />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-eid"
          label={'eid'}
          value={configInput.eid}
          onChange={(e) =>
            setConfigInput({
              ...configInput,
              eid: e.target.value,
            })
          }
        />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-iccid"
          label={'iccid'}
          value={configInput.iccid}
          onChange={(e) =>
            setConfigInput({
              ...configInput,
              iccid: e.target.value,
            })
          }
        /> */}
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-matchingId"
          label={'matchingId'}
          value={configInput.matchingId}
          onChange={(e) =>
            setConfigInput({
              ...configInput,
              matchingId: e.target.value,
            })
          }
        />
        {/* <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-oid"
          label={'oid'}
          value={configInput.oid}
          onChange={(e) =>
            setConfigInput({
              ...configInput,
              oid: e.target.value,
            })
          }
        /> */}
        <div className={classes.container}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setConfigInput(clearConfigInput);
            }}
            className={classes.formButton}
          >
            Clear Input
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendEsimConfig}
            disabled={
              configInput.address === undefined ||
              configInput.address.trim() === ''
            }
            className={classes.formButton}
          >
            Send eSim Config
          </Button>
        </div>
        {(state.eSimConfig.result != null || state.eSimConfig.error) && (
          <Typography
            variant="body1"
            color={state.eSimConfig.error ? 'error' : 'textSecondary'}
            style={{ marginTop: '20px', wordBreak: 'break-all' }}
          >
            {state.eSimConfig.error
              ? state.eSimConfig.error
              : `eSim config send setupAndInstallEsim was success`}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default ESimComponent;
