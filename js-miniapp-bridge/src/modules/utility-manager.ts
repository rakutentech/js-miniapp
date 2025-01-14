import { MiniAppBridgeUtils, PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';
import { LogType } from '../types/log-type';

export class UtitlityManager {
  executor: PlatformExecutor;
  platform: string;

  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();
  }

  /**
   * Sends logs to the platform.
   * @param {string} message - The log message to be sent.
   * @param {LogType} [type=LogType.DEBUG] - The type of the log (debug, info, error). Defaults to 'debug'.
   * @returns {Promise<boolean>} - A promise that resolves to true if the log was successfully sent, otherwise rejects with an error.
   */
  logEvent(message: string, type: LogType = LogType.DEBUG) {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'logEvent',
        { logMessage: message, logType: type },
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }
}
