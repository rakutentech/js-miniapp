import React, { useState } from 'react';

import { Card, Grid, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
    width: '100%',
  },
  grid: {
    display: 'flex',
    height: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
  },
  table: {
    minWidth: '80%',
  },
  content: {
    height: '50%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
  },
  contentSection: {
    height: '30%',
    padding: '10px',
  },
  label: {
    display: 'block',
    fontSize: 12,
    width: '100%',
    color: theme.color.primary,
  },
  imageBox: {
    height: '250px',
    margin: '20px',
    display: 'none',
  },
  imageBoxContent: {
    height: '250px',
    objectFit: 'contain',
  },
}));

const Camera = () => {
  const classes = useStyles();

  const setFiles = (e) => {
    const files = e.target.files;
    if (!files && files.length > 0) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('imageBox').style.display = 'block';
      document
        .getElementById('imageBoxContent')
        .setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(files[0]);
  };

  function clear() {
    document.getElementById('imageBox').style.display = 'none';
    document.getElementById('imageBoxContent').setAttribute('src', '');
    document.getElementById('cameraBack').value = '';
    document.getElementById('cameraFront').value = '';
  }

  return (
    <Card className={classes.root}>
      <Card id="imageBox" className={classes.imageBox}>
        <img
          id="imageBoxContent"
          alt="CapturedPicture"
          className={classes.imageBoxContent}
        />
      </Card>
      <Grid className={classes.grid} align="center" justify="center">
        <div className={classes.contentSection}>
          <label className={classes.label}>Backside</label>
          <input
            id="cameraBack"
            type="file"
            accept=".jpg,.jpeg,.png,.svg,.gif"
            onChange={setFiles}
            data-testid="file-input-image-back"
            capture="environment"
          />
        </div>

        <div className={classes.contentSection}>
          <label className={classes.label}>Frontside</label>
          <input
            id="cameraFront"
            type="file"
            accept=".jpg,.jpeg,.png,.svg,.gif"
            onChange={setFiles}
            data-testid="file-input-image-front"
            capture="user"
          />
        </div>

        <div className={classes.contentSection}>
          <Button variant="contained" color="primary" onClick={() => clear()}>
            Clear
          </Button>
        </div>
      </Grid>
    </Card>
  );
};

export { Camera };
export default Camera;
