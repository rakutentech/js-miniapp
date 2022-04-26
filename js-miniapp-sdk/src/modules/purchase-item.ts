import { PurchasedProduct } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../utils';

interface PurchaseItemProvider {
  purchaseItemWith(id: string): Promise<PurchasedProduct>;
}

/** @internal */
export class PurchaseItemService {
  purchaseItemWith(id: string): Promise<PurchasedProduct> {
    return getBridge().purchaseItemWith(id);
  }
}
