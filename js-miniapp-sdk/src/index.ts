/** @internal */

/**
 * Main entry point for SDK
 */

import { MiniApp } from './miniapp';
import { ShareInfoType } from './types/ShareInfoType';
import { CustomPermissionType } from './types/CustomPermissionType';

/** @internal */
const miniAppInstance = new MiniApp();

export default miniAppInstance;
export { ShareInfoType, CustomPermissionType };
