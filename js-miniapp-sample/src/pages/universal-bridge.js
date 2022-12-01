import React, { useState } from 'react';
import MiniApp from 'js-miniapp-sdk';
import { HostAppEvents } from 'js-miniapp-sdk';

import {
  Button,
  TextField,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';

import GreyCard from '../components/GreyCard';

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
}));

const UniversalBridge = () => {
  const classes = useStyles();
  const defaultJsonValue = '{"data":"This is a sample json information"}';
  let [inputValue, setInputValue] = useState(defaultJsonValue);
  let [receiveJsonInfo, setReceiveJsonInfo] = useState('');

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

  const sendJson = () => {
    const info = { content: inputValue };
    MiniApp.universalBridge
      .sendJsonToHostapp(info)
      .then((success) => {
        console.log(success);
        window.alert(success);
      })
      .catch((miniAppError) => {
        console.error(miniAppError);
        window.alert(miniAppError);
      });
  };

  return (
    <div className={classes.scrollable}>
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>
          <p>Send JSON/String to HostApp</p>
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
