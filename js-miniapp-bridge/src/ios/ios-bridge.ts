import {
  PlatformExecutor,
  MiniAppBridge,
  Callback,
  mabMessageQueue,
} from '../common-bridge';

/* tslint:disable:no-any */
let uniqueId = Math.random();

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

(window as any).MiniAppBridge = new MiniAppBridge(new IOSExcecutor());

navigator.geolocation.getCurrentPosition = (success, error, options) => {
  return (window as any).MiniAppBridge.exec(
    'getCurrentPosition',
    { locationOptions: options },
    value => {
      const parsedData = JSON.parse(value);
      success(parsedData);
    },
    error => console.error(error)
  );
};
