import {
  PlatformExecutor,
  MiniAppBridge,
  Callback,
  mabMessageQueue,
  cryptoRandom,
} from '../common-bridge'; // Adjust the import path as needed
import { Platform } from '../types/platform'; // Adjust the import path as needed

/* tslint:disable:no-any */
let uniqueId = cryptoRandom();

class ElectronExecutor implements PlatformExecutor {
  execEvents(event: Event): void {
    (window as any).dispatchEvent(event);
  }

  exec(
    action: string,
    param: any,
    onSuccess: (value: string) => void,
    onError: (error: string) => void
  ): void {
    const callback = {} as Callback;
    callback.onSuccess = onSuccess;
    callback.onError = onError;
    callback.id = String(++uniqueId);
    mabMessageQueue.unshift(callback);

    (window as any).MiniAppElectron[action]({ param, id: callback.id })
      .then(response => {
        return callback.onSuccess(response);
      })
      .catch(error => {
        return callback.onError(error);
      });
  }

  getPlatform(): string {
    return Platform.ELECTRON;
  }
}

(window as any).MiniAppBridge = new MiniAppBridge(new ElectronExecutor());
