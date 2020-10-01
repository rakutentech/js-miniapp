/** @internal */

/**
 * Main entry point for SDK
 */

import { MiniApp } from './miniapp';
import { ShareInfoType } from './types/ShareInfoType';
import {
  CustomPermission,
  CustomPermissionName,
  CustomPermissionStatus,
  CustomPermissionResult,
} from './types/CustomPermission';

/** @internal */
const miniAppInstance = new MiniApp();

export default miniAppInstance;
export {
  CustomPermission,
  CustomPermissionName,
  CustomPermissionStatus,
  CustomPermissionResult,
  ShareInfoType,
};
