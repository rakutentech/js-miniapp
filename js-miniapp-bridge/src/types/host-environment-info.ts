import { Platform, HostBuildType } from './platform';

/** HostEnvironmentInfo type. */
export interface HostEnvironmentInfo {
  platform?: Platform;
  platformVersion?: string;
  hostVersion?: string;
  sdkVersion?: string;
  hostLocale?: string;
  hostBuildType?: HostBuildType;
  deviceToken?: string;
  pushToken?: string;
}
