import { getBridge } from '../sdkbridge';
import {
  CloseAlertInfo,
  HostThemeColor,
  MAAnalyticsInfo,
} from '../../../js-miniapp-bridge/src';

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
}
