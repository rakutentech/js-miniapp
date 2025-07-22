import React, { useState } from 'react';

import {
  Button,
  TextField,
  CardContent,
  CardActions,
  makeStyles,
  InputAdornment, // add this
  IconButton, // add this
} from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';
import GreyCard from '../components/GreyCard';

import { red, green } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close'; // add this

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
  let [launcherInput, setLauncherInput] = useState('');
  let [packageInput, setPackageInput] = useState('');
  const [isAndroid, setIsAndroid] = useState(false);
  const [deeplinkCheckResult, setDeeplinkCheckResult] = useState('');
  const [launcherError, setLauncherError] = useState('');

  React.useEffect(() => {
    if (window.navigator.userAgent.toLowerCase().includes('android')) {
      setIsAndroid(true);
    }
  }, []);

  const clearSendInput = () => {
    setInputValue('');
    setDeeplinkCheckResult('');
  };

  // Deeplink Checker for 1st Gray card
  const handleDeeplinkCheck = (
    checkFunction,
    successMessage,
    failureMessage,
    errorMessage
  ) => {
    setDeeplinkCheckResult('');
    checkFunction(inputValue)
      .then((success) => {
        if (typeof success === 'boolean') {
          setDeeplinkCheckResult(success ? successMessage : failureMessage);
        } else {
          setDeeplinkCheckResult(errorMessage);
        }
      })
      .catch(() => {
        setDeeplinkCheckResult(errorMessage);
      });
  };

  const checkDeeplinkIsAvailable = (inputValue) => {
    handleDeeplinkCheck(
      MiniApp.miniappUtils.canOpenAppDeeplink,
      'Deeplink is available in the device',
      'Deeplink is NOT available in the device',
      'There is some error occurred'
    );
  };

  const checkDeeplinkIsSupported = (inputValue) => {
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

  // Deeplink launcher handlers
  const launchDeeplink = () => {
    setLauncherError('');
    if (!launcherInput) {
      setLauncherError('Please enter a Deeplink URL');
      return;
    }
    MiniApp.miniappUtils
      .launchAppUsingDeeplink(launcherInput)
      .then(() => {
        setLauncherError('');
      })
      .catch((err) => {
        setLauncherError(
          err && err.message ? err.message : 'Failed to launch Deeplink'
        );
      });
  };

  const launchByPackageName = () => {
    setLauncherError('');
    if (!packageInput) {
      setLauncherError('Please enter a Package Name');
      return;
    }
    if (typeof MiniApp.miniappUtils.launchAppByPackageName === 'function') {
      MiniApp.miniappUtils
        .launchAppByPackageName(packageInput)
        .then(() => {
          setLauncherError('');
        })
        .catch((err) => {
          setLauncherError(
            err && err.message
              ? err.message
              : 'Failed to launch App by Package Name'
          );
        });
    } else {
      setLauncherError('launchAppByPackageName is not supported');
    }
  };

  return (
    <div className={classes.scrollable}>
      {/* Deeplink Checker Card */}
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Deeplink URL'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            InputProps={{
              endAdornment: inputValue && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear deeplink input"
                    onClick={clearSendInput}
                    edge="end"
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
        {/* Short note below Deeplink Available button */}
        <CardContent
          style={{ fontSize: 14, color: '#666', textAlign: 'center' }}
        >
          Deeplink available will check only if the given deeplink is available
          in the device, provided this deeplink is whitelisted in Native
          application.
        </CardContent>
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
        {/* Removed Clear button */}
        {/* Display result for Deeplink Checker */}
        {deeplinkCheckResult && (
          <CardContent
            style={{
              color: deeplinkCheckResult.includes('NOT') ? 'red' : 'green',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {deeplinkCheckResult}
          </CardContent>
        )}
        <hr
          style={{
            borderColor: 'primary',
          }}
        />
      </GreyCard>
      <br />
      {/* Deeplink Launcher Card */}
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>Deeplink Launcher</CardContent>
        <CardContent className={classes.content}>
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="launcher-input"
            label={'Deeplink URL'}
            value={launcherInput}
            onChange={(e) => setLauncherInput(e.target.value)}
            InputProps={{
              endAdornment: launcherInput && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear launcher input"
                    onClick={() => setLauncherInput('')}
                    edge="end"
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            className={classes.button}
            onClick={launchDeeplink}
            variant="contained"
          >
            Launch App using Deeplink
          </Button>
        </CardActions>
        {isAndroid && (
          <>
            <CardContent className={classes.content}>
              <TextField
                variant="outlined"
                className={classes.formInput}
                id="package-input"
                label={'Package Name'}
                value={packageInput}
                onChange={(e) => setPackageInput(e.target.value)}
                InputProps={{
                  endAdornment: packageInput && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear package input"
                        onClick={() => setPackageInput('')}
                        edge="end"
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
            <CardActions className={classes.actions}>
              <Button
                color="primary"
                className={classes.button}
                onClick={launchByPackageName}
                variant="contained"
              >
                Launch App using Package name
              </Button>
            </CardActions>
          </>
        )}
        {/* Display errors in label if anything goes wrong */}
        {launcherError && (
          <CardContent
            style={{
              color: 'red',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            {launcherError}
          </CardContent>
        )}
      </GreyCard>
    </div>
  );
};

export default DeeplinkSupport;
