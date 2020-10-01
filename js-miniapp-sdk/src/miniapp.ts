import {
  CustomPermission,
  CustomPermissionResult,
} from './types/CustomPermission';
import { DevicePermission } from './types/DevicePermission';
import { ShareInfoType } from './types/ShareInfoType';

/**
 * A module layer for webapps and mobile native interaction.
 */
interface MiniAppFeatures {
  /** @returns The Promise of provided id of mini app from injected side. */
  getUniqueId(): Promise<string>;

  /** @returns The Promise of permission result of mini app from injected side. */
  requestLocationPermission(): Promise<string>;

  /**
   *
   * Request that the user grant custom permissions related to accessing user data.
   * Typically, this will show a dialog in the Host App asking the user grant access to your Mini App.
   * You can pass multiple permissions at once and the Host App will request all of those permissions within a single dialog.
   *
   * @param permissions An array containing CustomPermission objects - permission name and description
   * @returns Promise with the custom permission results - "ALLOWED" or "DENIED" for each permission
   */
  requestCustomPermissions(
    permissions: CustomPermission[]
  ): Promise<CustomPermissionResult[]>;

  /**
   * @param info The shared data must match the property in [ShareInfoType].
   * @returns The Promise of share info action state from injected side.
   */
  shareInfo(info: ShareInfoType): Promise<string>;
}

/* tslint:disable:no-any */
export class MiniApp implements MiniAppFeatures {
  private requestPermission(permissionType: string): Promise<string> {
    return (window as any).MiniAppBridge.requestPermission(permissionType);
  }

  getUniqueId(): Promise<string> {
    return (window as any).MiniAppBridge.getUniqueId();
  }

  requestLocationPermission(): Promise<string> {
    return this.requestPermission(DevicePermission.LOCATION);
  }

  requestCustomPermissions(
    permissions: CustomPermission[]
  ): Promise<CustomPermissionResult[]> {
    return (window as any).MiniAppBridge.requestCustomPermissions(
      permissions
    ).then(permissionResult => permissionResult.permissions);
  }

  shareInfo(info: ShareInfoType): Promise<string> {
    return (window as any).MiniAppBridge.shareInfo(info);
  }
}
