import type { PurchaseProductSuccessAction } from './actions';

import { REQUEST_PRODUCT_PURCHASE_SUCCESS } from './types';

const defaultPurchaseProduct = null;
const PurchaseProductReducer = (
  state: ?string = defaultPurchaseProduct,
  action: PurchaseProductSuccessAction
): ?string => {
  switch (action.type) {
    case REQUEST_PRODUCT_PURCHASE_SUCCESS:
      return action.purchasedProduct;
    default:
      return state;
  }
};

export { PurchaseProductReducer };
