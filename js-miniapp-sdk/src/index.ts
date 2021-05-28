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
  MessageToContact,
} from '../../js-miniapp-bridge/src';

import { MiniApp } from './miniapp';
import {
  MiniAppError,
  AuthorizationFailureError,
  ScopesNotSupportedError,
  AudienceNotSupportedError,
} from './miniapp-error-type';

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
  MessageToContact,
  MiniAppError,
  AudienceNotSupportedError,
  AuthorizationFailureError,
  ScopesNotSupportedError,
};
