import React, { useReducer, useState, Fragment, useEffect } from 'react';

import {
  Button,
  CircularProgress,
  Container,
  FormGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import clsx from 'clsx';
import {
  MiniAppError,
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';
import { sendAnalytics } from './helper';
import MiniApp from 'js-miniapp-sdk';

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
  root: {
    background: theme.color.secondary,
    width: '85vw',
    maxWidth: 500,
    color: red,
  },
  wrapperContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 0,
  },
  wrapper: {
    position: 'relative',
    marginTop: 10,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonFailure: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonProgress: {
    position: 'absolute',
    top: 'calc(50% - 10px)',
    left: 'calc(50% - 10px)',
  },
  error: {
    color: red[500],
    marginTop: 10,
  },
  success: {
    color: green[500],
    marginTop: 20,
  },
  rootUserGroup: {
    alignItems: 'center',
  },
  formInput: {
    width: '90%',
    marginTop: 10,
  },
  rootCardActions: {
    justifyContent: 'center',
  },
  caseSelector: {
    marginTop: 5,
  },
  button: {
    marginBottom: 15,
  },
  dataFormsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    width: '100%',
    paddingBottom: 10,
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  red: {
    color: red[500],
  },
  green: {
    color: green[500],
  },
  padding10: {
    padding: 10,
  },
}));

export const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  isSuccess: false,
  inputError: null,
  isStorageCleaned: false,
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
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
        isSuccess: false,
        inputError: null,
        isStorageCleaned: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: true,
        inputError: null,
        isStorageCleaned: false,
      };
    case 'FETCH_FAILURE':
      return {
        ...initialState,
        isLoading: false,
        isError: true,
        error:
          (typeof action.miniAppError == 'string'
            ? action.miniAppError
            : action.miniAppError.message) || '',
        isSuccess: false,
        inputError: null,
        isStorageCleaned: false,
      };
    case 'INPUT_FAILURE':
      return {
        ...initialState,
        isLoading: false,
        isError: true,
        error: null,
        isSuccess: false,
        inputError: action.inputError,
        isStorageCleaned: false,
      };
    case 'RESET':
      return {
        ...initialState,
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        inputError: null,
        isStorageCleaned: false,
      };
    case 'MINIAPP_PREFERENCE_CLEAR_SUCCESS':
      return {
        ...initialState,
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: false,
        inputError: null,
        isStorageCleaned: true,
      };
    default:
      throw Error('Unknown action type');
  }
};

