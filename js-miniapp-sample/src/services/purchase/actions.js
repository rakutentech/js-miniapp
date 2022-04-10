import MiniApp, { PurchasedProduct } from 'js-miniapp-sdk';

import {
  REQUEST_PRODUCT_PURCHASE_SUCCESS,
  REQUEST_PRODUCT_PURCHASE_FAILURE,
} from './types';

type PurchaseProductSuccessAction = {
  type: string,
  purchasedProduct: PurchasedProduct,
};

const purchaseProduct = (itemId: string): Function => {
  return (dispatch) => {
    return MiniApp.purchaseService
      .purchaseItemWith(itemId)
      .then((purchasedProduct) => {
        console.log('PurchaseProductSuccessAction: ', purchasedProduct);
        dispatch({
          type: REQUEST_PRODUCT_PURCHASE_SUCCESS,
          purchasedProduct: purchasedProduct.product,
        });
        return Promise.resolve(purchasedProduct);
      })
      .catch((e) => {
        console.log('PurchaseProductSuccessAction Error: ', e);
        dispatch({
          type: REQUEST_PRODUCT_PURCHASE_FAILURE,
        });
        throw e;
      });
  };
};

export { purchaseProduct };
export type { PurchaseProductSuccessAction };
