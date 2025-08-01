import { getBridge } from '../sdkbridge';
import {
  CloseAlertInfo,
  HostThemeColor,
  MAAnalyticsInfo,
} from '../../../js-miniapp-bridge/src';
import { LogType } from '../../../js-miniapp-bridge/src/types/log-type';
import { LaunchBrowserOptions } from '../../../js-miniapp-bridge/src/types/browser-options';

/**
 * Mini App Utility methods
 */
export interface MiniAppUtilsProvider {
  /**
   * Mini App can choose whether to display Close confirmation alert dialog when mini app is closed
   * @param alertInfo - CloseAlertInfo object
   */
  setCloseAlert(alertInfo: CloseAlertInfo): Promise<string>;

  /**
   * Mini App can be closed using this method, provided Host app is supporting this interface to close the miniapp.
   * @param withConfirmation boolean value which will be used by the host app to show/hide close confirmation alert
   * which should be set using `setCloseAlert` method in prior before calling this interface
   */
  closeMiniApp(withConfirmation: boolean): Promise<string>;

  /**
   * Miniapp can notify the host app that it has finished loading using this call.
   * Host app can implement this interface to perform any other actions after the miniapp has loaded.
   */
  miniAppFinishedLoading(): Promise<string>;

  /**
   * Interface that is used to get the Color theme used in the Host application
   */
  getHostAppThemeColors(): Promise<HostThemeColor>;

  /**
   * Interface to check if the Device/Application is using Dark mode
   */
  isDarkMode(): Promise<boolean>;

  /**
   * Interface to send analytics to Host app
   * @param analyticsInfo Analytics info
   */
  sendAnalytics(analytics: MAAnalyticsInfo): Promise<string>;

  /**
   * Interface to get list of features supported by the SDK and Host
   */
  getFeatureList(): Promise<string[]>;

  /**
   * Interface to check if the device has the deeplink available.
   */
  canOpenAppDeeplink(deeplinkURL: string): Promise<boolean>;

  /**
   * Interface to check if the application has whitelisted the deeplink
   */
  isAppDeeplinkSupported(deeplinkURL: string): Promise<boolean>;

  /**
   * This interface will be used to launch the URL in external browser
   * @param url Remote URL
   */
  launchExternalBrowser(url: string): Promise<boolean>;

  /**
   * This interface will be used to launch the URL in Internal browser.
   * You can pass either a string URL or a LaunchBrowserOptions object to specify
   * HTTP method, body, audience, and scopes.
   * @param urlOrParams The URL string or LaunchBrowserOptions object.
   */
  launchInternalBrowser(
    urlOrParams: string | LaunchBrowserOptions
  ): Promise<boolean>;

  /**
   * Interface to log events with a message and log type.
   * @param message - The log message.
   * @param type - The log type.
   */
  logEvent(message: string, type: LogType): Promise<boolean>;

  /**
   * Launches an application on the device using a deeplink URL.
   * This method is useful for both iOS and Android devices where applications can be launched using deeplinks.
   *
   * @param url - The deeplink URL of the application to launch.
   * @returns A promise or result from the underlying utility manager indicating the success or failure of the launch operation.
   */
  launchAppUsingDeeplink(url: string): Promise<boolean>;

  /**
   * Launches an application on the device using its package name.
   * This method is useful for Android devices where applications can be launched using their unique package names.
   *
   * @param packageName - The unique package name of the application to launch.
   * @returns A promise or result from the underlying utility manager indicating the success or failure of the launch operation.
   */
  launchAppUsingPackageName(packageName: string): Promise<boolean>;
}

/** @internal */
export class MiniAppUtils implements MiniAppUtilsProvider {
  closeMiniApp(withConfirmation: boolean): Promise<string> {
    return getBridge().closeMiniApp(withConfirmation);
  }
  miniAppFinishedLoading(): Promise<string> {
    return getBridge().miniAppFinishedLoading();
  }
  setCloseAlert(alertInfo: CloseAlertInfo): Promise<string> {
    return getBridge().setCloseAlert(alertInfo);
  }
  getHostAppThemeColors(): Promise<HostThemeColor> {
    return getBridge().getHostAppThemeColors();
  }
  isDarkMode(): Promise<boolean> {
    return getBridge().isDarkMode();
  }
  sendAnalytics(analytics: MAAnalyticsInfo): Promise<string> {
    if (typeof getBridge().sendAnalytics === 'function') {
      return getBridge().sendAnalytics(analytics);
    }
    return Promise.reject('sendAnalytics Error');
  }
  getFeatureList(): Promise<string[]> {
    return getBridge().getFeatureList();
  }

  canOpenAppDeeplink(deeplinkURL: string): Promise<boolean> {
    return getBridge().canOpenAppDeeplink(deeplinkURL);
  }

  isAppDeeplinkSupported(deeplinkURL: string): Promise<boolean> {
    return getBridge().isAppDeeplinkSupported(deeplinkURL);
  }

  launchExternalBrowser(url: string): Promise<boolean> {
    return getBridge().browserManager.launchExternalBrowser(url);
  }

  launchInternalBrowser(
    urlOrParams: string | LaunchBrowserOptions
  ): Promise<boolean> {
    return getBridge().browserManager.launchInternalBrowser(urlOrParams);
  }

  logEvent(message: string, type: LogType = LogType.DEBUG): Promise<boolean> {
    return getBridge().utilityManager.logEvent(message, type);
  }

  launchAppSettings(): Promise<boolean> {
    return getBridge().utilityManager.launchAppSettings();
  }

  launchAppUsingDeeplink(url: string): Promise<boolean> {
    return getBridge().utilityManager.launchAppUsingDeeplink(url);
  }

  launchAppUsingPackageName(packageName: string): Promise<boolean> {
    return getBridge().utilityManager.launchAppUsingPackageName(packageName);
  }

  /**
   * Converts a list of Blob objects to a list of number arrays.
   * Each Blob is converted to an ArrayBuffer, which is then converted to a Uint8Array.
   * The Uint8Array is converted to a regular array of numbers.
   *
   * @param imageBlob - An optional of Blob object to be converted.
   * @returns A promise that resolves to an array of number arrays.
   */
  static async convertBlobToNumberArray(imageBlob?: Blob): Promise<number[]> {
    if (!imageBlob) {
      return [];
    }
    const arrayBuffer = await imageBlob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    return Array.from(uint8Array);
  }
}
