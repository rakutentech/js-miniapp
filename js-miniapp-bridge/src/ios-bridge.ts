/* tslint:disable:no-any */
import * as commonBridge from './common-bridge';

let uniqueId = Math.random();

commonBridge.MiniAppBridge.prototype.exec = (
  action,
  param,
  onSuccess,
  onError
) => {
  const callback = {} as commonBridge.Callback;
  callback.onSuccess = onSuccess;
  callback.onError = onError;
  callback.id = String(++uniqueId);
  commonBridge.mabMessageQueue.unshift(callback);

  (window as any).webkit.messageHandlers.MiniAppiOS.postMessage(
    JSON.stringify({ action, param, id: callback.id })
  );
};

(window as any).MiniAppBridge = commonBridge.MiniAppBridge.prototype;

navigator.geolocation.getCurrentPosition = (success, error, options) => {
  return commonBridge.MiniAppBridge.prototype.exec(
    'getCurrentPosition',
    { locationOptions: options },
    value => {
      const parsedData = JSON.parse(value);
      success(parsedData);
    },
    error => console.error(error)
  );
};
