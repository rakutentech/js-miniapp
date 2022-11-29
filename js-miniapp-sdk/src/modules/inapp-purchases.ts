import { Product, PurchasedProduct } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../utils';

interface PurchaseProvider {
  /**
   * Triggers the request to host app to Purchase a product using the Product ID.
   * @param id The product id which must be purchased from inapp-purchase.
   * This will return the status of inapp-purchase and the details of the purchased product.
   */
  purchaseProductWith(id: string): Promise<PurchasedProduct>;

  /**
   * Retrieves and lists all the products from the play/app store which are available for inapp-purchases.
   */
  prepareProductsList(): Promise<Product[]>;
}

/** @internal */
export class Purchases {
  prepareProductsList(): Promise<Product[]> {
    return getBridge().prepareProductsList();
  }

  purchaseProductWith(id: string): Promise<PurchasedProduct> {
    return getBridge().purchaseProductWith(id);
  }
}
