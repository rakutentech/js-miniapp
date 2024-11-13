import { MiniAppBridgeUtils, PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';

export class BrowserManager {
  executor: PlatformExecutor;
  platform: string;

  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();
  }

  /**
   * Launches the URL in External browser.
   * @param {url} string
   * @see {launchExternalBrowser}
   */
  launchExternalBrowser(url: string) {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'launchExternalBrowser',
        { url },
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Launches the URL in Internal browser.
   * @param {url} string
   * @see {launchInternalBrowser}
   */
  launchInternalBrowser(url: string) {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'launchInternalBrowser',
        { url },
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }
}
