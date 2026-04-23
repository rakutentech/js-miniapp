import React, { useState } from 'react';

import { Card, Grid, Button, makeStyles } from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
    width: '100%',
    overflowY: 'auto',
  },
  grid: {
    display: 'flex',
    height: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
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
}));

const RakutenSim = () => {
  const classes = useStyles();
  const [result, setResult] = useState('');

  async function checkRakutenSim() {
    try {
      const isInstalled = await MiniApp.isRakutenSimInstalled();
      setResult(isInstalled ? 'Rakuten SIM is installed' : 'Rakuten SIM is NOT installed');
    } catch (error) {
      setResult(error.message || 'Error occurred while checking Rakuten SIM');
    }
  }

  function clear() {
    setResult('');
  }

  return (
    <Card className={classes.root}>
      <Grid className={classes.grid} align="center">
        <h2>Rakuten SIM Check</h2>
        <div className={classes.contentSection}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => checkRakutenSim()}
          >
            Check Rakuten SIM
          </Button>
          <label className={classes.label}>{result}</label>
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

export default RakutenSim;
