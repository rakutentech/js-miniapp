import {
  AuthorizationFailureError,
  AudienceNotSupportedError,
  parseAuthError,
  ScopesNotSupportedError,
} from './auth-errors';
import {
  DownloadFailedError,
  DownloadHttpError,
  InvalidUrlError,
  parseDownloadError,
  SaveFailureError,
} from './download-file-errors';
import {
  SecureStorageFullError,
  SecureStorageBusyError,
  SecureStorageUnavailableError,
  SecureStorageIOError,
  parseStorageError,
} from './secure-storage-errors';
import {
  PurchaseFailedError,
  ConsumeFailedError,
  ProductNotFoundError,
  ProductPurchasedAlreadyError,
  UserCancelledPurchaseError,
  parseInAppPurchaseError,
} from './in-app-purchase-errors';
import { MiniAppError, MiniAppJson } from './mini-app-error';

function parseMiniAppError(jsonString: string): MiniAppError {
  try {
    const json = JSON.parse(jsonString) as MiniAppJson;

    return (
      parseAuthError(json) ||
      parseDownloadError(json) ||
      parseStorageError(json) ||
      parseInAppPurchaseError(json) ||
      new MiniAppError(json)
    );
  } catch (e) {
    console.error(e);
    if (jsonString !== '' || jsonString !== undefined) {
      return new MiniAppError({
        type: 'MiniAppError',
        message: jsonString,
      });
    }
    return new MiniAppError({
      type: 'MiniAppError',
      message: 'Failed to parse the error',
    });
  }
}

export {
  AuthorizationFailureError,
  AudienceNotSupportedError,
  DownloadFailedError,
  DownloadHttpError,
  InvalidUrlError,
  MiniAppError,
  parseMiniAppError,
  SaveFailureError,
  ScopesNotSupportedError,
  SecureStorageFullError,
  SecureStorageBusyError,
  SecureStorageUnavailableError,
  SecureStorageIOError,
  PurchaseFailedError,
  ConsumeFailedError,
  ProductNotFoundError,
  ProductPurchasedAlreadyError,
  UserCancelledPurchaseError,
};
