import React, { useState, useEffect } from 'react';

import {
  Button,
  CardContent,
  CardActions,
  makeStyles,
  Snackbar,
} from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import { sendAnalytics } from './helper';
import { MAAnalyticsActionType, MAAnalyticsEventType } from 'js-miniapp-sdk';

import GreyCard from '../components/GreyCard';
import {
  setMessagingUniqueId,
  setMauid,
  setUniqueId,
} from '../services/uuid/actions';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: 'auto',
    marginTop: '40px',
    display: 'grid',
  },
  content: {
    height: 'auto',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
    wordBreak: 'break-word',
  },
  actions: {
    justifyContent: 'center',
  },
  uuidNotFound: {
    width: 200,
  },
}));

type UUIDProps = {
  uniqueId: string,
  messagingUniqueId: string,
  mauid: string,
  uniqueIdError: string,
  messagingUniqueIdError: string,
  mauidError: string,
  getUniqueId: Function,
  getMessagingUniqueId: Function,
  getMauid: Function,
};

const UuidFetcher = (props: UUIDProps) => {
  const classes = useStyles();
  const [copyStatus, setCopyStatus] = useState({
    success: false,
    error: false,
  });

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Unique ID',
      'Screen',
      'Page',
      ''
    );
  });
  function textCopied(text, result) {
    if (result) {
      setCopyStatus({ success: true, error: false });
    } else {
      setCopyStatus({ success: false, error: true });
    }
  }

  return (
    <GreyCard className={classes.card}>
      <CardContent className={classes.content}>
        {props.uniqueId ?? props.uniqueIdError ?? 'Not Available'}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          data-testid="get-unique-id"
          variant="contained"
          color="primary"
          fullWidth
          onClick={props.getUniqueId}
        >
          GET UNIQUE ID
        </Button>
        <CopyToClipboard
          disabled={!props.uniqueId}
          text={props.uniqueId}
          onCopy={textCopied}
        >
          <Button
            disabled={!props.uniqueId}
            data-testid="clipboard-copy"
            variant="contained"
            color="primary"
          >
            Copy
          </Button>
        </CopyToClipboard>
        <Snackbar
          open={copyStatus.success}
          autoHideDuration={3000}
          onClose={() => {
            setCopyStatus({ success: false, error: false });
          }}
          message="Copied to clipboard !!"
        />
        <Snackbar
          open={copyStatus.error}
          autoHideDuration={3000}
          onClose={() => {
            setCopyStatus({ success: false, error: false });
          }}
          message="Failed to copy!"
        />
      </CardActions>
      <CardContent className={classes.content}>
        {props.messagingUniqueId ??
          props.messagingUniqueIdError ??
          'Not Available'}
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          data-testid="get-messaging-unique-id"
          variant="contained"
          color="primary"
          fullWidth
          onClick={props.getMessagingUniqueId}
        >
          GET MESSAGING UNIQUE ID
        </Button>
        <CopyToClipboard
          disabled={!props.messagingUniqueId}
          text={props.messagingUniqueId}
          onCopy={textCopied}
        >
          <Button
            disabled={!props.messagingUniqueId}
            data-testid="clipboard-copy"
            variant="contained"
            color="primary"
          >
            Copy
          </Button>
        </CopyToClipboard>
        <Snackbar
          open={copyStatus.success}
          autoHideDuration={3000}
          onClose={() => {
            setCopyStatus({ success: false, error: false });
          }}
          message="Copied to clipboard !!"
        />
        <Snackbar
          open={copyStatus.error}
          autoHideDuration={3000}
          onClose={() => {
            setCopyStatus({ success: false, error: false });
          }}
          message="Failed to copy!"
        />
      </CardActions>

      <CardContent className={classes.content}>
        {props.mauid ?? props.mauidError ?? 'Not Available'}
      </CardContent>

      <CardActions className={classes.actions}>
        <Button
          data-testid="get-mauid"
          variant="contained"
          color="primary"
          fullWidth
          onClick={props.getMauid}
        >
          GET MAUID
        </Button>
        <CopyToClipboard
          disabled={!props.mauid}
          text={props.mauid}
          onCopy={textCopied}
        >
          <Button
            disabled={!props.mauid}
            data-testid="clipboard-copy"
            variant="contained"
            color="primary"
          >
            Copy
          </Button>
        </CopyToClipboard>
      </CardActions>
    </GreyCard>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...props,
    uniqueId: state.uuid.uniqueId,
    uniqueIdError: state.uuid.uniqueIdError,
    messagingUniqueId: state.uuid.messagingUniqueId,
    messagingUniqueIdError: state.uuid.messagingUniqueIdError,
    mauid: state.uuid.mauid,
    mauidError: state.uuid.mauidError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUniqueId: () => dispatch(setUniqueId()),
    getMessagingUniqueId: () => dispatch(setMessagingUniqueId()),
    getMauid: () => dispatch(setMauid()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UuidFetcher);
