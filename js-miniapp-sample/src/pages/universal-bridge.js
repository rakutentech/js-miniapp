import React, { useState, useEffect } from 'react';

import {
  Button,
  TextField,
  CardContent,
  CardActions,
  makeStyles,
  Typography,
} from '@material-ui/core';
import MiniApp, {
  MAAnalyticsActionType,
  MAAnalyticsEventType,
  UniversalBridgeInfo,
} from 'js-miniapp-sdk';
import { HostAppEvents } from 'js-miniapp-sdk';
import { sendAnalytics } from './helper';
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

const UniversalBridge = () => {
  const classes = useStyles();
  const defaultJsonValue = '{"data":"This is a sample json information"}';
  let [inputValue, setInputValue] = useState(defaultJsonValue);
  let [infoInputKey, setInfoInputKey] = useState();
  let [infoInputValue, setInfoInputValue] = useState();
  let [infoInputDescription, setInfoInputDescription] = useState();
  let [receiveJsonInfo, setReceiveJsonInfo] = useState('');
  let [sendJsonStatus, setSendJsonStatus] = useState('');

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Universal Bridge',
      'Screen',
      'Page',
      ''
    );
  });

  window.addEventListener(HostAppEvents.RECEIVE_JSON_INFO, function (e) {
    let message = e.detail.message;
    console.log(message);
    receiveJsonInfo = message;
    setReceiveJsonInfo(message);
  });

  const handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.currentTarget.value);
  };

  const clearSendInput = () => {
    setInputValue('');
  };

  const clearInfoSendInput = () => {
    setInfoInputKey('');
    setInfoInputValue('');
    setInfoInputDescription('');
  };

  const sendJson = () => {
    const info = { content: inputValue };
    MiniApp.universalBridge
      .sendJsonToHostapp(info)
      .then((success) => {
        console.log(success);
        setSendJsonStatus('SUCCESS');
      })
      .catch((miniAppError) => {
        console.error(miniAppError);
        setSendJsonStatus(miniAppError.message);
      });
  };

  const sendInfo = () => {
    const info: UniversalBridgeInfo = {
      key: infoInputKey,
      value: infoInputValue,
      description: infoInputDescription,
    };
    MiniApp.universalBridge
      .sendInfoToHostapp(info)
      .then((success) => {
        console.log(success);
        setSendJsonStatus('SUCCESS');
      })
      .catch((miniAppError) => {
        console.error(miniAppError);
        setSendJsonStatus(miniAppError.message);
      });
  };

  const showSendJsonStatus = () => {
    if (sendJsonStatus === '') {
      return <div></div>;
    }
    if (sendJsonStatus === 'SUCCESS') {
      return (
        <Typography variant="body2" className={classes.success}>
          "{sendJsonStatus}"
        </Typography>
      );
    } else {
      return (
        <Typography variant="body2" className={classes.red}>
          "Error: {sendJsonStatus}"
        </Typography>
      );
    }
  };

  return (
    <div className={classes.scrollable}>
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>
          <p>Send JSON/String to HostApp</p>
          <div>{showSendJsonStatus()}</div>
        </CardContent>
        <CardContent className={classes.content}>
          <TextField
            type="text"
            className={classes.sendInput}
            onChange={handleInput}
            placeholder="Input JSON/String here..."
            value={inputValue}
            variant="outlined"
            color="primary"
            multiline="true"
            inputProps={{
              'data-testid': 'input-field',
            }}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            className={classes.button}
            onClick={sendJson}
            variant="contained"
          >
            Send Json
          </Button>
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
        <div>
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Key'}
            value={infoInputKey}
            onChange={(e) => setInfoInputKey(e.target.value)}
          />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Value'}
            value={infoInputValue}
            onChange={(e) => setInfoInputValue(e.target.value)}
          />
          <TextField
            variant="outlined"
            className={classes.formInput}
            id="input-name"
            label={'Description'}
            value={infoInputDescription}
            onChange={(e) => setInfoInputDescription(e.target.value)}
          />
        </div>
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            className={classes.button}
            onClick={sendInfo}
            variant="contained"
          >
            Send Info
          </Button>
          <Button
            className={classes.button}
            onClick={clearInfoSendInput}
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
        <CardContent className={classes.content}>
          <p>Receive JSON/String from HostApp</p>
        </CardContent>
        <CardContent className={classes.content}>
          <TextField
            type="text"
            className={classes.receiveInput}
            placeholder="Received JSON/String here"
            value={receiveJsonInfo}
            variant="outlined"
            color="primary"
            multiline="true"
          />
        </CardContent>
      </GreyCard>
    </div>
  );
};

export default UniversalBridge;
