import { HostEnvironmentInfo } from '../../js-miniapp-bridge/src/types/host-environment-info';
import { MiniAppError, Platform, Points } from '../../js-miniapp-bridge/src';
import { UserProfileManager } from '../../js-miniapp-bridge/src/modules/userprofile-manager';
import { BrowserManager } from '../../js-miniapp-bridge/src/modules/browser-manager';
import { mockMiniAppData } from './sdkbridge';
import { UtitlityManager } from '../../js-miniapp-bridge/src/modules/utility-manager';

/** @internal */
export class MockBridge {
  platform: string;
  userProfileManager: UserProfileManager;
  browserManager: BrowserManager;
  utilityManager: UtitlityManager;
  isSecureStorageReady = false;
  secureStorageLoadError: MiniAppError | null = null;

  constructor() {
    this.platform = Platform.IOS;
    this.userProfileManager = undefined;
    this.browserManager = undefined;
    this.utilityManager = undefined;
  }

  getPlatform() {
    return mockMiniAppData.platform;
  }

  getAccessToken() {
    return Promise.resolve(mockMiniAppData.token).catch(e => {
      return Promise.reject(e);
    });
  }

  getHostEnvironmentInfo(): Promise<HostEnvironmentInfo> {
    return Promise.resolve(mockMiniAppData.hostEnvInfo).catch(e => {
      return Promise.reject(e);
    });
  }

  getAllCookies() {
    return Promise.resolve(mockMiniAppData.allCookies).catch(e => {
      return Promise.reject(e);
    });
  }

  getFeatureList() {
    return Promise.resolve(mockMiniAppData.features).catch(e => {
      return Promise.reject(e);
    });
  }

  getUserName() {
    return Promise.resolve(mockMiniAppData.userName).catch(e => {
      return Promise.reject(e);
    });
  }

  getProfilePhoto() {
    return Promise.resolve(mockMiniAppData.profilePic).catch(e => {
      return Promise.reject(e);
    });
  }

  getPhoneNumber() {
    return Promise.resolve(mockMiniAppData.phoneNo).catch(e => {
      return Promise.reject(e);
    });
  }

