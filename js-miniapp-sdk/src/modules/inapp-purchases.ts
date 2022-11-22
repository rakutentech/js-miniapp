import { Product, PurchasedProduct } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../utils';

interface PurchaseProvider {
  /**
   * Triggers the request to host app to Purchase a product using the Product ID.
   * @param id The product id which must be purchased from inapp-purchase.
   * This will return the status of inapp-purchase and the details of the purchased product.
   */
  purchase(id: string): Promise<PurchasedProduct>;

  /**
   * Retrieves and lists all the products from the play/app store which are available for inapp-purchases.
   */
  getProducts(): Promise<Product[]>;

  /**
   * Retrieves the list of all the products purchased.
   * This will return list with all the product details and the inapp-purchase transaction details.
   * @param ids The array of purchased products ids.
   */
  purchasedProducts(ids: string[]): Promise<PurchasedProduct[]>;
}

/** @internal */
export class Purchases {
  getProducts(): Promise<Product[]> {
    return getBridge().getProducts();
  }

  purchase(id: string): Promise<PurchasedProduct> {
    return getBridge().purchase(id);
  }

  purchasedProducts(ids: string[]): Promise<PurchasedProduct[]> {
    return getBridge().purchasedProducts(ids);
  }
}
