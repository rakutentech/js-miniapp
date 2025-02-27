import { EsimConfig } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../sdkbridge';

interface EsimProvider {
  /**
   * Retrieves and lists all the products from the play/app store which are available for inapp-purchases.
   */
  isEsimSupported(): Promise<boolean>;

  /**
   * Triggers the request to host app to Purchase a product using the Product ID.
   * @param id The product id which must be purchased from inapp-purchase.
   * This will return the status of inapp-purchase and the details of the purchased product.
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
