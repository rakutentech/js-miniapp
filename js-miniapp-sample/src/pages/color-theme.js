import React, { useEffect } from 'react';

import { makeStyles, Chip } from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';

const useStyles = makeStyles((theme) => ({
  content: {
    height: '25%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 18,
    color: theme.color.primary,
    fontWeight: 'bold',
  },
  card: {
    marginTop: '40px',
  },
  actions: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  button: {
    marginTop: '20px',
    width: '80%',
    maxWidth: 280,
  },
  textfield: {
    width: '80%',
    maxWidth: 300,
    '& input': {
      color: theme.color.primary,
      lineHeight: '1.5em',
      fontSize: '1.2em',
      background: 'white',
    },
  },
}));

function ColorThemeComponent() {
  const classes = useStyles();

  useEffect(() => {
    try {
      getColorTheme();
    } catch (e) {
      console.log(e);
    }
  });

  function getColorTheme() {
    MiniApp.miniappUtils
      .getHostAppThemeColors()
      .then((response) => {
        document.getElementById('primaryChip').style.backgroundColor =
          response.primaryColor;
        document.getElementById('secondaryChip').style.backgroundColor =
          response.secondaryColor;
        console.log('getColorTheme SUCCESS: ', response);
      })
      .catch((error) => {
        console.log('getColorTheme ERROR: ', error);
      });
  }

  return (
    <div className={classes.card}>
      <Chip label="primary" id="primaryChip" />
      <br />
      <br />
      <Chip label="secondary" id="secondaryChip" />
    </div>
  );
}

export default ColorThemeComponent;
