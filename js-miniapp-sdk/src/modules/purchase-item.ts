import { PurchasedProductResponse } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../utils';

interface PurchaseItemProvider {
  purchaseItemWith(id: string): Promise<PurchasedProductResponse>;
}

/** @internal */
export class PurchaseItemService {
  purchaseItemWith(id: string): Promise<PurchasedProductResponse> {
    return getBridge().purchaseItemWith(id);
  }
}
