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
  TokenData,
} from '../../js-miniapp-bridge/src';

import { MiniApp } from './miniapp';

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
  TokenData,
};
