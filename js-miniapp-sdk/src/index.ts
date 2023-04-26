/** @internal */

/**
 * Main entry point for SDK
 */

import {
  Reward,
  CustomPermission,
  CustomPermissionName,
  CustomPermissionStatus,
  CustomPermissionResult,
  ShareInfoType,
  ScreenOrientation,
  AccessTokenData,
  Contact,
  Points,
  HostEnvironmentInfo,
  DownloadFileHeaders,
  Platform,
  MessageToContact,
  AuthorizationFailureError,
  AudienceNotSupportedError,
  DownloadFailedError,
  DownloadHttpError,
  InvalidUrlError,
  MiniAppError,
  SaveFailureError,
  ScopesNotSupportedError,
  SecureStorageFullError,
  SecureStorageBusyError,
  SecureStorageUnavailableError,
  SecureStorageIOError,
  MiniAppSecureStorageEvents,
  CloseAlertInfo,
  ProductInfo,
  ProductPrice,
  PurchasedProductInfo,
  PurchaseFailedError,
  ConsumeFailedError,
  ProductNotFoundError,
  ProductPurchasedAlreadyError,
  UserCancelledPurchaseError,
  HostThemeColor,
} from '../../js-miniapp-bridge/src';

import { MiniApp } from './miniapp';
import {
  MiniAppEvents,
  MiniAppKeyboardEvents,
  HostAppEvents,
} from './event-types';

/** @internal */
const miniAppInstance = new MiniApp();

export default miniAppInstance;
export {
  CustomPermission,
  CustomPermissionName,
  CustomPermissionStatus,
  CustomPermissionResult,
  Reward,
  ShareInfoType,
  ScreenOrientation,
  AccessTokenData,
  Contact,
  Points,
  DownloadFileHeaders,
  HostEnvironmentInfo,
  Platform,
  MessageToContact,
  AuthorizationFailureError,
  AudienceNotSupportedError,
  DownloadFailedError,
  DownloadHttpError,
  InvalidUrlError,
  MiniAppError,
  SaveFailureError,
  ScopesNotSupportedError,
  MiniAppEvents,
  MiniAppKeyboardEvents,
  HostAppEvents,
  SecureStorageFullError,
  SecureStorageBusyError,
  SecureStorageUnavailableError,
  SecureStorageIOError,
  MiniAppSecureStorageEvents,
  CloseAlertInfo,
  HostThemeColor,
  ProductInfo,
  ProductPrice,
  PurchasedProductInfo,
  PurchaseFailedError,
  ConsumeFailedError,
  ProductNotFoundError,
  ProductPurchasedAlreadyError,
  UserCancelledPurchaseError,
};
