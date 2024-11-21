import { MiniAppBridgeUtils, PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';

/**
 * Manages browser-related functionalities for the MiniApp.
 */
export class BrowserManager {
  executor: PlatformExecutor;
  platform: string;

  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();
  }

  /**
   * Launches the specified URL in an external browser.
   * @param {string} url - The URL to be opened in the external browser.
   * @returns {Promise<boolean>} - A promise that resolves to true if the URL was successfully opened, otherwise rejects with an error.
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
   * Launches the specified URL in an internal browser.
   * @param {string} url - The URL to be opened in the internal browser.
   * @returns {Promise<boolean>} - A promise that resolves to true if the URL was successfully opened, otherwise rejects with an error.
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
