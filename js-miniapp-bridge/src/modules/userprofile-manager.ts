import { MiniAppBridgeUtils, PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';

/**
 * Manages user profile related operations.
 */
export class UserProfileManager {
  executor: PlatformExecutor;
  platform: string;

  /**
   * Creates an instance of UserProfileManager.
   * @param {PlatformExecutor} executor - The executor to run platform-specific code.
   */
  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();
  }

  /**
   * Checks if the user is logged in.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the login status.
   * @see {isLoggedIn}
   */
  isLoggedIn() {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'isLoggedIn',
        null,
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }
}
