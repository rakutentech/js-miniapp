import { MiniAppBridgeUtils, PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';

export class MiniAppPreferences {
  executor: PlatformExecutor;
  platform: string;

  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();
  }

  /**
   * Sets the value of the specified default key.
   * @param {key} string
   * @param {value} string
   * @see {set}
   */
  set(key: string, value: string) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'setMiniAppPreference',
        { preferenceKey: key, preferenceValue: value },
        response => {
          resolve(response);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Returns the object associated with the specified key.
   * @param {key} string
   * @see {get}
   */
  get(key: string) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'getMiniAppPreference',
        { preferenceKey: key },
        response => {
          resolve(response);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Removes the value of the specified default key.
   * @param {key} string
   * @see {remove}
   */
  remove(key: string) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'removeMiniAppPreference',
        { preferenceKey: key },
        response => {
          resolve(response);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Removes all keys that is stored
   * @param {key} string
   * @see {clearMiniAppPreferences}
   */
  clearMiniAppPreferences() {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'clearMiniAppPreferences',
        null,
        response => {
          resolve(response);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }
}
