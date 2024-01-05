import React, { useState, useReducer, useEffect } from 'react';

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
import Checkbox from '@mui/material/Checkbox';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import FormControlLabel from '@mui/material/FormControlLabel';
import MiniApp, {
  CloseAlertInfo,
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';
import { sendAnalytics } from './helper';

const useStyles = makeStyles((theme) => ({
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
    case 'SET_CLOSE_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
        isSuccess: false,
        inputError: null,
      };
    case 'SET_CLOSE_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: state.error,
        isSuccess: false,
        inputError: null,
      };
    case 'SET_CLOSE_SUCCESS':
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

function CloseConfirmAlert() {
  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'App Close alert',
      'Screen',
      'Page',
      ''
    );
  });

  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = React.useState(true);
  const [withConfirmAlert, setWithConfirmAlert] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const closeMiniAppWithConfirmation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWithConfirmAlert(event.target.checked);
  };

  function closeAlert() {
    if (!isTextFieldValuesValid(title)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Title cannot be empty',
      });
      return;
    }
    if (!isTextFieldValuesValid(description)) {
      dispatch({
        type: 'INPUT_FAILURE',
        miniAppError: null,
        inputError: 'Description cannot be empty',
      });
      return;
    }
    dispatch({ type: 'SET_CLOSE_INIT', miniAppError: null, inputError: null });
    setMiniAppCloseAlert();
  }

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

  function setMiniAppCloseAlert() {
    const alert: CloseAlertInfo = {
      shouldDisplay: checked,
      title: title,
      description: description,
    };
    MiniApp.miniappUtils
      .setCloseAlert(alert)
      .then(() => {
        dispatch({
          type: 'SET_CLOSE_SUCCESS',
          miniAppError: null,
          inputError: 'null',
        });
      })
      .catch((error) => {
        dispatch({
          type: 'SET_CLOSE_FAILURE',
          miniAppError: null,
          inputError: 'null',
        });
      });
  }

  function closeMiniApp() {
    MiniApp.miniappUtils.closeMiniApp(withConfirmAlert).catch((error) => {
      dispatch({
        type: 'SET_CLOSE_FAILURE',
        miniAppError: null,
        inputError: 'null',
      });
    });
  }

  function SetCloseAlertConfirmationPanel() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'Title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          className={classes.formInput}
          id="input-name"
          label={'Description'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <Grid>
          <FormControlLabel
            value="closeAlert"
            control={<Checkbox />}
            label="Show Close Alert"
            labelPlacement="closeAlert"
            checked={checked}
            onChange={handleChange}
          />
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
              Alert information stored Successfully
            </Typography>
          )}
        </Grid>
        <Grid className={classes.grid} align="center">
          <div className={classes.contentSection}>
            <Button variant="contained" color="primary" onClick={closeAlert}>
              Save
            </Button>
          </div>
        </Grid>
      </FormGroup>
    );
  }

  function CloseMiniAppPanel() {
    return (
      <FormGroup column="true" className={classes.rootUserGroup}>
        <Grid>
          <FormControlLabel
            value="closeAlert"
            control={<Checkbox />}
            label="Should Display Confirmation?"
            labelPlacement="closeAlert"
            checked={withConfirmAlert}
            onChange={closeMiniAppWithConfirmation}
          />
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
              Alert information stored Successfully
            </Typography>
          )}
        </Grid>
        <Grid className={classes.grid} align="center">
          <div className={classes.contentSection}>
            <Button variant="contained" color="primary" onClick={closeMiniApp}>
              Close Mini App
            </Button>
          </div>
        </Grid>
      </FormGroup>
    );
  }

  const [tabValue, setTabValue] = React.useState('1');

  const handleTabChange = (event: Event, newValue: string) => {
    dispatch({ type: 'SET_CLOSE_INIT', miniAppError: null, inputError: null });
    setTabValue(newValue);
  };

  return (
    <Container className={classes.wrapperContainer}>
      <TabContext value={tabValue}>
        <TabList
          variant="scrollable"
          onChange={handleTabChange}
          aria-label="simple tabs example"
        >
          <Tab label="Set Close Alert" value="1" />
          <Tab label="Close Mini App" value="2" />
        </TabList>
        <TabPanel value="1">{SetCloseAlertConfirmationPanel()}</TabPanel>
        <TabPanel value="2">{CloseMiniAppPanel()}</TabPanel>
      </TabContext>
    </Container>
  );
}

export { CloseConfirmAlert };
export default CloseConfirmAlert;
