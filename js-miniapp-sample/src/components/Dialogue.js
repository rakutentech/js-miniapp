import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  Typography,
} from '@material-ui/core';

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
        <Typography>{contentText}</Typography>
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

export default Dialogue;
