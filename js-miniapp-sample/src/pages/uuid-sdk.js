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
import { setContactId, setMauid, setUniqueId } from '../services/uuid/actions';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: '500px',
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
  uniqueId: string,
  contactId: string,
  mauid: string,
  uniqueIdError: string,
  contactIdError: string,
  mauidError: string,
  getUniqueId: Function,
  getContactId: Function,
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
        {props.contactId ?? props.contactIdError ?? 'Not Available'}
      </CardContent>

      <CardActions className={classes.actions}>
        <Button
          data-testid="get-contact-id"
          variant="contained"
          color="primary"
          fullWidth
          onClick={props.getContactId}
        >
          GET CONTACT ID
        </Button>
        <CopyToClipboard
          disabled={!props.contactId}
          text={props.contactId}
          onCopy={textCopied}
        >
          <Button
            disabled={!props.contactId}
            data-testid="clipboard-copy"
            variant="contained"
            color="primary"
          >
            Copy
          </Button>
        </CopyToClipboard>
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
  console.log(state);
  return {
    ...props,
    uniqueId: state.uuid.uniqueId,
    contactId: state.uuid.contactId,
    mauid: state.uuid.mauid,
    uniqueIdError: state.uuid.uniqueIdError,
    contactIdError: state.uuid.contactIdError,
    mauidError: state.uuid.mauidError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUniqueId: () => dispatch(setUniqueId()),
    getContactId: () => dispatch(setContactId()),
    getMauid: () => dispatch(setMauid()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UuidFetcher);
