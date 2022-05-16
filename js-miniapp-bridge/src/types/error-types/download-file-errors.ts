import { MiniAppError, MiniAppJson } from './mini-app-error';

enum MiniAppDownloadErrorType {
  DownloadFailedError = 'DownloadFailedError',
  InvalidUrlError = 'InvalidUrlError',
  SaveFailureError = 'SaveFailureError',
  DownloadHttpError = 'DownloadHttpError',
}

interface MiniAppDownloadError extends MiniAppJson {
  code?: number;
}

/**
 * Error returned by `MiniApp.downloadFile` when failed to download or save the file.
 */
export class DownloadFailedError extends MiniAppError {
  constructor(public errorInput: MiniAppDownloadError) {
    super(errorInput);
    Object.setPrototypeOf(this, DownloadFailedError.prototype);
    this.message = 'Failed to download the file.';
  }
}

/**
 * Error returned by `MiniApp.downloadFile` when the provided URL is invalid.
 * Only `http:`, `https:` and `data:` URLs are supported.
 */
export class InvalidUrlError extends MiniAppError {
  constructor(public errorInput: MiniAppDownloadError) {
    super(errorInput);
    Object.setPrototypeOf(this, InvalidUrlError.prototype);
    this.message = 'The provided URL is invalid.';
  }
}

/**
 * Error returned by `MiniApp.downloadFile` when failed to save file to device.
 */
export class SaveFailureError extends MiniAppError {
  constructor(public errorInput: MiniAppDownloadError) {
    super(errorInput);
    Object.setPrototypeOf(this, SaveFailureError.prototype);
    this.message = 'Failed to save the file to the device.';
  }
}

/**
 * Error returned by `MiniApp.downloadFile` when failed to download the file due to an HTTP error.
 * @param code HTTP error code returned by the server.
 */
export class DownloadHttpError extends MiniAppError {
  code: number;

  constructor(public errorInput: MiniAppDownloadError) {
    super(errorInput);
    Object.setPrototypeOf(this, DownloadHttpError.prototype);
    this.code = errorInput.code;
    this.message = errorInput.message;
  }
}

export function parseDownloadError(json: MiniAppDownloadError) {
  const errorType: MiniAppDownloadErrorType =
    MiniAppDownloadErrorType[
      json.type as keyof typeof MiniAppDownloadErrorType
    ];
  switch (errorType) {
    case MiniAppDownloadErrorType.DownloadFailedError:
      return new DownloadFailedError(json);
    case MiniAppDownloadErrorType.InvalidUrlError:
      return new InvalidUrlError(json);
    case MiniAppDownloadErrorType.SaveFailureError:
      return new SaveFailureError(json);
    case MiniAppDownloadErrorType.DownloadHttpError:
      return new DownloadHttpError(json);
    default:
      return undefined;
  }
}
