import { MiniAppError, MiniAppJson } from './mini-app-error';

enum MiniAppStorageErrorType {
  SecureStorageFullError = 'SecureStorageFullError',
  SecureStorageBusyError = 'SecureStorageBusyError',
  SecureStorageUnavailableError = 'SecureStorageUnavailableError',
  SecureStorageIOError = 'SecureStorageIOError',
}

export class SecureStorageFullError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, SecureStorageFullError.prototype);
    this.message = 'Storage limit is exceeded or full already';
  }
}

export class SecureStorageBusyError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, SecureStorageBusyError.prototype);
    this.message = 'Storage is busy, please try again';
  }
}

export class SecureStorageUnavailableError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, SecureStorageUnavailableError.prototype);
    this.message = 'Storage is not yet loaded or failed to load';
  }
}

export class SecureStorageIOError extends MiniAppError {
  constructor(public errorInput: MiniAppJson) {
    super(errorInput);
    Object.setPrototypeOf(this, SecureStorageIOError.prototype);
    this.message = 'Unable to read/write changes in Storage.';
  }
}

export function parseStorageError(json: MiniAppJson) {
  const errorType: MiniAppStorageErrorType =
    MiniAppStorageErrorType[json.type as keyof typeof MiniAppStorageErrorType];
  switch (errorType) {
    case MiniAppStorageErrorType.SecureStorageFullError:
      return new SecureStorageFullError(json);
    case MiniAppStorageErrorType.SecureStorageBusyError:
      return new SecureStorageBusyError(json);
    case MiniAppStorageErrorType.SecureStorageUnavailableError:
      return new SecureStorageUnavailableError(json);
    case MiniAppStorageErrorType.SecureStorageIOError:
      return new SecureStorageIOError(json);
    default:
      return undefined;
  }
}
