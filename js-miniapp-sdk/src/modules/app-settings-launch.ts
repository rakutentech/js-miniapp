import { getBridge } from '../sdkbridge';

interface AppSettingsLaunchProvider {
  /**
   * allows miniapp to launch app settings
   */
  launchAppSettings(): Promise<boolean>;
}

/** @internal */
export class AppSettingsLaunch implements AppSettingsLaunchProvider {
  launchAppSettings(): Promise<boolean> {
    return getBridge().launchAppSettings();
  }
}
