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
  }
}

export class ConsumeFailedError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, ConsumeFailedError.prototype);
  }
}

export class ProductNotFoundError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, ProductNotFoundError.prototype);
  }
}

export class ProductPurchasedAlreadyError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, ProductPurchasedAlreadyError.prototype);
  }
}

export class UserCancelledPurchaseError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, UserCancelledPurchaseError.prototype);
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
