import { MiniAppError, MiniAppJson } from './mini-app-error';

enum MiniAppStorageErrorType {
  SecureStorageFullError = 'SecureStorageFullError',
  IOError = 'IOError',
  StorageUnavailable = 'StorageUnavailable',
  UnavailableItem = 'UnavailableItem',
  EmptyStorage = 'EmptyStorage',
  FailedDeleteError = 'FailedDeleteError',
  StorageOccupiedError = 'StorageOccupiedError',
}

export class SecureStorageFullError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, SecureStorageFullError.prototype);
  }
}

export class IOError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, IOError.prototype);
  }
}

export class StorageUnavailable extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, StorageUnavailable.prototype);
  }
}

export class UnavailableItem extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, UnavailableItem.prototype);
  }
}
export class EmptyStorage extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, EmptyStorage.prototype);
  }
}
export class FailedDeleteError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, FailedDeleteError.prototype);
  }
}
export class StorageOccupiedError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, StorageOccupiedError.prototype);
  }
}
export function parseAuthError(json: MiniAppJson) {
  const errorType: MiniAppStorageErrorType =
    MiniAppStorageErrorType[json.type as keyof typeof MiniAppStorageErrorType];
  switch (errorType) {
    case MiniAppStorageErrorType.SecureStorageFullError:
      return new SecureStorageFullError(json);
    case MiniAppStorageErrorType.IOError:
      return new IOError(json);
    case MiniAppStorageErrorType.StorageUnavailable:
      return new StorageUnavailable(json);
    case MiniAppStorageErrorType.UnavailableItem:
      return new UnavailableItem(json);
    case MiniAppStorageErrorType.EmptyStorage:
      return new EmptyStorage(json);
    case MiniAppStorageErrorType.FailedDeleteError:
      return new FailedDeleteError(json);
    case MiniAppStorageErrorType.StorageOccupiedError:
      return new StorageOccupiedError(json);
    default:
      return undefined;
  }
}
