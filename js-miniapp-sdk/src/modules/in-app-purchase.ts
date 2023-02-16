import { Product, PurchasedProduct } from '../../../js-miniapp-bridge/src';
import { MiniAppResponseInfo } from '../../../js-miniapp-bridge/src/types/response-types/miniapp';
import { getBridge } from '../sdkbridge';

interface PurchaseProvider {
  /**
   * Retrieves and lists all the products from the play/app store which are available for inapp-purchases.
   */
  getAllProducts(): Promise<Product[]>;

  /**
   * Triggers the request to host app to Purchase a product using the Product ID.
   * @param id The product id which must be purchased from inapp-purchase.
   * This will return the status of inapp-purchase and the details of the purchased product.
   */
  purchaseProductWith(id: string): Promise<PurchasedProduct>;

  /**
   * Triggers the request to host app to Purchase a product using the Product ID.
   * @param id The product id which must be purchased from inapp-purchase.
   * This will return the status of inapp-purchase and the details of the purchased product.
   */
  consumePurchaseWith(
    id: string,
    transactionId: string
  ): Promise<PurchasedProduct>;
}

/** @internal */
export class Purchases {
  getAllProducts(): Promise<Product[]> {
    return getBridge().getAllProducts();
  }

  purchaseProductWith(id: string): Promise<PurchasedProduct> {
    return getBridge().purchaseProductWith(id);
  }

  consumePurchaseWith(
    id: string,
    transactionId: string
  ): Promise<MiniAppResponseInfo> {
    return getBridge().consumePurchaseWith(id, transactionId);
  }
}
