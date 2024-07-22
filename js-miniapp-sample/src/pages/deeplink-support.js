import React, { useState } from 'react';

import {
  Button,
  TextField,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';
import GreyCard from '../components/GreyCard';

import { red, green } from '@material-ui/core/colors';

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
  actions: {
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  sendInput: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    background: 'white',
  },
  receiveInput: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    disabled: 'disabled',
    caretColor: 'transparent',
  },
  formInput: {
    marginTop: 10,
    marginBottom: 10,
    background: 'white',
    width: '90%',
  },
  success: {
    color: green[500],
    marginTop: 20,
    textAlign: 'center',
    wordBreak: 'break-all',
  },
  faliure: {
    color: red[500],
  },
}));

const DeeplinkSupport = () => {
  const classes = useStyles();
  const defaultJsonValue = '';
  let [inputValue, setInputValue] = useState(defaultJsonValue);

  const clearSendInput = () => {
    setInputValue('');
  };

  const handleDeeplinkCheck = (
    checkFunction: (input: string) => Promise<boolean>,
    successMessage: string,
    failureMessage: string,
    errorMessage: string
  ) => {
    checkFunction(inputValue)
      .then((success) => {
        if (typeof success === 'boolean') {
          alert(success ? successMessage : failureMessage);
        } else {
          alert(errorMessage);
        }
      })
      .catch(() => {
        alert(errorMessage);
      });
  };

  const checkDeeplinkIsAvailable = (inputValue: string) => {
    handleDeeplinkCheck(
      MiniApp.miniappUtils.canOpenAppDeeplink,
      'Deeplink is available in the device',
      'Deeplink is NOT available in the device',
      'There is some error occurred'
    );
  };

  const checkDeeplinkIsSupported = (inputValue: string) => {
    handleDeeplinkCheck(
      MiniApp.miniappUtils.isAppDeeplinkSupported,
      'Deeplink is supported by the application',
      'Deeplink is NOT supported by the application',
      'There is some error occurred'
    );
  };

  const checkDeeplink = () => {
    checkDeeplinkIsAvailable(inputValue);
  };

  const checkDeeplinkSupport = () => {
    checkDeeplinkIsSupported(inputValue);
  };

  return (
    <div className={classes.scrollable}>
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Deeplink URL'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            className={classes.button}
            onClick={checkDeeplink}
            variant="contained"
          >
            Deeplink Available ?
          </Button>
        </CardActions>
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            className={classes.button}
            onClick={checkDeeplinkSupport}
            variant="contained"
          >
            Deeplink Supported ?
          </Button>
        </CardActions>
        <CardActions className={classes.actions}>
          <Button
            className={classes.button}
            onClick={clearSendInput}
            variant="contained"
          >
            Clear
          </Button>
        </CardActions>
        <hr
          style={{
            borderColor: 'primary',
          }}
        />
      </GreyCard>
    </div>
  );
};

export default DeeplinkSupport;