function MiniAppPreferenceComponent() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const [storeKey, setStoreKey] = useState('');
  const [storeKeyValue, setStoreKeyValue] = useState('');
  const [getItemUsingKey, setGetItemUsingKey] = useState('');
  const [retrievedValue, setRetrievedValue] = useState('');
  const [removeItemUsingKey, setRemoveItemUsingKey] = useState('');

  const buttonClassname = clsx({
    [classes.buttonFailure]: state.isError,
    [classes.buttonSuccess]: !state.isError,
  });

  function isEmpty(str) {
    return !str || str.trim().length === 0;
  }

  function setItemMiniAppPreferenceButtonClick(e) {
    if (isKeyAndValueEmpty(storeKey, storeKeyValue)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Please enter Key and Value',
      });
      return;
    }

    if (isValidKeyValue(storeKey, storeKeyValue)) {
      dispatch({ type: 'RESET', miniAppError: null, inputError: null });
      saveItems();
    } else {
      console.log('ERROR');
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Please enter both Key and Value',
      });
    }
  }

  function saveItems() {
    if (!state.isLoading) {
      dispatch({ type: 'FETCH_INIT', miniAppError: null, inputError: null });
      requestSetItem(storeKey, storeKeyValue);
    }
  }

  function requestSetItem(key, value) {
    console.log('requestSetItem' + key + ' value: ' + value);
    MiniApp.preferences
      .set(key, value)
      .then((response) => {
        console.log('Page - SetItems - Success', response);
        dispatch({
          type: 'FETCH_SUCCESS',
          miniAppError: null,
          inputError: null,
        });
      })
      .catch((miniAppError) => {
        console.log('Page - SetItems - Error: ', miniAppError);
        dispatch({ type: 'FETCH_FAILURE', miniAppError, inputError: null });
      });
  }

  function getItemButtonClick(e) {
    if (!isEmpty(getItemUsingKey)) {
      if (!state.isLoading) {
        dispatch({ type: 'FETCH_INIT', miniAppError: null, inputError: null });
        MiniApp.preferences
          .get(getItemUsingKey)
          .then((response) => {
            setRetrievedValue(response);
            console.log('Page - GetItems - Success', response);
            dispatch({
              type: 'FETCH_SUCCESS',
              miniAppError: null,
              inputError: null,
            });
          })
          .catch((miniAppError) => {
            console.log('Page - GetItems - Error: ', miniAppError);
            dispatch({ type: 'FETCH_FAILURE', miniAppError, inputError: null });
          });
      }
    } else {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Key cannot be empty',
      });
    }
  }

  function removeItemButtonClick(e) {
    if (!state.isLoading) {
      dispatch({ type: 'FETCH_INIT', miniAppError: null, inputError: null });
      MiniApp.preferences
        .remove(removeItemUsingKey)
        .then((response) => {
          console.log('Page - RemoveItems - Success', response);
          dispatch({
            type: 'FETCH_SUCCESS',
            miniAppError: null,
            inputError: null,
          });
        })
        .catch((miniAppError) => {
          console.log('Page - RemoveItems - Error: ', miniAppError);
          dispatch({ type: 'FETCH_FAILURE', miniAppError, inputError: null });
        });
    }
  }

  function clearMiniAppPreferenceButtonClick(e) {
    if (!state.isLoading) {
      dispatch({ type: 'FETCH_INIT', miniAppError: null, inputError: null });
      MiniApp.preferences
        .clearMiniAppPreferences()
        .then((response) => {
          console.log('Page - Clear Preference - Success', response);
          dispatch({
            type: 'MINIAPP_PREFERENCE_CLEAR_SUCCESS',
            miniAppError: null,
            inputError: null,
          });
        })
        .catch((miniAppError) => {
          console.log('Page - Clear Preference - Error: ', miniAppError);
          dispatch({ type: 'FETCH_FAILURE', miniAppError, inputError: null });
        });
    }
  }

  function isKeyAndValueEmpty(key, val) {
    return isEmpty(key) && isEmpty(val);
  }

  function isValidKeyValue(key, val) {
    return !(isEmpty(key) && !isEmpty(val)) && !(isEmpty(val) && !isEmpty(key));
  }

  function SetPreferenceCardActionsForm() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <Fragment>
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Key'}
            value={storeKey}
            onChange={(e) => setStoreKey(e.target.value)}
          />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Value'}
            value={storeKeyValue}
            onChange={(e) => setStoreKeyValue(e.target.value)}
          />
        </Fragment>
        <br />
        <Button
          onClick={setItemMiniAppPreferenceButtonClick}
          variant="contained"
          color="primary"
          classes={{ root: classes.button }}
          className={buttonClassname}
          disabled={state.isLoading}
          data-testid="setMiniappPreference"
        >
          Set Value
        </Button>
        {state.isLoading && (
          <CircularProgress size={20} className={classes.buttonProgress} />
        )}
        {!state.isLoading && state.isError && (
          <Typography variant="body1" className={classes.red}>
            {state.inputError}
          </Typography>
        )}
        {!state.isLoading && state.isError && (
          <Typography variant="body1" className={classes.red}>
            {state.error}
          </Typography>
        )}
        {!state.isLoading && state.isSuccess && (
          <Typography variant="body1" className={classes.green}>
            Item stored Successfully
          </Typography>
        )}
      </FormGroup>
    );
  }

  function GetPreferenceCardActionsForm() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'Key'}
          value={getItemUsingKey}
          onChange={(e) => setGetItemUsingKey(e.target.value)}
        />
        <br />
        <Button
          onClick={getItemButtonClick}
          variant="contained"
          color="primary"
          classes={{ root: classes.button }}
          className={buttonClassname}
          disabled={state.isLoading}
          data-testid="getMiniappPreference"
        >
          Get Value
        </Button>
        {state.isLoading && (
          <CircularProgress size={20} className={classes.buttonProgress} />
        )}
        {!state.isLoading && state.isError && (
          <Typography variant="body1" className={classes.red}>
            {state.inputError}
          </Typography>
        )}
        {!state.isLoading && state.isError && (
          <Typography variant="body1" className={classes.red}>
            {state.error}
          </Typography>
        )}
        {!state.isLoading && state.isSuccess && (
          <Typography variant="body1" className={classes.green}>
            {retrievedValue}
          </Typography>
        )}
      </FormGroup>
    );
  }

  function RemoveItemPreferenceCardActionsForm() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'Key'}
          value={removeItemUsingKey}
          onChange={(e) => setRemoveItemUsingKey(e.target.value)}
        />
        <br />
        <Button
          onClick={removeItemButtonClick}
          variant="contained"
          color="primary"
          classes={{ root: classes.button }}
          className={buttonClassname}
          disabled={state.isLoading}
          data-testid="removeMiniappPreference"
        >
          Remove Item
        </Button>
        {state.isLoading && (
          <CircularProgress size={20} className={classes.buttonProgress} />
        )}
        {!state.isLoading && state.isError && (
          <Typography variant="body1" className={classes.red}>
            {state.inputError}
          </Typography>
        )}
        {!state.isLoading && state.isError && (
          <Typography variant="body1" className={classes.red}>
            {state.error}
          </Typography>
        )}
        {!state.isLoading && state.isSuccess && (
          <Typography variant="body1" className={classes.green}>
            Item removed Successfully
          </Typography>
        )}
      </FormGroup>
    );
  }

  function ClearCardActionsForm() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <Button
          onClick={clearMiniAppPreferenceButtonClick}
          variant="contained"
          color="primary"
          classes={{ root: classes.button }}
          className={buttonClassname}
          disabled={state.isLoading}
          data-testid="clearMiniAppPreference"
        >
          Clear MiniApp Preference
        </Button>

        {state.isLoading && (
          <CircularProgress size={20} className={classes.buttonProgress} />
        )}
        {!state.isLoading && state.isError && (
          <Typography variant="body1" className={classes.red}>
            {state.inputError}
          </Typography>
        )}
        {!state.isLoading && state.isError && (
          <Typography variant="body1" className={classes.red}>
            {state.error}
          </Typography>
        )}
        {!state.isLoading && !state.isError && state.isStorageCleaned && (
          <Typography variant="body1" className={classes.green}>
            MiniApp preferences Cleared Successfully
          </Typography>
        )}
      </FormGroup>
    );
  }

  const [value, setValue] = React.useState('1');

  const handleChange = (event: Event, newValue: string) => {
    dispatch({ type: 'RESET', miniAppError: null, inputError: null });
    setValue(newValue);
  };

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Mini App Preference',
      'Screen',
      'Page',
      ''
    );
  });

  return (
    <Container className={classes.wrapperContainer}>
      <TabContext value={value}>
        <TabList variant="scrollable" onChange={handleChange}>
          <Tab label="Set" value="1" />
          <Tab label="Get" value="2" />
          <Tab label="Remove" value="3" />
          <Tab label="Clear" value="4" />
        </TabList>
        <TabPanel value="1">{SetPreferenceCardActionsForm()}</TabPanel>
        <TabPanel value="2">{GetPreferenceCardActionsForm()}</TabPanel>
        <TabPanel value="3">{RemoveItemPreferenceCardActionsForm()}</TabPanel>
        <TabPanel value="4">{ClearCardActionsForm()}</TabPanel>
      </TabContext>
    </Container>
  );
}

export { MiniAppPreferenceComponent };
