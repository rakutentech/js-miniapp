import React, { useState } from 'react';
import { MiniApp, HostAppEvents } from 'js-miniapp-sdk';

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
  textfield: {
    width: '90%',
    maxWidth: 300,
    marginTop: 10,
    marginBottom: 10,
    background: 'white',
    '& input': {
      color: theme.color.primary,
      lineHeight: '1.5em',
      fontSize: '1.2em',
    },
  },
}));

const UniversalBridge = () => {
  const classes = useStyles();
  const defaultJsonValue = '{"data":"This is a sample json information"}';
  let inputValue = defaultJsonValue;
  let [receiveJsonInfo, setReceiveJsonInfo] = useState('');

  const handleInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    inputValue = e.currentTarget.value;
  };

  const sendJson = () => {
    const info = { content: inputValue };
    MiniApp.universalBridge
      .sendJsonToHostapp(info)
      .then((success) => {
        console.log(success);
      })
      .catch((miniAppError) => {
        console.error('Send Json Error: ', miniAppError);
      });
  };

  const receiveJson = () => {
    window.addEventListener(HostAppEvents.RECEIVE_JSON_INFO, function (e) {
      let message = e.detail.message;
      console.log(message);
      receiveJsonInfo = message;
      setReceiveJsonInfo(message);
    });
  };

  return (
    <div className={classes.scrollable}>
      <GreyCard className={classes.card}>
        <CardContent className={classes.content}>
          <p>Send Json to HostApp</p>
        </CardContent>
        <CardContent className={classes.content}>
          <TextField
            type="text"
            className={classes.textfield}
            onChange={handleInput}
            placeholder="Content"
            defaultValue={defaultJsonValue}
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
            Send Json to HostApp
          </Button>
        </CardActions>
        <hr />
        <CardContent className={classes.content}>
          <p>Received Json from HostApp</p>
        </CardContent>
        <CardContent className={classes.content}>
          <TextField
            type="text"
            className={classes.textfield}
            onChange={handleInput}
            placeholder="Received Json info here..."
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
