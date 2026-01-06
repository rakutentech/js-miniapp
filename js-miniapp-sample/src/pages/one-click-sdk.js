import React, { useState, useReducer } from 'react';

import {
  Button,
  Container,
  TextField,
  Grid,
  makeStyles,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import MiniApp, { OneClickSdkICInfo } from 'js-miniapp-sdk';

const useStyles = makeStyles((theme) => ({
  scrollable: {
    overflowY: 'scroll',
    width: '100%',
    paddingTop: '20px',
    paddingBottom: '50px',
  },
  root: {
    height: '90%',
    width: '100%',
  },
  wrapperContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 0,
  },
  grid: {
    display: 'flex',
    height: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
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
  contentSection: {
    height: '30%',
    padding: '10px',
  },
  label: {
    display: 'block',
    fontSize: 12,
    width: '100%',
    color: theme.color.primary,
  },
  error: {
    color: red[500],
    marginTop: 10,
  },
  red: {
    color: red[500],
  },
  green: {
    color: green[500],
  },
  rootUserGroup: {
    marginTop: 20,
  },
  formInput: {
    width: '100%',
  },
}));

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  inputError: null,
};

type State = {
  isLoading: ?boolean,
  isError: ?boolean,
};

type Action = {
  type: string,
  miniAppError: MiniAppError,
  inputError: ?string,
};

export const dataFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ONE_CLICK_SDK_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
        isSuccess: false,
        inputError: null,
      };
    case 'SET_ONE_CLICK_SDK_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.miniAppError,
        isSuccess: false,
        inputError: null,
      };
    case 'SET_ONE_CLICK_SDK_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: true,
        inputError: null,
      };
    case 'INPUT_FAILURE':
      return {
        ...initialState,
        isLoading: false,
        isError: true,
        error: null,
        isSuccess: false,
        inputError: action.inputError,
      };

    default:
      throw new Error('Unknown action type');
  }
};
function isEmpty(str) {
  return !str || str.trim().length === 0;
}

function OneClickSdk() {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const classes = useStyles();

  const [idid, setIdid] = useState('');
  const [minor, setMinor] = useState('');
  const [redirectUri, setRedirectUri] = useState('');
  const [supportedKycTypes, setSupportedKycTypes] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [enabledSecurityCheck, setEnabledSecurityCheck] = useState(false);

  function isTextFieldValuesValid(textFieldValue, fieldName) {
    if (isEmpty(textFieldValue)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: `${fieldName} cannot be empty`,
      });
      return false;
    } else {
      return true;
    }
  }

  function startICChipKycFlow() {
    // Validate required fields
    if (!isTextFieldValuesValid(idid, 'IDID')) {
      return;
    }
    if (!isTextFieldValuesValid(minor, 'Minor')) {
      return;
    }
    if (!isTextFieldValuesValid(redirectUri, 'Redirect URI')) {
      return;
    }
    if (!isTextFieldValuesValid(supportedKycTypes, 'Supported KYC Types')) {
      return;
    }

    dispatch({
      type: 'SET_ONE_CLICK_SDK_INIT',
      miniAppError: null,
      inputError: null,
    });

    const icInfo: OneClickSdkICInfo = {
      idid: idid,
      minor: minor,
      redirectUri: redirectUri,
      supportedKycTypes: supportedKycTypes,
      baseUrl: baseUrl || undefined,
      enabledSecurityCheck: enabledSecurityCheck,
    };

    try {
      console.log('Starting IC Chip KYC with info:', icInfo);
      MiniApp.oneClickSdk
        .startICChipKyc(icInfo)
        .then((response) => {
          console.log('IC Chip KYC started successfully:', response);
          dispatch({
            type: 'SET_ONE_CLICK_SDK_SUCCESS',
            miniAppError: null,
            inputError: null,
          });
        })
        .catch((error) => {
          console.error('Error starting IC Chip KYC:', error);
          dispatch({
            type: 'SET_ONE_CLICK_SDK_FAILURE',
            miniAppError: error,
            inputError: null,
          });
        });
    } catch (error) {
      console.error('An error occurred while starting IC Chip KYC:', error);
      dispatch({
        type: 'SET_ONE_CLICK_SDK_FAILURE',
        miniAppError: error,
        inputError: null,
      });
    }
  }

  return (
    <div className={classes.scrollable}>
      <Container className={classes.rootUserGroup}>
        <FormGroup column="true" className={classes.rootUserGroup}>
          <Typography variant="h6" gutterBottom>
            One Click SDK - IC Chip KYC
          </Typography>
          <br />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-idid"
            label="IDID (required)"
            value={idid}
            onChange={(e) => setIdid(e.target.value)}
            placeholder="Enter IDID"
          />
          <br />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-minor"
            label="Minor (required)"
            value={minor}
            onChange={(e) => setMinor(e.target.value)}
            placeholder="Enter minor version"
          />
          <br />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-redirect-uri"
            label="Redirect URI (required)"
            value={redirectUri}
            onChange={(e) => setRedirectUri(e.target.value)}
            placeholder="Enter redirect URI"
          />
          <br />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-kyc-types"
            label="Supported KYC Types (required)"
            value={supportedKycTypes}
            onChange={(e) => setSupportedKycTypes(e.target.value)}
            placeholder="Enter supported KYC types"
          />
          <br />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-base-url"
            label="Base URL (optional)"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="Enter base URL (optional)"
          />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={enabledSecurityCheck}
                onChange={(e) => setEnabledSecurityCheck(e.target.checked)}
                name="enabledSecurityCheck"
                color="primary"
              />
            }
            label="Enable Security Check"
          />
          <br />
          <Grid>
            {!state.isLoading && state.isError && state.inputError && (
              <Typography variant="body1" className={classes.red}>
                {state.inputError}
              </Typography>
            )}
            {!state.isLoading && state.isError && state.error && (
              <Typography variant="body1" className={classes.red}>
                Error: {state.error.message || JSON.stringify(state.error)}
              </Typography>
            )}
            {!state.isLoading && state.isSuccess && (
              <Typography variant="body1" className={classes.green}>
                IC Chip KYC flow started successfully
              </Typography>
            )}
            {state.isLoading && (
              <Typography variant="body1">
                Starting IC Chip KYC flow...
              </Typography>
            )}
          </Grid>
          <Grid className={classes.grid} align="center">
            <div className={classes.contentSection}>
              <Button
                variant="contained"
                color="primary"
                onClick={startICChipKycFlow}
                disabled={state.isLoading}
              >
                Start IC Chip KYC
              </Button>
            </div>
          </Grid>
        </FormGroup>
      </Container>
    </div>
  );
}

export { OneClickSdk };
export default OneClickSdk;
