import React, { useState } from 'react';

import {
  Button,
  CardContent,
  CardActions,
  makeStyles,
  Snackbar,
} from '@material-ui/core';
import { connect } from 'react-redux';

import GreyCard from '../components/GreyCard';
import { setMessageUniqueId, setMauid } from '../services/uuid/actions';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: '250px',
  },
  content: {
    height: '16%',
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
  messageUniqueId: string,
  mauid: string,
  messageUniqueIdError: string,
  mauidError: string,
  getMessageUniqueId: Function,
  getMauid: Function,
};

const UuidFetcher = (props: UUIDProps) => {
  const classes = useStyles();
  const [copyStatus, setCopyStatus] = useState({
    success: false,
    error: false,
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
        {props.messageUniqueId ?? props.messageUniqueIdError ?? 'Not Available'}
      </CardContent>

      <CardActions className={classes.actions}>
        <Button
          data-testid="get-message-unique-id"
          variant="contained"
          color="primary"
          fullWidth
          onClick={props.getMessageUniqueId}
        >
          GET MESSAGE UNIQUE ID
        </Button>
        <CopyToClipboard
          disabled={!props.messageUniqueId}
          text={props.messageUniqueId}
          onCopy={textCopied}
        >
          <Button
            disabled={!props.messageUniqueId}
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
    messageUniqueId: state.uuid.messageUniqueId,
    messageUniqueIdError: state.uuid.messageUniqueIdError,
    mauid: state.uuid.mauid,
    mauidError: state.uuid.mauidError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessageUniqueId: () => dispatch(setMessageUniqueId()),
    getMauid: () => dispatch(setMauid()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UuidFetcher);
