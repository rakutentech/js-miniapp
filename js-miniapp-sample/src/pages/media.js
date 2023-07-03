// @flow
import React, { useState, useEffect } from 'react';

import ReactPlayerLoader from '@brightcove/react-player-loader';
import {
  Button,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';
import MiniApp, {
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from 'js-miniapp-sdk';
import { ScreenOrientation } from 'js-miniapp-sdk';

import GreyCard from '../components/GreyCard';
import { sendAnalytics } from './helper';

const useStyles = makeStyles((theme) => ({
  card: {
    height: 'auto',
    marginTop: '40px',
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
  actions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
}));

const onSuccess = function ({ ref: player }) {
  console.log(player);

  player.on('fullscreenchange', (event) => {
    if (player.isFullscreen()) {
      MiniApp.setScreenOrientation(ScreenOrientation.LOCK_LANDSCAPE)
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      MiniApp.setScreenOrientation(ScreenOrientation.LOCK_RELEASE)
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};

const Media = () => {
  const [showAutoplayVideo, setShowAutoplayVideo] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    sendAnalytics(
      MAAnalyticsEventType.appear,
      MAAnalyticsActionType.open,
      'Media',
      'Screen',
      'Page',
      ''
    );
  });

  return (
    <GreyCard className={classes.card}>
      <CardContent className={classes.content}>
        Autoplay Fullscreen Video
      </CardContent>
      <CardContent className={classes.content}>
        <ReactPlayerLoader
          accountId="1752604059001"
          videoId="5819230967001"
          onSuccess={onSuccess}
        ></ReactPlayerLoader>
      </CardContent>

      <CardContent className={classes.content}>Normal Video</CardContent>
      <CardActions className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAutoplayVideo(!showAutoplayVideo)}
        >
          {showAutoplayVideo ? 'Hide' : 'Show'} Video
        </Button>
      </CardActions>

      {showAutoplayVideo && (
        <CardContent className={classes.content}>
          <ReactPlayerLoader
            accountId="1752604059001"
            videoId="5819230967001"
            onSuccess={(success) => {
              onSuccess(success);
              success.ref.requestFullscreen();
            }}
            options={{ autoplay: true }}
          ></ReactPlayerLoader>
        </CardContent>
      )}
    </GreyCard>
  );
};

export default Media;
