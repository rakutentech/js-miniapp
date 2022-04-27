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
import { ShareInfoType } from './types/share-info';
import { ScreenOrientation } from './types/screen';
import { AccessTokenData } from './types/token-data';
import { Contact } from './types/contact';
import { Points } from './types/points';
import { HostEnvironmentInfo } from './types/host-environment-info';
import { DownloadFileHeaders } from './types/download-file-headers';
import { Platform } from './types/platform';
import { MessageToContact } from './types/message-to-contact';
import {
  MiniAppError,
  AudienceNotSupportedError,
  AuthorizationFailureError,
  ScopesNotSupportedError,
  parseMiniAppError,
  errorTypesDescriptions,
  MiniAppErrorType,
} from './types/error-types';
import {
  MiniAppSecureStorageKeyValues,
  MiniAppSecureStorageSize,
} from './types/secure-storage';
import {
  Product,
  PurchasedProduct,
  PurchasedProductResponseStatus,
  PurchasedProductResponse,
} from './types/purchaseProduct';

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
  ShareInfoType,
  ScreenOrientation,
  AccessTokenData,
  Contact,
  Points,
  HostEnvironmentInfo,
  DownloadFileHeaders,
  Platform,
  MessageToContact,
  MiniAppError,
  AudienceNotSupportedError,
  AuthorizationFailureError,
  ScopesNotSupportedError,
  parseMiniAppError,
  errorTypesDescriptions,
  MiniAppErrorType,
  Product,
  PurchasedProduct,
  PurchasedProductResponseStatus,
  PurchasedProductResponse,
  MiniAppSecureStorageKeyValues,
  MiniAppSecureStorageSize,
};
