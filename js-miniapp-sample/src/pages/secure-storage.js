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
  MiniAppSecureStorageSize,
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';
import { connect } from 'react-redux';
import { sendAnalytics } from './helper';
import {
  clear,
  getItem,
  removeItems,
  setItems,
  size,
} from '../services/secure-storage/actions';

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
    case 'STORAGE_CLEAR_SUCCESS':
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

type SecureStorageProps = {
  getItems: string,
  size: MiniAppSecureStorageSize,
  requestSetItems: (items: string) => Promise<string>,
  requestGetItem: (key: string) => Promise<string>,
  requestRemoveItems: (key: Array<string>) => Promise<string>,
  requestClear: () => Promise<string>,
  requestSize: () => Promise<MiniAppSecureStorageSize>,
  storageError: MiniAppError,
};

function SecureStorageComponent(props: SecureStorageProps) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const classes = useStyles();
  const [storeKey, setStoreKey] = useState('');
  const [storeKeyValue, setStoreKeyValue] = useState('');
  const [storeKey1, setStoreKey1] = useState('');
  const [storeKeyValue1, setStoreKeyValue1] = useState('');
  const [getItemUsingKey, setGetItemUsingKey] = useState('');
  const [removeItemUsingKey, setRemoveItemUsingKey] = useState('');
  const [removeItemUsingKey1, setRemoveItemUsingKey1] = useState('');

  const buttonClassname = clsx({
    [classes.buttonFailure]: state.isError,
    [classes.buttonSuccess]: !state.isError,
  });

  function isEmpty(str) {
    return !str || str.trim().length === 0;
  }

  function setSecureStorageButtonClick(e) {
    if (
      isKeyAndValueEmpty(storeKey, storeKeyValue) &&
      isKeyAndValueEmpty(storeKey1, storeKeyValue1)
    ) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Please enter Key and Value',
      });
      return;
    }

    if (
      isValidKeyValue(storeKey, storeKeyValue) &&
      isValidKeyValue(storeKey1, storeKeyValue1)
    ) {
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
      const keyValuePair = {};
      keyValuePair[storeKey] = storeKeyValue;
      keyValuePair[storeKey1] = storeKeyValue1;
      Object.keys(keyValuePair).forEach((key) => {
        if (!keyValuePair[key]) delete keyValuePair[key];
      });
      requestSetItems(keyValuePair);
    }
  }

  function requestSetItems(keyValuePair) {
    props
      .requestSetItems(JSON.stringify(keyValuePair))
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

  function getSecureStorageButtonClick(e) {
    if (!isEmpty(getItemUsingKey)) {
      if (!state.isLoading) {
        dispatch({ type: 'FETCH_INIT', miniAppError: null, inputError: null });
        props
          .requestGetItem(getItemUsingKey)
          .then((response) => {
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

  function removeItemsFromSecureStorageButtonClick(e) {
    const keys = [removeItemUsingKey, removeItemUsingKey1];
    const filteredKeys = keys.filter(function (str) {
      return isEmpty(str) === false;
    });
    if (!state.isLoading) {
      dispatch({ type: 'FETCH_INIT', miniAppError: null, inputError: null });
      props
        .requestRemoveItems(filteredKeys)
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

  function getSizeButtonClick(e) {
    if (!state.isLoading) {
      dispatch({ type: 'FETCH_INIT', miniAppError: null, inputError: null });
      props
        .requestSize()
        .then((response) => {
          console.log('Page - Size - Success', response);
          dispatch({
            type: 'FETCH_SUCCESS',
            miniAppError: null,
            inputError: null,
          });
        })
        .catch((miniAppError) => {
          console.log('Page - Size - Error: ', miniAppError);
          dispatch({ type: 'FETCH_FAILURE', miniAppError, inputError: null });
        });
    }
  }

  function clearSecureStorageSizeButtonClick(e) {
    if (!state.isLoading) {
      dispatch({ type: 'FETCH_INIT', miniAppError: null, inputError: null });
      props
        .requestClear()
        .then((response) => {
          console.log('Page - clearStorageItems - Success', response);
          dispatch({
            type: 'STORAGE_CLEAR_SUCCESS',
            miniAppError: null,
            inputError: null,
          });
        })
        .catch((miniAppError) => {
          console.log('Page - clearSecureStorageItems - Error: ', miniAppError);
          dispatch({ type: 'FETCH_FAILURE', miniAppError, inputError: null });
        });
    }
  }

  function isKeyAndValueEmpty(key, val) {
    return isEmpty(key) && isEmpty(val);
  }

  function isValidKeyValue(key, val) {
    if (isEmpty(key) && !isEmpty(val)) {
      return false;
    } else if (!isEmpty(key) && isEmpty(val)) {
      return false;
    }
    return true;
  }

  function SetSecureStorageCardActionsForm() {
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
        <Fragment>
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Key'}
            value={storeKey1}
            onChange={(e) => setStoreKey1(e.target.value)}
          />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Value'}
            value={storeKeyValue1}
            onChange={(e) => setStoreKeyValue1(e.target.value)}
          />
        </Fragment>
        <br />
        <br />
        <Button
          onClick={setSecureStorageButtonClick}
          variant="contained"
          color="primary"
          classes={{ root: classes.button }}
          className={buttonClassname}
          disabled={state.isLoading}
          data-testid="setSecureStorage"
        >
          Set Secure Storage
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
          <Typography variant="body1" className={classes.red}>
            Items stored Successfully
          </Typography>
        )}
      </FormGroup>
    );
  }

  function GetSecureStorageCardActionsForm() {
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
          onClick={getSecureStorageButtonClick}
          variant="contained"
          color="primary"
          classes={{ root: classes.button }}
          className={buttonClassname}
          disabled={state.isLoading}
          data-testid="getSecureStorage"
        >
          Get Secure Storage
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
        {!state.isLoading && !state.isError && (
          <Typography variant="body1" className={classes.red}>
            {props.getItems}
          </Typography>
        )}
      </FormGroup>
    );
  }

  function RemoveSecureStorageCardActionsForm() {
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
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'Key'}
          value={removeItemUsingKey1}
          onChange={(e) => setRemoveItemUsingKey1(e.target.value)}
        />
        <br />
        <br />
        <Button
          onClick={removeItemsFromSecureStorageButtonClick}
          variant="contained"
          color="primary"
          classes={{ root: classes.button }}
          className={buttonClassname}
          disabled={state.isLoading}
          data-testid="removeSecureStorage"
        >
          Remove Items
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
          <Typography variant="body1" className={classes.red}>
            Items removed Successfully
          </Typography>
        )}
      </FormGroup>
    );
  }

  function OtherFunctionalitiesCardActionsForm() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <Button
          onClick={getSizeButtonClick}
          variant="contained"
          color="primary"
          classes={{ root: classes.button }}
          className={buttonClassname}
          disabled={state.isLoading}
          data-testid="getSizeSecureStorage"
        >
          Get Size
        </Button>
        <br />
        <Button
          onClick={clearSecureStorageSizeButtonClick}
          variant="contained"
          color="primary"
          classes={{ root: classes.button }}
          className={buttonClassname}
          disabled={state.isLoading}
          data-testid="clearSecureStorage"
        >
          Clear Storage
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
        {!state.isLoading &&
          !state.isError &&
          state.isSuccess &&
          props.size && (
            <Typography variant="body1" className={classes.red}>
              <div>Maximum Size: {props.size.max}</div>
              <div>Used Space: {props.size.used}</div>
              <div>Available: {props.size.max - props.size.used}</div>
            </Typography>
          )}
        {!state.isLoading && !state.isError && state.isStorageCleaned && (
          <Typography variant="body1" className={classes.red}>
            Storage Cleared Successfully
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
      'Secure storage',
      'Screen',
      'Page',
      ''
    );
  });

  return (
    <Container className={classes.wrapperContainer}>
      <TabContext value={value}>
        <TabList
          variant="scrollable"
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Set" value="1" />
          <Tab label="Get" value="2" />
          <Tab label="Remove" value="3" />
          <Tab label="Others" value="4" />
        </TabList>
        <TabPanel value="1">{SetSecureStorageCardActionsForm()}</TabPanel>
        <TabPanel value="2">{GetSecureStorageCardActionsForm()}</TabPanel>
        <TabPanel value="3">{RemoveSecureStorageCardActionsForm()}</TabPanel>
        <TabPanel value="4">{OtherFunctionalitiesCardActionsForm()}</TabPanel>
      </TabContext>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    setItems: state.secureStorage.setItems,
    getItems: state.secureStorage.getItem,
    size: state.secureStorage.size,
    storageError: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestSetItems: (items) => dispatch(setItems(items)),
    requestGetItem: (key) => dispatch(getItem(key)),
    requestRemoveItems: (keys) => dispatch(removeItems(keys)),
    requestClear: () => dispatch(clear()),
    requestSize: () => dispatch(size()),
  };
};

export { SecureStorageComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecureStorageComponent);
