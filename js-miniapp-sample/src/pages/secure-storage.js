import {
  Button,
  Card,
  CircularProgress,
  Container,
  FormGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { green, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import clsx from 'clsx';
import { MiniAppError } from 'js-miniapp-sdk';
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';
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
  inputError: String,
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
  size: String,
  requestSetItems: (items: string) => Promise<undefined>,
  requestGetItem: (key: string) => Promise<string>,
  requestRemoveItems: (key: [string]) => Promise<undefined>,
  requestClear: () => Promise<undefined>,
  requestSize: () => Promise<MiniAppSecureStorageSize>,
  storageError: MiniAppError,
};

function SecureStorageComponent(props: SecureStorageProps) {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);
  const classes = useStyles();
  let setStoreKey = useRef(null);
  let setStoreValue = useRef(null);
  let setStoreKey1 = useRef(null);
  let setStoreValue1 = useRef(null);
  let getItemUsingKey = useRef(null);
  let removeUsingKey = useRef(null);
  let removeUsingKey1 = useRef(null);

  const buttonClassname = clsx({
    [classes.buttonFailure]: state.isError,
    [classes.buttonSuccess]: !state.isError,
  });

  function isEmpty(str) {
    return !str || str.trim().length === 0;
  }

  function setSecureStorageButtonClick(e) {
    if (isTextFieldValuesValid()) {
      if (!state.isLoading) {
        dispatch({ type: 'FETCH_INIT', miniAppError: null });
        const keyValuePair = {};
        keyValuePair[setStoreKey.current.value] = setStoreValue.current.value;
        keyValuePair[setStoreKey1.current.value] = setStoreValue1.current.value;

        Object.keys(keyValuePair).forEach((key) => {
          if (!keyValuePair[key]) delete keyValuePair[key];
        });

        props
          .requestSetItems(keyValuePair)
          .then((response) => {
            console.log('Page - SetItems - Success', response);
            dispatch({ type: 'FETCH_SUCCESS', miniAppError: null });
          })
          .catch((miniAppError) => {
            console.log('Page - SetItems - Error: ', miniAppError);
            dispatch({ type: 'FETCH_FAILURE', miniAppError });
          });
      }
    }
  }

  function getSecureStorageButtonClick(e) {
    if (!isEmpty(getItemUsingKey.current.value)) {
      if (!state.isLoading) {
        dispatch({ type: 'FETCH_INIT', miniAppError: null });
        props
          .requestGetItem(getItemUsingKey.current.value)
          .then((response) => {
            console.log('Page - GetItems - Success', response);
            dispatch({ type: 'FETCH_SUCCESS', miniAppError: null });
          })
          .catch((miniAppError) => {
            console.log('Page - GetItems - Error: ', miniAppError);
            dispatch({ type: 'FETCH_FAILURE', miniAppError });
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
    const keys = [removeUsingKey.current.value, removeUsingKey1.current.value];
    const filteredKeys = keys.filter(function (str) {
      return isEmpty(str) === false;
    });
    if (!state.isLoading) {
      dispatch({ type: 'FETCH_INIT', miniAppError: null });
      props
        .requestRemoveItems(filteredKeys)
        .then((response) => {
          console.log('Page - RemoveItems - Success', response);
          dispatch({ type: 'FETCH_SUCCESS', miniAppError: null });
        })
        .catch((miniAppError) => {
          console.log('Page - RemoveItems - Error: ', miniAppError);
          dispatch({ type: 'FETCH_FAILURE', miniAppError });
        });
    }
  }

  function getSizeButtonClick(e) {
    if (!state.isLoading) {
      dispatch({ type: 'FETCH_INIT', miniAppError: null });
      props
        .requestSize()
        .then((response) => {
          console.log('Page - Size - Success', response);
          dispatch({ type: 'FETCH_SUCCESS', miniAppError: null });
        })
        .catch((miniAppError) => {
          console.log('Page - Size - Error: ', miniAppError);
          dispatch({ type: 'FETCH_FAILURE', miniAppError });
        });
    }
  }

  function clearSecureStorageSizeButtonClick(e) {
    if (!state.isLoading) {
      dispatch({ type: 'FETCH_INIT', miniAppError: null });
      props
        .requestClear()
        .then((response) => {
          console.log('Page - clearStorageItems - Success', response);
          dispatch({ type: 'STORAGE_CLEAR_SUCCESS', miniAppError: null });
        })
        .catch((miniAppError) => {
          console.log('Page - clearSecureStorageItems - Error: ', miniAppError);
          dispatch({ type: 'FETCH_FAILURE', miniAppError });
        });
    }
  }

  function isTextFieldValuesValid() {
    if (isEmpty(setStoreKey.current.value)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Key cannot be empty',
      });
      return false;
    } else if (isEmpty(setStoreValue.current.value)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Value cannot be empty',
      });
      return false;
    } else {
      return true;
    }
  }

  function SetSecureStorageCardActionsForm() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <Card>
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Key'}
            inputRef={setStoreKey}
          />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Value'}
            inputRef={setStoreValue}
          />
        </Card>
        <br />
        <Card>
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Key'}
            inputRef={setStoreKey1}
          />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Value'}
            inputRef={setStoreValue1}
          />
        </Card>
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
          inputRef={getItemUsingKey}
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
          inputRef={removeUsingKey}
        />
        <br />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'Key'}
          inputRef={removeUsingKey1}
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
        {!state.isLoading && !state.isError && state.isSuccess && (
          <Typography variant="body1" className={classes.red}>
            <div>Maximum Available: {props.size.max}</div>
            <div>Used Space: {props.size.used}</div>
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch({ type: 'RESET', miniAppError: null });
    setValue(newValue);
  };

  return (
    <Container className={classes.wrapperContainer}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Set" value="1" />
              <Tab label="Get" value="2" />
              <Tab label="Remove" value="3" />
              <Tab label="Others" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">{SetSecureStorageCardActionsForm()}</TabPanel>
          <TabPanel value="2">{GetSecureStorageCardActionsForm()}</TabPanel>
          <TabPanel value="3">{RemoveSecureStorageCardActionsForm()}</TabPanel>
          <TabPanel value="4">{OtherFunctionalitiesCardActionsForm()}</TabPanel>
        </TabContext>
      </Box>
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
    requestSetItems: (items: string) => dispatch(setItems(items)),
    requestGetItem: (key: string) => dispatch(getItem(key)),
    requestRemoveItems: (keys: [string]) => dispatch(removeItems(keys)),
    requestClear: () => dispatch(clear()),
    requestSize: () => dispatch(size()),
  };
};

export { SecureStorageComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecureStorageComponent);
