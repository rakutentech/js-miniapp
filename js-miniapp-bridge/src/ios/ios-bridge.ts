import {
  PlatformExecutor,
  MiniAppBridge,
  Callback,
  mabMessageQueue,
} from '../common-bridge';

/* tslint:disable:no-any */
let uniqueId = Math.random();

// tslint:disable-next-line: variable-name
const GeolocationPositionError = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
};

class IOSExcecutor implements PlatformExecutor {
  exec(action, param, onSuccess, onError) {
    const callback = {} as Callback;
    callback.onSuccess = onSuccess;
    callback.onError = onError;
    callback.id = String(++uniqueId);
    mabMessageQueue.unshift(callback);

    (window as any).webkit.messageHandlers.MiniAppiOS.postMessage(
      JSON.stringify({ action, param, id: callback.id })
    );
  }
}

const iOSExcecutor = new IOSExcecutor();
(window as any).MiniAppBridge = new MiniAppBridge(iOSExcecutor);

navigator.geolocation.getCurrentPosition = (success, error, options) => {
  return iOSExcecutor.exec(
    'getCurrentPosition',
    { locationOptions: options },
    value => {
      try {
        const parsedData = JSON.parse(value);
        success(parsedData);
      } catch (error) {
        error({
          code: GeolocationPositionError.POSITION_UNAVAILABLE,
          message:
            'Failed to parse location object from MiniAppBridge: ' + error,
        });
      }
    },
    error => console.error(error)
  );
};
