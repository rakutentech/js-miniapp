import { MiniAppBridgeUtils, PlatformExecutor } from '../common-bridge';
import { parseMiniAppError } from '../types/error-types';
import { OneClickSdkICInfo } from '../types/one-click-sdk';

/**
 * Manages OneClick related operations.
 */
export class OneClickSdk {
  executor: PlatformExecutor;
  platform: string;

  /**
   * Creates an instance of OneClick.
   * @param {PlatformExecutor} executor - The executor to run platform-specific code.
   */
  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();
  }

  /**
   * Start IC Chip KYC
   * @param {OneClickSdkICInfo} info - IC Chip Info.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating the IC Chip status.
   */
  startICChipKyc(info: OneClickSdkICInfo) {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'startICChipKyc',
        info,
        response => resolve(MiniAppBridgeUtils.BooleanValue(response)),
        error => reject(parseMiniAppError(error))
      );
    });
  }
}
