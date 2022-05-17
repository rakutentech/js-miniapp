import { useState } from 'react';

import MiniApp from 'js-miniapp-sdk';

const useGeoLocation = () => {
  const [state, setState] = useState({
    isWatching: false,
    isLoading: false,
  });
  const watch = () => {
    return MiniApp.requestLocationPermission(
      'We would like to display the location of your device.'
    )
      .then(() => {
        setState({
          isWatching: true,
          isLoading: true,
        });

        const timeout = setTimeout(() => {
          setState({
            isWatching: false,
            isLoading: false,
            error: 'Timeout',
          });
        }, 6000);

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            clearTimeout(timeout);

            const { longitude, latitude } = pos.coords;
            setState({
              isWatching: true,
              isLoading: false,
              location: {
                latitude,
                longitude,
              },
            });
          },
          (_error) => {
            clearTimeout(timeout);

            setState({
              isWatching: false,
              isLoading: false,
              error: 'Location Disabled',
            });
          },
          {
            enableHighAccuracy: true,
          }
        );
      })
      .catch((error) =>
        setState({
          isWatching: false,
          isLoading: false,
          error,
        })
      );
  };

  const unwatch = () => {
    setState({
      isWatching: false,
    });
  };

  return [state, watch, unwatch];
};

export default useGeoLocation;
