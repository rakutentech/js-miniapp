import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  errorTypography: {
    color: theme.color.error,
  },
}));

const Dialogue = (props) => {
  const classes = useStyles();
  const { open, onCloseHandler, onConfirmHandler, contentText, errorText } =
    props;

  return (
    <Dialog open={open} onClose={onCloseHandler} className={classes.dialogue}>
      <DialogContent>
        <Typography>{contentText || 'Placeholder Dialogue'}</Typography>
        {errorText && (
          <Typography className={classes.errorTypography}>
            {errorText}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirmHandler}>Confirm</Button>
        <Button onClick={onCloseHandler}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

Dialogue.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirmHandler: PropTypes.func.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
  contentText: PropTypes.string,
  errorText: PropTypes.string,
};

export default Dialogue;