  requestPermission() {
    if (mockMiniAppData.requestPermission) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  getUniqueId() {
    return Promise.resolve(mockMiniAppData.uniqueId).catch(e => {
      return Promise.reject(e);
    });
  }

  getMessagingUniqueId() {
    return Promise.resolve(mockMiniAppData.messagingUniqueId).catch(e => {
      return Promise.reject(e);
    });
  }

  getMauid() {
    return Promise.resolve(mockMiniAppData.mauid).catch(e => {
      return Promise.reject(e);
    });
  }

  requestLocationPermission() {
    if (mockMiniAppData.requestLocationPermission) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  requestCustomPermissions() {
    return Promise.resolve(mockMiniAppData.permissionInfo).catch(e => {
      return Promise.reject(e);
    });
  }

  loadInterstitialAd() {
    if (mockMiniAppData.loadInterstitialAd) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  loadRewardedAd() {
    if (mockMiniAppData.loadRewardedAd) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  showInterstitialAd() {
    if (mockMiniAppData.showInterstitialAd) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  showRewardedAd() {
    return Promise.resolve(mockMiniAppData.rewardAdResponse).catch(e => {
      return Promise.reject(e);
    });
  }

  shareInfo() {
    if (mockMiniAppData.shareInfo) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  setScreenOrientation() {
    if (mockMiniAppData.setScreenOrientation) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  sendMessageToContact() {
    try {
      if (
        mockMiniAppData.contactId !== 'null' &&
        mockMiniAppData.contactId !== null
      ) {
        return Promise.resolve(mockMiniAppData.contactId);
      } else {
        return Promise.resolve(null);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  sendMessageToContactId() {
    try {
      if (
        mockMiniAppData.contactId !== 'null' &&
        mockMiniAppData.contactId !== null
      ) {
        return Promise.resolve(mockMiniAppData.contactId);
      } else {
        return Promise.resolve(null);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  sendMessageToMultipleContacts() {
    try {
      if (
        mockMiniAppData.contactId !== 'null' &&
        mockMiniAppData.contactId !== null
      ) {
        return Promise.resolve(
          JSON.parse(mockMiniAppData.contactId) as string[]
        );
      } else {
        return Promise.resolve(null);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  getPoints() {
    return Promise.resolve(JSON.parse(mockMiniAppData.points) as Points).catch(
      e => {
        return Promise.reject(e);
      }
    );
  }

  downloadFile() {
    try {
      if (
        mockMiniAppData.fileDowloadId !== 'null' &&
        mockMiniAppData.fileDowloadId !== null
      ) {
        return Promise.resolve(
          JSON.parse(mockMiniAppData.fileDowloadId) as string[]
        );
      } else {
        return Promise.resolve(null);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  setSecureStorage() {
    return Promise.resolve(undefined).catch(e => {
      return Promise.reject(e);
    });
  }

  getSecureStorageItem() {
    return Promise.resolve(mockMiniAppData.secureStorageItem).catch(e => {
      return Promise.reject(e);
    });
  }

  removeSecureStorageItems() {
    return Promise.resolve(undefined).catch(e => {
      return Promise.reject(e);
    });
  }

  clearSecureStorage() {
    return Promise.resolve(undefined).catch(e => {
      return Promise.reject(e);
    });
  }

  getSecureStorageSize() {
    return Promise.resolve(mockMiniAppData.secureStorageSize).catch(e => {
      return Promise.reject(e);
    });
  }

  setCloseAlert() {
    if (mockMiniAppData.setCloseAlert) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  sendJsonToHostapp() {
    if (mockMiniAppData.sendJsonToHostapp) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  sendInfoToHostapp() {
    if (mockMiniAppData.sendInfoToHostapp) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  getContacts() {
    return Promise.resolve(mockMiniAppData.contacts).catch(e => {
      return Promise.reject(e);
    });
  }

  isLoggedIn() {
    return Promise.resolve(mockMiniAppData.isLoggedIn).catch(() => {
      return Promise.reject(false);
    });
  }

  closeMiniApp() {
    if (mockMiniAppData.closeMiniApp) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  miniAppFinishedLoading() {
    if (mockMiniAppData.miniAppFinishedLoading) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  getAllProducts() {
    return Promise.resolve(mockMiniAppData.productsList).catch(e => {
      return Promise.reject(e);
    });
  }

  purchaseProductWith() {
    return Promise.resolve(mockMiniAppData.productInfo).catch(e => {
      return Promise.reject(e);
    });
  }

  consumePurchaseWith() {
    return Promise.resolve(mockMiniAppData.consumedPurchaseInfo).catch(e => {
      return Promise.reject(e);
    });
  }

  getHostAppThemeColors() {
    return Promise.resolve(mockMiniAppData.themeColor).catch(e => {
      return Promise.reject(e);
    });
  }

  isDarkMode() {
    return Promise.resolve(mockMiniAppData.isDarkMode).catch(() => {
      return Promise.reject(false);
    });
  }

  sendAnalytics() {
    if (mockMiniAppData.sendAnalytics) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  shouldClearNotifications() {
    if (mockMiniAppData.shouldClearNotifications) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  shouldUpdateBadgeNumber() {
    if (mockMiniAppData.shouldUpdateBadgeNumber) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  shouldUpdateNotificationInfo() {
    if (mockMiniAppData.shouldUpdateNotificationInfo) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  canOpenAppDeeplink() {
    return Promise.resolve(mockMiniAppData.openAppDeeplink).catch(() => {
      return Promise.reject(false);
    });
  }

  isAppDeeplinkSupported() {
    return Promise.reject(false);
  }

  launchExternalBrowser() {
    return Promise.resolve(mockMiniAppData.launchExternalBrowser).catch(() => {
      return Promise.reject(false);
    });
  }

  launchInternalBrowser() {
    return Promise.resolve(mockMiniAppData.launchInternalBrowser).catch(() => {
      return Promise.reject(false);
    });
  }

  launchGallery() {
    return Promise.resolve(mockMiniAppData.launchGallery).catch(() => {
      return Promise.reject(false);
    });
  }

  getCookies() {
    return Promise.resolve(mockMiniAppData.cookies).catch(e => {
      return Promise.reject(e);
    });
  }

  set() {
    if (mockMiniAppData.setPreferences) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  get() {
    if (mockMiniAppData.getPreferences) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  remove() {
    if (mockMiniAppData.removePreferences) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  clearMiniAppPreferences() {
    if (mockMiniAppData.clearMiniAppPreferences) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  getImageFromGallery() {
    return Promise.resolve(mockMiniAppData.getImageFromGallery).catch(e => {
      return Promise.reject(e);
    });
  }

  getExchangeToken() {
    return Promise.resolve(mockMiniAppData.exchangeToken).catch(e => {
      return Promise.reject(e);
    });
  }

  logEvent() {
    if (mockMiniAppData.logEvent) {
      return Promise.resolve('success');
    } else {
      return Promise.reject();
    }
  }

  allowBackForwardNavigationGestures() {
    return Promise.resolve(
      mockMiniAppData.allowBackForwardNavigationGestures
    ).catch(e => {
      return Promise.reject(e);
    });
  }

  isEsimSupported() {
    return Promise.resolve(mockMiniAppData.isEsimSupported).catch(e => {
      return Promise.reject(e);
    });
  }

  setupAndInstallEsim() {
    return Promise.resolve(mockMiniAppData.setupAndInstallEsim).catch(e => {
      return Promise.reject(e);
    });
  }

  forceInternalWebView() {
    return Promise.resolve(true);
  }

  launchAppSettings() {
    return Promise.resolve(true);
  }
}
