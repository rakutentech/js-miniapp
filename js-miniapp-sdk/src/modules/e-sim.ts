import { EsimConfig } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../sdkbridge';

interface EsimProvider {
  /**
   * Checks if esim is supported on native mobile device
   */
  isEsimSupported(): Promise<boolean>;

  /**
   * Sends information of esim configuration as EsimConfig object
   * Replies with boolean if esim was configured successfully or not
   */
  setupAndInstallEsim(config: EsimConfig): Promise<boolean>;
}

/** @internal */
export class Esim implements EsimProvider {
  isEsimSupported(): Promise<boolean> {
    return getBridge().isEsimSupported();
  }

  setupAndInstallEsim(config: EsimConfig): Promise<boolean> {
    return getBridge().setupAndInstallEsim(config);
  }
}
