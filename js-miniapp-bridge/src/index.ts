/** @internal */

/**
 * Exports the types for Mini App Bridge
 */

import { MiniAppBridge } from './common-bridge';
import { MiniAppSDKLogger } from './common-log';
import { AdTypes } from './types/ad-types';
import { Reward } from './types/response-types/rewarded';
import { DevicePermission } from './types/device-permission';
import {
  CustomPermission,
  CustomPermissionName,
  CustomPermissionStatus,
  CustomPermissionResult,
} from './types/custom-permissions';
import { ShareInfo } from './types/share-info';
import { ScreenOrientation } from './types/screen';
import { AccessTokenData } from './types/token-data';
import { Contact } from './types/contact';
import { Points } from './types/points';
import { HostEnvironmentInfo } from './types/host-environment-info';
import { DownloadFileHeaders } from './types/download-file-headers';
import { Platform } from './types/platform';
import { MessageToContact } from './types/message-to-contact';
import { CloseAlertInfo } from './types/close-alert';
import { HostThemeColor } from './types/host-color-scheme';
import {
  MAAnalyticsInfo,
  MAAnalyticsActionType,
  MAAnalyticsEventType,
} from './types/analytics/analytics';
import { UniversalBridgeInfo } from './types/universal-bridge';

import {
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
  PurchaseFailedError,
  ConsumeFailedError,
  ProductNotFoundError,
  ProductPurchasedAlreadyError,
  UserCancelledPurchaseError,
} from './types/error-types';
import {
  MiniAppSecureStorageKeyValues,
  MiniAppSecureStorageSize,
  MiniAppSecureStorageEvents,
} from './types/secure-storage';
import {
  ProductInfo,
  PurchasedProductInfo,
  ProductPrice,
} from './types/in-app-purchase';
import { CookieInfo } from './types/cookie-info';
import {
  NotificationDetailedInfo,
  NotificationInfo,
  NotificationInfoType,
  NotificationInfoPriority,
} from './types/notification/notification-info';

export {
  MiniAppBridge,
  MiniAppSDKLogger,
  AdTypes,
  Reward,
  DevicePermission,
  CustomPermission,
  CustomPermissionName,
  CustomPermissionStatus,
  CustomPermissionResult,
  ShareInfo,
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
  MiniAppSecureStorageKeyValues,
  MiniAppSecureStorageSize,
  SecureStorageFullError,
  SecureStorageBusyError,
  SecureStorageUnavailableError,
  SecureStorageIOError,
  MiniAppSecureStorageEvents,
  CloseAlertInfo,
  ProductInfo,
  PurchasedProductInfo,
  ProductPrice,
  PurchaseFailedError,
  ConsumeFailedError,
  ProductNotFoundError,
  ProductPurchasedAlreadyError,
  UserCancelledPurchaseError,
  HostThemeColor,
  MAAnalyticsInfo,
  MAAnalyticsActionType,
  MAAnalyticsEventType,
  UniversalBridgeInfo,
  CookieInfo,
  NotificationInfo,
  NotificationDetailedInfo,
  NotificationInfoType,
  NotificationInfoPriority,
};
