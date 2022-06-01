import React, { useState, useReducer } from 'react';
import {
  Button,
  Container,
  TextField,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { red } from '@material-ui/core/colors';
import MiniApp, { CloseAlertInfo } from 'js-miniapp-sdk';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
    width: '100%',
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
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: null,
        isSuccess: false,
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
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
    dispatch({ type: 'FETCH_INIT', miniAppError: null, inputError: null });
    setMiniAppCloseAlert();
  }

  function setMiniAppCloseAlert() {
    const alert: CloseAlertInfo = {
      shouldDisplay: true,
      title: title,
      description: description,
    };
    MiniApp.setCloseAlert(alert)
      .then(() => {
        console.log('Success');
        alert('Saved');
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
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

  return (
    <Container className={classes.root}>
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
            Items stored Successfully
          </Typography>
        )}
      </Grid>
      <Grid className={classes.grid} align="center">
        <div className={classes.contentSection}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => closeAlert()}
          >
            Save
          </Button>
        </div>
      </Grid>
    </Container>
  );
};

export { CloseConfirmAlert };
export default CloseConfirmAlert;
