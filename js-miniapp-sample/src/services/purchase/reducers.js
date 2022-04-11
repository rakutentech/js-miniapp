import type { PurchaseProductSuccessAction } from './actions';

import { REQUEST_PRODUCT_PURCHASE_SUCCESS } from './types';

const defaultPurchaseProduct = null;
const PurchaseProductReducer = (
  action: PurchaseProductSuccessAction,
  state: ?string = defaultPurchaseProduct
): ?string => {
  switch (action.type) {
    case REQUEST_PRODUCT_PURCHASE_SUCCESS:
      return action.purchasedProduct;
    default:
      return state;
  }
};

export { PurchaseProductReducer };
