import { MiniAppBridgeUtils, PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';
import { LogType } from '../types/log-type';
import { PermissionName } from '../types/permissions';

export class UtilityManager {
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

  /**
   * Request permission status from host
   * @param permission name - consists of 'camera', 'microphone' and 'gallery'
   * @returns permission status of 'granted', 'denied' or 'unknown'
   */
  getPermissionStatus(permissionName: PermissionName) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'getPermissionStatus',
        { permissionName },
        response => resolve(response),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Trigger launchAppSettings from host
   * @returns true or false whether launch app settings is launched or not
   */
  launchAppSettings() {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'launchAppSettings',
        null,
        response => resolve(MiniAppBridgeUtils.BooleanValue(response)),
        error => reject(parseMiniAppError(error))
      );
    });
  }
}
