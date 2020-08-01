import * as commonBridge from '../common-bridge';

/* tslint:disable:no-any */
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

  (window as any).MiniAppAndroid.postMessage(
    JSON.stringify({ action, param, id: callback.id })
  );
};

(window as any).MiniAppBridge = commonBridge.MiniAppBridge.prototype;
