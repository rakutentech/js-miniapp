import { MiniAppBridgeUtils, PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';

/**
 * Manages the configuration of the WebView.
 */
export class WebViewConfigManager {
  executor: PlatformExecutor;
  platform: string;

  /**
   * Creates an instance of WebViewConfigManager.
   * @param executor - The platform executor.
   */
  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();
  }

  /**
   * Allows or disallows back and forward navigation gestures.
   * @param shouldAllow - A boolean indicating whether to allow the gestures.
   * @returns A promise that resolves to a boolean indicating the success of the operation.
   */
  allowBackForwardNavigationGestures(shouldAllow: boolean) {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'allowBackForwardNavigationGestures',
        { shouldAllowNavigationGestures: shouldAllow },
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }
}
