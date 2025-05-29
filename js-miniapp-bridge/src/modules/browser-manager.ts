import { MiniAppBridgeUtils, PlatformExecutor } from '../common-bridge';
import { LaunchBrowserOptions } from '../types/browser-options';
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
   * You can pass either a string URL or a LaunchBrowserOptions object to specify
   * HTTP method, body, audience, and scopes.
   * @param {string | LaunchBrowserOptions} urlOrParams - The URL string or LaunchBrowserOptions object.
   * @returns {Promise<boolean>} - A promise that resolves to true if the URL was successfully opened, otherwise rejects with an error.
   * @see {launchInternalBrowser}
   */
  launchInternalBrowser(
    urlOrParams: string | LaunchBrowserOptions
  ): Promise<boolean> {
    const params =
      typeof urlOrParams === 'string' ? { url: urlOrParams } : urlOrParams;
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'launchInternalBrowser',
        params,
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }
}
