// @flow
import React from 'react';
import ReactPlayerLoader from '@brightcove/react-player-loader';
import MiniApp from 'js-miniapp-sdk';
import ScreenAction from 'js-miniapp-sdk';

const onSuccess = function (success) {
  console.log(success.ref);
  const landscapeLock = { action: ScreenAction.LOCK_LANDSCAPE };
  const releaseLock = { action: ScreenAction.LOCK_RELEASE };

  success.ref.on("fullscreenchange", event => {
      if (success.ref.isFullscreen()) {
        console.log('fullscreen enter');
        MiniApp.requestScreenOrientation(landscapeLock)
          .then((success) => {
            console.log(success);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log('fullscreen exit');
        MiniApp.requestScreenOrientation(landscapeLock)
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
  return (
    <ReactPlayerLoader
      accountId="1752604059001"
      videoId="5819230967001"
      onSuccess={onSuccess}
    ></ReactPlayerLoader>
  );
};

export default Media;
