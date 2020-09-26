// @flow
import React from 'react';
import ReactPlayerLoader from '@brightcove/react-player-loader';

const onSuccess = function (success) {
  console.log(success.ref);

  success.ref.on("fullscreenchange", event => {
      if (success.ref.isFullscreen())
        console.log('fullscreen enter');
      else
        console.log('fullscreen exit');
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
