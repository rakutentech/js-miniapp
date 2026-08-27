import React, { useState } from 'react';

import { Button, Typography, makeStyles } from '@material-ui/core';
import MiniApp from 'js-miniapp-sdk';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '2em',
  },
  status: {
    marginTop: '20px',
    wordBreak: 'break-all',
  },
  subscribeInfo: {
    marginTop: '10px',
    fontStyle: 'italic',
  },
}));

function NetworkStatusComponent() {
  const classes = useStyles();
  const [currentStatus, setCurrentStatus] = useState(null);
  const [currentError, setCurrentError] = useState(null);
  const [liveStatus, setLiveStatus] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleGetNetworkStatus = async () => {
    setCurrentStatus(null);
    setCurrentError(null);
    try {
      const status = await MiniApp.getNetworkStatus();
      setCurrentStatus(status);
    } catch (error) {
      setCurrentError(error.message || 'Failed to get network status');
    }
  };

  const handleSubscribe = () => {
    if (subscribed) return;
    MiniApp.onNetworkStatusChanged((status) => {
      setLiveStatus(status);
    });
    setSubscribed(true);
  };

  return (
    <div>
      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetNetworkStatus}
        >
          Get Network Status
        </Button>
        {(currentStatus || currentError) && (
          <Typography
            variant="body1"
            color={currentError ? 'error' : 'textSecondary'}
            className={classes.status}
          >
            {currentError ||
              `Type: ${currentStatus.networkType} | Connected: ${currentStatus.isConnected}`}
          </Typography>
        )}
      </div>

      <div className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubscribe}
          disabled={subscribed}
        >
          {subscribed
            ? 'Subscribed to Changes'
            : 'Subscribe to Network Changes'}
        </Button>
        {subscribed && (
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.subscribeInfo}
          >
            Listening for network status changes…
          </Typography>
        )}
        {liveStatus && (
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.status}
          >
            {`Latest update — Type: ${liveStatus.networkType} | Connected: ${liveStatus.isConnected}`}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default NetworkStatusComponent;
