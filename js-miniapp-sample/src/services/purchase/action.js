import MiniApp, { PurchasedProductResponse } from 'js-miniapp-sdk';

import {
  REQUEST_PRODUCT_PURCHASE_SUCCESS,
  REQUEST_PRODUCT_PURCHASE_FAILURE,
} from './types';

type PurchaseProductSuccessAction = {
  type: string,
  purchasedProduct: PurchasedProductResponse,
  productsList: Product[],
};

const getAllProductsAction = (): Function => {
  return (dispatch) => {
    return MiniApp.purchaseService
      .getAllProducts()
      .then((products) => {
        console.log('getAllProducts Success Action: ', products);
        dispatch({
          type: REQUEST_PRODUCT_PURCHASE_SUCCESS,
          productsList: products,
        });
        return Promise.resolve(products);
      })
      .catch((e) => {
        console.log('getAllProducts Error: ', e);
        dispatch({
          type: REQUEST_PRODUCT_PURCHASE_FAILURE,
        });
        throw e;
      });
  };
};

const purchaseProductAction = (itemId: string): Function => {
  return (dispatch) => {
    return MiniApp.purchaseService
      .purchaseItemWith(itemId)
      .then((purchasedProduct) => {
        console.log('PurchaseProductSuccessAction: ', purchasedProduct);
        dispatch({
          type: REQUEST_PRODUCT_PURCHASE_SUCCESS,
          purchasedProduct: purchasedProduct,
        });
        return Promise.resolve(purchasedProduct);
      })
      .catch((e) => {
        console.log('PurchaseProduct Error: ', e);
        dispatch({
          type: REQUEST_PRODUCT_PURCHASE_FAILURE,
        });
        throw e;
      });
  };
};

const consumeProductAction = (
  itemId: string,
  transactionId: String
): Function => {
  return (dispatch) => {
    return MiniApp.purchaseService
      .consumePurchaseWith(itemId, transactionId)
      .then((miniAppResponseInfo) => {
        console.log('consumeProductAction: ', miniAppResponseInfo);
        dispatch({
          type: REQUEST_PRODUCT_PURCHASE_SUCCESS,
        });
        return Promise.resolve(miniAppResponseInfo);
      })
      .catch((e) => {
        console.log('consumeProductAction Error: ', e);
        dispatch({
          type: REQUEST_PRODUCT_PURCHASE_FAILURE,
        });
        throw e;
      });
  };
};

export { getAllProductsAction, purchaseProductAction, consumeProductAction };
export type { PurchaseProductSuccessAction };
