import { OneClickSdkInfo } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../sdkbridge';

interface OneClickSdkProvider {
  /**
   * Request on native mobile device to start IC Chip KYC flow
   */
  startICChipKyc(info: OneClickSdkInfo): Promise<boolean>;
}

/** @internal */
export class OneClickSdk implements OneClickSdkProvider {
  startICChipKyc(info: OneClickSdkInfo): Promise<boolean> {
    return getBridge().oneClickSdk.startICChipKyc(info);
  }
}
