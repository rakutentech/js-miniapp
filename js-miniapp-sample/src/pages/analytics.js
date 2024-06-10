import React, { useState, useReducer } from 'react';

import {
  Button,
  Container,
  TextField,
  Grid,
  makeStyles,
  Typography,
  FormGroup,
} from '@material-ui/core';
import { red, green } from '@material-ui/core/colors';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { sendAnalytics } from './helper';

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
  table: {
    minWidth: '80%',
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
  imageBox: {
    height: '250px',
    margin: '20px',
  },
  imageBoxContent: {
    height: '250px',
    objectFit: 'contain',
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
    case 'SET_ANALYTICS_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
        isSuccess: false,
        inputError: null,
      };
    case 'SET_ANALYTICS_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: state.error,
        isSuccess: false,
        inputError: null,
      };
    case 'SET_ANALYTICS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: state.error,
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
      throw Error('Unknown action type');
  }
};

function Analytics() {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const classes = useStyles();

  const [accountId, setAccountId] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [ssc, setSsc] = useState('');
  const [pgn, setPgn] = useState('');
  const [genre, setGenre] = useState('');
  const [etype, setEtype] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [elementType, setElementType] = useState('');
  const defaultJsonString = '{"contracted_plan": "Test"}';

  // Initialize the state with the default JSON string and its parsed object
  const [jsonString, setJsonString] = useState(defaultJsonString);

  function SaveAnalyticsInfo() {
    if (!isTextFieldValuesValid(accountId)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Account ID cannot be empty',
      });
      return;
    }
    if (!isTextFieldValuesValid(applicationId)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Application ID cannot be empty',
      });
      return;
    }
    dispatch({
      type: 'SET_ANALYTICS_SUCCESS',
      miniAppError: null,
      inputError: null,
    });
  }

  const handleCustomDataChange = (e) => {
    const newJsonString = e.target.value;
    setJsonString(newJsonString);
  };

  function isEmpty(str) {
    return !str || str.trim().length === 0;
  }

  function isTextFieldValuesValid(textFieldValue) {
    if (isEmpty(textFieldValue)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Key cannot be empty',
      });
      return false;
    } else {
      return true;
    }
  }

  function sendAnalyticsToNative() {
    if (!isTextFieldValuesValid(accountId)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Account ID cannot be empty',
      });
      setTabValue('1');
      return;
    }
    if (!isTextFieldValuesValid(applicationId)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Application ID cannot be empty',
      });
      setTabValue('1');
      return;
    }
    sendAnalytics(
      etype,
      '',
      pgn,
      '',
      elementType,
      jsonString,
      ssc,
      genre,
      customerId,
      accountId,
      applicationId
    );
  }

  function SetAnalyticsAccountPanel() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'Account ID'}
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'Application ID'}
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
        />
        <br />
        <br />
        <Grid>
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
              Account Info stored Successfully
            </Typography>
          )}
        </Grid>
        <Grid className={classes.grid} align="center">
          <div className={classes.contentSection}>
            <Button
              variant="contained"
              color="primary"
              onClick={SaveAnalyticsInfo}
            >
              Save
            </Button>
          </div>
        </Grid>
      </FormGroup>
    );
  }

  function SendAnalyticsPanel() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <br />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'etype - appear/click/error/custom/pv'}
          value={etype}
          onChange={(e) => setEtype(e.target.value)}
        />
        <br />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'ssc'}
          value={ssc}
          onChange={(e) => setSsc(e.target.value)}
        />
        <br />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'pgn'}
          value={pgn}
          onChange={(e) => setPgn(e.target.value)}
        />
        <br />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'Target Element'}
          value={elementType}
          onChange={(e) => setElementType(e.target.value)}
        />
        <br />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'genre'}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <br />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'CustomerId'}
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <br />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'Custom JSON Data'}
          value={jsonString}
          onChange={handleCustomDataChange}
        />
        <Grid>
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
              Analytics sent Successfully
            </Typography>
          )}
        </Grid>
        <Grid className={classes.grid} align="center">
          <div className={classes.contentSection}>
            <Button
              variant="contained"
              color="primary"
              onClick={sendAnalyticsToNative}
            >
              Send Analytics
            </Button>
          </div>
        </Grid>
      </FormGroup>
    );
  }

  const [tabValue, setTabValue] = React.useState('1');

  const handleTabChange = (event: Event, newValue: string) => {
    dispatch({
      type: 'SET_ANALYTICS_INIT',
      miniAppError: null,
      inputError: null,
    });
    setTabValue(newValue);
  };

  return (
    <div className={classes.scrollable}>
      <Container className={classes.rootUserGroup}>
        <TabContext value={tabValue}>
          <TabList variant="scrollable" onChange={handleTabChange}>
            <Tab label="Account Details" value="1" />
            <Tab label="Analytics Info" value="2" />
          </TabList>
          <TabPanel value="1">{SetAnalyticsAccountPanel()}</TabPanel>
          <TabPanel value="2">{SendAnalyticsPanel()}</TabPanel>
        </TabContext>
      </Container>
    </div>
  );
}

export { Analytics };
export default Analytics;
