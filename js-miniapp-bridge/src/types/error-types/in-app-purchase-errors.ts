import { MiniAppError, MiniAppJson } from './mini-app-error';

enum MiniAppInAppPurchaseErrorType {
  PurchaseFailedError = 'PurchaseFailedError',
  ConsumeFailedError = 'ConsumeFailedError',
  ProductNotFoundError = 'ProductNotFoundError',
  ProductPurchasedAlreadyError = 'ProductPurchasedAlreadyError',
  UserCancelledPurchaseError = 'UserCancelledPurchaseError',
}

export class PurchaseFailedError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, PurchaseFailedError.prototype);
    this.message = 'Product Purchase failed, please try again later';
  }
}

export class ConsumeFailedError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, ConsumeFailedError.prototype);
    this.message =
      'Unable to consume the product, please make sure the product is purchased already';
  }
}

export class ProductNotFoundError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, ProductNotFoundError.prototype);
    this.message =
      'Unable to find the ProductId. Please make sure that the productId is registered in Google Play';
  }
}

export class ProductPurchasedAlreadyError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, ProductPurchasedAlreadyError.prototype);
    this.message = 'This Product is purchased already';
  }
}

export class UserCancelledPurchaseError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, UserCancelledPurchaseError.prototype);
    this.message = 'User cancelled the purchase';
  }
}

export function parseInAppPurchaseError(json: MiniAppJson) {
  const errorType: MiniAppInAppPurchaseErrorType =
    MiniAppInAppPurchaseErrorType[
      json.type as keyof typeof MiniAppInAppPurchaseErrorType
    ];
  switch (errorType) {
    case MiniAppInAppPurchaseErrorType.PurchaseFailedError:
      return new PurchaseFailedError(json);
    case MiniAppInAppPurchaseErrorType.ConsumeFailedError:
      return new ConsumeFailedError(json);
    case MiniAppInAppPurchaseErrorType.ProductNotFoundError:
      return new ProductNotFoundError(json);
    case MiniAppInAppPurchaseErrorType.ProductPurchasedAlreadyError:
      return new ProductPurchasedAlreadyError(json);
    case MiniAppInAppPurchaseErrorType.UserCancelledPurchaseError:
      return new UserCancelledPurchaseError(json);
    default:
      return undefined;
  }
}
