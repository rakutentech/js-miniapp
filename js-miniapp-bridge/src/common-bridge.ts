/** @internal */

/**
 * Bridge for communicating with Mini App
 */
const crypto = require('crypto');

import { AdTypes } from './types/ad-types';
import { Contact } from './types/contact';
import {
  CustomPermission,
  CustomPermissionResponse,
} from './types/custom-permissions';
import { DevicePermission } from './types/device-permission';
import { DownloadFileHeaders } from './types/download-file-headers';
import { HostEnvironmentInfo } from './types/host-environment-info';
import { MessageToContact } from './types/message-to-contact';
import { Points } from './types/points';
import { Reward } from './types/response-types';
import { ScreenOrientation } from './types/screen';
import { CloseAlertInfo } from './types/close-alert';
import {
  MiniAppSecureStorageEvents,
  MiniAppSecureStorageKeyValues,
  MiniAppSecureStorageSize,
} from './types/secure-storage';
import { ShareInfo } from './types/share-info';
import { AccessTokenData, NativeTokenData } from './types/token-data';
import { MiniAppError, parseMiniAppError } from './types/error-types';
import { MiniAppResponseInfo } from './types/response-types/miniapp';
import { ProductInfo, PurchasedProductInfo } from './types/in-app-purchase';
import { HostThemeColor } from './types/host-color-scheme';
import { MAAnalyticsInfo } from './types/analytics/analytics';
import { UniversalBridgeInfo } from './types/universal-bridge';
import { CookieInfo } from './types/cookie-info';
import { NotificationBridge } from './modules/notification-bridge';
import {
  NotificationDetailedInfo,
  NotificationInfo,
  NotificationInfoType,
} from './types/notification/notification-info';
import { MiniAppPreferences } from './modules/miniapp-preferences';
import { BrowserManager } from './modules/browser-manager';
import { GalleryManager } from './modules/gallery-manager';
import { UserProfileManager } from './modules/userprofile-manager';
import { WebViewConfigManager } from './modules/webview-config-manager';
import { UtilityManager } from './modules/utility-manager';
import { LogType } from './types/log-type';
import { EsimConfig } from './types/e-sim';
import { Platform } from './types/platform';
import { LaunchBrowserOptions } from './types/browser-options';

/** @internal */
const mabMessageQueue: Callback[] = [];
const mabCustomEventQueue: CustomEvent[] = [];
const mabKeyboardEventQueue: CustomEvent[] = [];
export { mabMessageQueue };
export { mabCustomEventQueue };
export { mabKeyboardEventQueue };

/** @internal */
export interface Callback {
  id: string;
  onSuccess: (value: string) => void;
  onError: (error: string) => void;
}

/** @internal */
export interface PlatformExecutor {
  /**
   * Method to call the native interface methods for respective platforms
   * such as iOS & Android.
   * @param  {[string]} action Action command/interface name that native side need to execute
   * @param  {Object} param Object that contains request parameter values like permissions.
   * For eg., {permission: 'location'}
   * @param  {[Function]} onSuccess Success callback function
   * @param  {[Function]} onError Error callback function
   */
  exec(
    action: string,
    param: object | null,
    onSuccess: (value: string) => void,
    onError: (error: string) => void
  ): void;

  execEvents(event: CustomEvent): void;

  /**
   * Get the platform which injects this bridge.
   * @returns The platform name. It could be 'Android' or 'iOS'.
   */
  getPlatform(): string;
}

/** @internal */
export class MiniAppBridge {
  executor: PlatformExecutor;
  platform: string;
  isSecureStorageReady = false;
  secureStorageLoadError: MiniAppError | null = null;
  private notificationBridge: NotificationBridge;
  preferences: MiniAppPreferences;
  browserManager: BrowserManager;
  galleryManager: GalleryManager;
  userProfileManager: UserProfileManager;
  webviewConfigManager: WebViewConfigManager;
  utilityManager: UtilityManager;

  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();
    this.notificationBridge = new NotificationBridge(executor);
    this.preferences = new MiniAppPreferences(executor);
    this.browserManager = new BrowserManager(executor);
    this.galleryManager = new GalleryManager(executor);
    this.userProfileManager = new UserProfileManager(executor);
    this.webviewConfigManager = new WebViewConfigManager(executor);
    this.utilityManager = new UtilityManager(executor);

    if (window) {
      window.addEventListener(
        MiniAppSecureStorageEvents.onReady,
        () => (this.isSecureStorageReady = true)
      );
      window.addEventListener(
        MiniAppSecureStorageEvents.onLoadError,
        (e: CustomEvent) =>
          (this.secureStorageLoadError = parseMiniAppError(e.detail.message))
      );
    }
  }

  /**
   * Success Callback method that will be called from native side
   * to this bridge. This method will send back the value to the
   * mini apps that uses promises.
   * @param  {[String]} messageId Message ID which will be used to get callback object from messageQueue
   * @param  {[String]} value Response value sent from the native on invoking the action command
   */
  execSuccessCallback(messageId, value) {
    const queueObj = mabMessageQueue.filter(
      callback => callback.id === messageId
    )[0];
    if (value) {
      queueObj.onSuccess(value);
    } else {
      queueObj.onError('Unknown Error');
    }
    removeFromMessageQueue(queueObj);
  }

  /**
   * Error Callback method that will be called from native side
   * to this bridge. This method will send back the error message to the
   * mini apps that uses promises.
   * @param  {[String]} messageId Message ID which will be used to get callback object from messageQueue
   * @param  {[String]} errorMessage Error message sent from the native on invoking the action command
   */
  execErrorCallback(messageId, errorMessage) {
    const queueObj = mabMessageQueue.filter(
      callback => callback.id === messageId
    )[0];
    if (!errorMessage) {
      errorMessage = 'Unknown Error';
    }
    queueObj.onError(errorMessage);
    removeFromMessageQueue(queueObj);
  }
  /**
   * Event Callback method that will be called from native side
   * to this bridge. This method will send back the value to the
   * mini app that listen to this eventType.
   * @param  {[String]} eventType EventType which will be used to listen for the event
   * @param  {[String]} value Additional message sent from the native on invoking for the eventType
   */
  execCustomEventsCallback(eventType: string, value: string) {
    // This fix is added to decode the string from the host app.
    // Reason: Some characters are not escaped properly, so the data is encoded in the native application
    // and decoded here.
    let result = value;
    if (eventType === 'miniappreceivejsoninfo') {
      if (this.platform === Platform.IOS) {
        result = convertUnicodeCharacters(value);
      } else if (this.platform === Platform.ANDROID) {
        result = convertUnicodeCharactersForAndroid(value);
      }
    }
    const event = new CustomEvent(eventType, {
      detail: { message: result },
    });
    let queueObj = mabCustomEventQueue.filter(
      customEvent => customEvent === event
    )[0];
    if (!queueObj) {
      if (eventType === event.type) {
        removeFromEventQueue(event);
      }
      queueObj = event;
      mabCustomEventQueue.unshift(queueObj);
    }
    this.executor.execEvents(queueObj);
  }

  /**
   * Keyboard Events Callback method that will be called from native side
   * to this bridge. This method will send back the value to the
   * mini app that listen to this eventType.
   * @param  {[String]} eventType EventType which will be used to listen for the event
   * @param  {[String]} message Additional message sent from the native on invoking for the eventType
   * @param  {[String]} navigationBarHeight Additional message sent from the native on invoking for the navigationBarHeight
   * @param  {[String]} screenHeight Additional message sent from the native on invoking for the screenHeight
   * @param  {[String]} keyboardHeight Additional message sent from the native on invoking for the keyboardHeight
   */
  execKeyboardEventsCallback(
    eventType: string,
    message: string,
    navigationBarHeight: number,
    screenHeight: number,
    keyboardHeight: number
  ) {
    const event = new CustomEvent(eventType, {
      detail: {
        message,
        navigationBarHeight,
        screenHeight,
        keyboardHeight,
      },
    });
    let queueObj = mabKeyboardEventQueue.filter(
      customEvent => customEvent === event
    )[0];
    if (!queueObj) {
      if (eventType === event.type) {
        removeFromKeyboardEventQueue(event);
      }
      queueObj = event;
      mabKeyboardEventQueue.unshift(queueObj);
    }
    this.executor.execEvents(queueObj);
  }

  /**
   * Deprecated method for associating getUniqueId function to MiniAppBridge object.
   * Use `getMessagingUniqueId` or `getMauid` instead
   */
  getUniqueId() {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'getUniqueId',
        null,
        id => resolve(id),
        error => reject(error)
      );
    });
  }

  /**
   * Associating getMessagingUniqueId function to MiniAppBridge object.
   */
  getMessagingUniqueId() {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'getMessagingUniqueId',
        null,
        id => resolve(id),
        error => reject(error)
      );
    });
  }

  /**
   * Associating getMauid function to MiniAppBridge object.
   */
  getMauid() {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'getMauid',
        null,
        id => resolve(id),
        error => reject(error)
      );
    });
  }

  /**
   * Associating requestPermission function to MiniAppBridge object.
   * @param {DevicePermission} permissionType Type of permission that is requested e.g. location
   */
  requestPermission(permissionType: DevicePermission) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'requestPermission',
        { permission: permissionType },
        success => resolve(success),
        error => reject(error)
      );
    });
  }

  /**
   * Associating showInterstitialAd function to MiniAppBridge object.
   * @param {string} id ad unit id of the intertitial ad
   */
  showInterstitialAd(id: string) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'showAd',
        { adType: AdTypes.INTERSTITIAL, adUnitId: id },
        closeSuccess => resolve(closeSuccess),
        error => reject(error)
      );
    });
  }

  /**
   * Associating loadInterstitialAd function to MiniAppBridge object.
   * This function preloads interstitial ad before they are requested for display.
   * Can be called multiple times to pre-load multiple ads.
   * @param {string} id ad unit id of the interstitial ad that needs to be loaded.
   */
  loadInterstitialAd(id: string) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'loadAd',
        { adType: AdTypes.INTERSTITIAL, adUnitId: id },
        loadSuccess => resolve(loadSuccess),
        error => reject(error)
      );
    });
  }

  /**
   * Associating loadRewardedAd function to MiniAppBridge object.
   * This function preloads Rewarded ad before they are requested for display.
   * Can be called multiple times to pre-load multiple ads.
   * @param {string} id ad unit id of the Rewarded ad that needs to be loaded.
   */
  loadRewardedAd(id: string) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'loadAd',
        { adType: AdTypes.REWARDED, adUnitId: id },
        loadSuccess => resolve(loadSuccess),
        error => reject(error)
      );
    });
  }

  /**
   * Associating showRewardedAd function to MiniAppBridge object.
   * @param {string} id ad unit id of the Rewarded ad
   */
  showRewardedAd(id: string) {
    return new Promise<Reward>((resolve, reject) => {
      return this.executor.exec(
        'showAd',
        { adType: AdTypes.REWARDED, adUnitId: id },
        rewardResponse => resolve(JSON.parse(rewardResponse) as Reward),
        error => reject(error)
      );
    });
  }

  /**
   * Associating requestCustomPermissions function to MiniAppBridge object
   * @param [CustomPermissionType[] permissionTypes, Types of custom permissions that are requested
   * using an Array including the parameters eg. name, description.
   *
   * For eg., Miniapps can pass the array of valid custom permissions as following
   * [
   *  {"name":"rakuten.miniapp.user.USER_NAME", "description": "Reason to request for the custom permission"},
   *  {"name":"rakuten.miniapp.user.PROFILE_PHOTO", "description": "Reason to request for the custom permission"},
   *  {"name":"rakuten.miniapp.user.CONTACT_LIST", "description": "Reason to request for the custom permission"}
   * ]
   */
  requestCustomPermissions(permissionTypes: CustomPermission[]) {
    return new Promise<CustomPermissionResponse>((resolve, reject) => {
      return this.executor.exec(
        'requestCustomPermissions',
        { permissions: permissionTypes },
        success => resolve(JSON.parse(success)),
        error => reject(error)
      );
    });
  }

  /**
   * Associating shareInfo function to MiniAppBridge object.
   * This function returns the shared info action state.
   * @param {info} The shared info object.
   */
  shareInfo(info: ShareInfo) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'shareInfo',
        { shareInfo: info },
        success => resolve(success),
        error => reject(error)
      );
    });
  }

  /**
   * Associating getUserName function to MiniAppBridge object.
   * This function returns username from the user profile
   * (provided the rakuten.miniapp.user.USER_NAME custom permission is allowed by the user)
   * It returns error info if user had denied the custom permission
   */
  getUserName() {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'getUserName',
        null,
        userName => {
          let value = userName;
          if (this.platform === Platform.IOS) {
            value = convertUnicodeCharacters(userName);
          } else if (this.platform === Platform.ANDROID) {
            value = convertUnicodeCharactersForAndroid(userName);
          } else if (this.platform !== Platform.ELECTRON) {
            value = convertUnicodeCharactersForAndroid(userName);
          }
          resolve(value);
        },
        error => reject(error)
      );
    });
  }

  /**
   * Associating getProfilePhoto function to MiniAppBridge object.
   * This function returns username from the user profile.
   * (provided the rakuten.miniapp.user.PROFILE_PHOTO is allowed by the user)
   * It returns error info if user had denied the custom permission
   */
  getProfilePhoto() {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'getProfilePhoto',
        null,
        profilePhoto => resolve(profilePhoto),
        error => reject(error)
      );
    });
  }

  /**
   * Associating getContacts function to MiniAppBridge object.
   * This function returns contact list from the user profile.
   * (provided the rakuten.miniapp.user.CONTACT_LIST is allowed by the user)
   * It returns error info if user had denied the custom permission
   */
  getContacts(isEncoded?) {
    return new Promise<Contact[]>((resolve, reject) => {
      return this.executor.exec(
        'getContacts',
        { isContactsEncodingRequired: isEncoded },
        contacts => resolve(JSON.parse(contacts) as Contact[]),
        error => reject(error)
      );
    });
  }

  /**
   * Associating getAccessToken function to MiniAppBridge object.
   * This function returns access token details from the host app.
   * (provided the rakuten.miniapp.user.ACCESS_TOKEN is allowed by the user)
   * It returns error info if user had denied the custom permission
   * @param {string} audience the audience the MiniApp requests for the token
   * @param {string[]} scopes the associated scopes with the requested audience
   */
  getAccessToken(audience: string, scopes: string[]) {
    return new Promise<AccessTokenData>((resolve, reject) => {
      return this.executor.exec(
        'getAccessToken',
        { audience, scopes },
        tokenData => {
          const nativeTokenData = JSON.parse(tokenData) as NativeTokenData;
          resolve(new AccessTokenData(nativeTokenData));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Associating getExchangeToken function to MiniAppBridge object.
   * This function returns exchange token details from the host app.
   * It returns error info if user had denied the custom permission
   * @param {string} audience the audience the MiniApp requests for the token
   * @param {string[]} scopes the associated scopes with the requested audience
   */
  getExchangeToken(audience: string, scopes: string[]) {
    return new Promise<AccessTokenData>((resolve, reject) => {
      return this.executor.exec(
        'getExchangeToken',
        { audience, scopes },
        tokenData => {
          const nativeTokenData = JSON.parse(tokenData) as NativeTokenData;
          resolve(new AccessTokenData(nativeTokenData));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * This function does not return anything back on success.
   * @param {screenAction} The screen state that miniapp wants to set on device.
   */
  setScreenOrientation(screenAction: ScreenOrientation) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'setScreenOrientation',
        { action: screenAction },
        success => resolve(success),
        error => reject(error)
      );
    });
  }

  /**
   * @param message The message to send to contact.
   * @returns Promise resolves with the contact id received a message.
   * Can also resolve with null response in the case that the message was not sent to a contact, such as if the user cancelled sending the message.
   * Promise rejects in the case that there was an error.
   * It returns error info if user had denied the custom permission for sending message.
   */
  sendMessageToContact(message: MessageToContact) {
    return new Promise<string | null>((resolve, reject) => {
      return this.executor.exec(
        'sendMessageToContact',
        {
          messageToContact: {
            ...message,
            bannerMessage: trimBannerText(message.bannerMessage),
          },
        },
        contactId => {
          if (contactId !== 'null' && contactId !== null) {
            resolve(contactId);
          } else {
            resolve(null);
          }
        },
        error => reject(error)
      );
    });
  }

  /**
   * @param id The id of the contact receiving a message.
   * @param message The message to send to contact.
   * @returns Promise resolves with the contact id received a message.
   * @see {sendMessageToContact}
   */
  sendMessageToContactId(id: string, message: MessageToContact) {
    return new Promise<string | null>((resolve, reject) => {
      return this.executor.exec(
        'sendMessageToContactId',
        {
          contactId: id,
          messageToContact: {
            ...message,
            bannerMessage: trimBannerText(message.bannerMessage),
          },
        },
        contactId => {
          if (contactId !== 'null' && contactId !== null) {
            resolve(contactId);
          } else {
            resolve(null);
          }
        },
        error => reject(error)
      );
    });
  }

  /**
   * @param message The message to send to contact.
   * @returns Promise resolves with an array of contact id which were sent the message.
   * Can also resolve with null array in the case that the message was not sent to any contacts, such as if the user cancelled sending the message.
   * Promise rejects in the case that there was an error.
   * It returns error info if user had denied the custom permission for sending message.
   */
  sendMessageToMultipleContacts(message: MessageToContact) {
    return new Promise<string[] | null>((resolve, reject) => {
      return this.executor.exec(
        'sendMessageToMultipleContacts',
        {
          messageToContact: {
            ...message,
            bannerMessage: trimBannerText(message.bannerMessage),
          },
        },
        contactIds => {
          if (contactIds !== 'null' && contactIds !== null) {
            resolve(JSON.parse(contactIds) as string[]);
          } else {
            resolve(null);
          }
        },
        error => reject(error)
      );
    });
  }

  /**
   * Associating get point balance function to MiniAppBridge object.
   * (provided rakuten.miniapp.user.POINTS is allowed by the user)
   */
  getPoints() {
    return new Promise<Points>((resolve, reject) => {
      return this.executor.exec(
        'getPoints',
        null,
        points => resolve(JSON.parse(points) as Points),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  getHostEnvironmentInfo(): Promise<HostEnvironmentInfo> {
    return new Promise<HostEnvironmentInfo>((resolve, reject) => {
      return this.executor.exec(
        'getHostEnvironmentInfo',
        null,
        info =>
          resolve({
            ...JSON.parse(info),
            platform: this.platform,
          } as HostEnvironmentInfo),
        error => reject(error)
      );
    });
  }

  downloadFile(
    filename: string,
    url: string,
    headers: DownloadFileHeaders
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'downloadFile',
        { filename, url, headers },
        id => {
          if (id !== 'null' && id !== null) {
            resolve(id);
          } else {
            resolve(null);
          }
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  setSecureStorage(items: MiniAppSecureStorageKeyValues) {
    return new Promise<undefined>((resolve, reject) => {
      return this.executor.exec(
        'setSecureStorageItems',
        { secureStorageItems: items },
        success => resolve(undefined),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  getSecureStorageItem(key: string) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'getSecureStorageItem',
        { secureStorageKey: key },
        responseData => resolve(responseData),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  removeSecureStorageItems(keys: [string]) {
    return new Promise<undefined>((resolve, reject) => {
      return this.executor.exec(
        'removeSecureStorageItems',
        { secureStorageKeyList: keys },
        success => resolve(undefined),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  clearSecureStorage() {
    return new Promise<undefined>((resolve, reject) => {
      return this.executor.exec(
        'clearSecureStorage',
        null,
        success => resolve(undefined),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  getSecureStorageSize() {
    return new Promise<MiniAppSecureStorageSize>((resolve, reject) => {
      return this.executor.exec(
        'getSecureStorageSize',
        null,
        responseData => {
          resolve(JSON.parse(responseData) as MiniAppSecureStorageSize);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * @param alertInfo Close confirmation alert info.
   * @see {setCloseAlert}
   */
  setCloseAlert(alertInfo: CloseAlertInfo) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'setCloseAlert',
        { closeAlertInfo: alertInfo },
        success => resolve(success),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Associating sendJsonToHostapp function to MiniAppBridge object.
   * @param {info} JSON/String information that you would like to send to HostApp.
   * @see {sendJsonToHostapp}
   */
  sendJsonToHostapp(info: string) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'sendJsonToHostapp',
        { jsonInfo: info },
        success => resolve(success),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Associating sendInfoToHostapp function to MiniAppBridge object.
   * @param {info} UniversalBridgeInfo information that you would like to send to HostApp.
   * @see {sendInfoToHostapp}
   */
  sendInfoToHostapp(info: UniversalBridgeInfo) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'sendInfoToHostapp',
        { universalBridgeInfo: info },
        success => resolve(success),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Associating closeMiniApp function to MiniAppBridge object.
   * @param {withConfirmation} boolean value which will be used by the host app to show/hide close confirmation alert
   * which should be set using `setCloseAlert` method in prior before calling this interface
   * @see {closeMiniApp}
   */
  closeMiniApp(withConfirmation: boolean) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'closeMiniApp',
        { withConfirmationAlert: withConfirmation },
        success => resolve(success),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Associating miniAppFinishedLoading function to MiniAppBridge object.
   * @returns Promise resolve with string
   * Host app can implement an interface miniAppFinishedLoading to perform any operations after the miniapp is loaded.
   */
  miniAppFinishedLoading() {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'miniAppFinishedLoading',
        null,
        success => resolve(success),
        error => reject(error)
      );
    });
  }

  /**
   * This will retrieve the list of products details available for In-App Purchases associated with Mini App in the Platform.
   * @returns List of In-app purchase products
   * @see {getAllProducts}
   */
  getAllProducts() {
    return new Promise<ProductInfo[]>((resolve, reject) => {
      return this.executor.exec(
        'getAllProducts',
        null,
        productsList => {
          resolve(JSON.parse(productsList) as ProductInfo[]);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * This will request for the In-App Purchase of a product with product id associated with Mini App in the Platform.
   * @param id Product id of the product to be purchased.
   * @returns Purchased product details and the transaction details of the purchase.
   */
  purchaseProductWith(id: string) {
    return new Promise<PurchasedProductInfo>((resolve, reject) => {
      return this.executor.exec(
        'purchaseProductWith',
        { productId: id },
        purchasedProduct => {
          resolve(JSON.parse(purchasedProduct) as PurchasedProductInfo);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * This will request to Consume the product that is purchased using consumePurchaseWith API
   * @param id Product id of the product that is purchased.
   * @returns
   */
  consumePurchaseWith(id: string, transactionId: string) {
    return new Promise<MiniAppResponseInfo>((resolve, reject) => {
      return this.executor.exec(
        'consumeProductWith',
        { productId: id, productTransactionId: transactionId },
        consumedInfo => {
          resolve(JSON.parse(consumedInfo) as MiniAppResponseInfo);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  getHostAppThemeColors() {
    return new Promise<HostThemeColor>((resolve, reject) => {
      return this.executor.exec(
        'getHostAppThemeColors',
        null,
        response => {
          resolve(JSON.parse(response) as HostThemeColor);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  isDarkMode() {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'isDarkMode',
        null,
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  sendAnalytics(analytics: MAAnalyticsInfo) {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'sendAnalytics',
        { analyticsInfo: analytics },
        success => resolve(success),
        error => reject(parseMiniAppError(error))
      );
    });
  }

  getAllCookies() {
    return new Promise<[CookieInfo]>((resolve, reject) => {
      return this.executor.exec(
        'getAllCookies',
        null,
        response => {
          resolve(JSON.parse(response) as [CookieInfo]);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  getCookies(cookieNameList: string[]) {
    return new Promise<[CookieInfo]>((resolve, reject) => {
      return this.executor.exec(
        'getCookies',
        { cookieList: cookieNameList },
        response => {
          resolve(JSON.parse(response) as [CookieInfo]);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  shouldClearNotifications(notificationType: NotificationInfoType) {
    this.notificationBridge.shouldClearNotifications(notificationType);
  }

  shouldUpdateBadgeNumber(notificationInfo: NotificationInfo) {
    this.notificationBridge.shouldUpdateBadgeNumber(notificationInfo);
  }

  shouldUpdateNotificationInfo(
    notificationDetailedInfo: NotificationDetailedInfo
  ) {
    this.notificationBridge.shouldUpdateNotificationInfo(
      notificationDetailedInfo
    );
  }

  set(key: string, value: string) {
    return this.preferences.set(key, value);
  }

  get(key: string) {
    return this.preferences.get(key);
  }

  remove(key: string) {
    return this.preferences.remove(key);
  }

  clearMiniAppPreferences() {
    return this.preferences.clearMiniAppPreferences();
  }

  /**
   * This interface will get you the list of all features that is supported by the SDK and Host application
   * @returns List of features for eg., ["GET_UNIQUE_ID", "GET_USERNAME", "GET_PROFILE_PHOTO", "IS_DARK_MODE"]
   */
  getFeatureList() {
    return new Promise<string[]>((resolve, reject) => {
      return this.executor.exec(
        'getFeatureList',
        null,
        response => {
          resolve(JSON.parse(response) as string[]);
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }
  /**
   * Associating getPhoneNumber function to MiniAppBridge object.
   * This function returns phone number of the User
   */
  getPhoneNumber() {
    return new Promise<string>((resolve, reject) => {
      return this.executor.exec(
        'getPhoneNumber',
        null,
        phoneNumber => resolve(phoneNumber),
        error => reject(error)
      );
    });
  }

  /**
   * This interface checks if the device contains/has the deeplink to launch
   * @param deeplinkURL Deeplink URL that you wanted to check if the device can launch
   * @returns true if device can find the deeplink available to launch
   */
  canOpenAppDeeplink(url: string) {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'canOpenAppDeeplink',
        { deeplinkURL: url },
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(error)
      );
    });
  }

  /**
   * This interface checks if the application supports launching the Deeplink URL,
   * sometimes application has whitelist URL, so this interface helps to check it.
   * @param deeplinkURL Deeplink URL that you wanted to check if the device can launch
   * @returns true if device can find the deeplink available to launch
   */
  isAppDeeplinkSupported(url: string) {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'isAppDeeplinkSupported',
        { deeplinkURL: url },
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(error)
      );
    });
  }

  /**
   * This interface helps you to launch URL in External browser
   * @returns true if browser is launched
   */
  launchExternalBrowser(url: string) {
    return this.browserManager.launchExternalBrowser(url);
  }

  /**
   * This interface helps you to launch URL in Internal browser.
   * You can pass either a string URL or a LaunchBrowserOptions object to specify
   * HTTP method, body, audience, and scopes.
   * @param urlOrParams The URL string or LaunchBrowserOptions object.
   * @returns true if browser is launched
   */
  launchInternalBrowser(urlOrParams: string | LaunchBrowserOptions) {
    return this.browserManager.launchInternalBrowser(urlOrParams);
  }

  /**
   * This interface helps you to launch Gallery and user can pick a photo
   * from the library and same will be returned to MiniApp
   * @returns path of the image which is selected by user
   */
  getImageFromGallery() {
    return this.galleryManager.getImageFromGallery();
  }

  /**
   * This interface is used to know if the user login status
   * @returns true/false based on the user profile status
   */
  isLoggedIn() {
    return this.userProfileManager.isLoggedIn();
  }

  allowBackForwardNavigationGestures(shouldAllow: boolean) {
    return this.webviewConfigManager.allowBackForwardNavigationGestures(
      shouldAllow
    );
  }

  forceInternalWebView(enable: boolean) {
    return this.webviewConfigManager.forceInternalWebView(enable);
  }

  /**
   * Triggers the login UI for the user.
   * @returns - A promise that resolves when the login UI is triggered.
   */
  triggerLoginUI() {
    return this.userProfileManager.triggerLoginUI();
  }

  /**
   * Logs an event with the specified message and log level.
   * @param {string} logMessage - The log message to be sent.
   * @param {LogType} logLevel - The log level (debug, info, error).
   * @returns {Promise<boolean>} - A promise that resolves to true if the log was successfully sent, otherwise rejects with an error.
   */
  logEvent(logMessage: string, logLevel: LogType) {
    return this.utilityManager.logEvent(logMessage, logLevel);
  }

  /**
   * This interface checks if the device supports esim
   * @returns true if device supports esim
   */
  isEsimSupported() {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'isEsimSupported',
        null,
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * This interface sends an esimconfiguration object for caller to setup esim
   * @param config Esim configuration values
   * @returns true if device is able to setup and install esim
   */
  setupAndInstallEsim(config: EsimConfig) {
    return new Promise<boolean>((resolve, reject) => {
      return this.executor.exec(
        'setupAndInstallEsim',
        { eSimConfig: config },
        response => {
          resolve(MiniAppBridgeUtils.BooleanValue(response));
        },
        error => reject(parseMiniAppError(error))
      );
    });
  }

  /**
   * Launches the app using the provided deeplink URL.
   *
   * @param url - The deeplink URL to open the app.
   * @returns The result of the deeplink launch operation.
   */
  launchAppUsingDeeplink(url: string) {
    return this.utilityManager.launchAppUsingDeeplink(url);
  }

  /**
   * Launches an application on the device using its package name. This method is useful for Android devices where applications can be launched using their unique package names.
   *
   * @param packageName - The unique package name of the application to launch.
   * @returns A promise or result from the underlying utility manager indicating the success or failure of the launch operation.
   */
  launchAppUsingPackageName(packageName: string) {
    return this.utilityManager.launchAppUsingPackageName(packageName);
  }
}

/**
 * Method to remove the callback object from the message queue after successful/error communication
 * with the native application
 * @param  {[Object]} queueObj Queue Object that holds the references of callback information.
 * @internal
 */
function removeFromMessageQueue(queueObj) {
  const messageObjIndex = mabMessageQueue.indexOf(queueObj);
  if (messageObjIndex !== -1) {
    mabMessageQueue.splice(messageObjIndex, 1);
  }
}

function removeFromEventQueue(queueObj) {
  const eventObjIndex = mabCustomEventQueue.indexOf(
    mabCustomEventQueue.filter(
      customEvent => customEvent.type === queueObj.type
    )[0]
  );
  if (eventObjIndex !== -1) {
    mabCustomEventQueue.splice(eventObjIndex, 1);
  }
}

function removeFromKeyboardEventQueue(queueObj) {
  const eventObjIndex = mabKeyboardEventQueue.indexOf(
    mabKeyboardEventQueue.filter(
      customEvent => customEvent.type === queueObj.type
    )[0]
  );
  if (eventObjIndex !== -1) {
    mabKeyboardEventQueue.splice(eventObjIndex, 1);
  }
}

function trimBannerText(message: string = null, maxLength = 128) {
  return message?.length > maxLength
    ? message?.substring(0, maxLength - 1) + '…'
    : message;
}

const parseIntOctal = octalCode => {
  return Number.parseInt(octalCode, 8);
};

const decodeOctalEscape = input =>
  input.replace(/\\(\d{3})/g, (match, octalCode) => {
    return String.fromCharCode(parseIntOctal(octalCode));
  });

function convertUnicodeCharacters(value) {
  //This will decode the message string that is sent from Native
  const decoded = Buffer.from(value, 'base64').toString('utf8');
  //Few characters like currency, etc., is not decoded properly,
  // We use following method to decoded it.
  const octalString = decodeOctalEscape(decoded);
  const stringifyMessage = JSON.stringify(octalString);
  const replaced = stringifyMessage.replace(/\\\\/g, '\\');
  if (isValidJson(replaced) === true) {
    return JSON.parse(replaced);
  } else {
    return JSON.parse(stringifyMessage);
  }
}

function convertUnicodeCharactersForAndroid(value) {
  //This will decode the message string that is sent from Native
  const decoded = Buffer.from(value, 'base64').toString('utf8');
  const stringifyMessage = JSON.stringify(decoded);
  const replaced = stringifyMessage.replace(/\\\\/g, '\\');
  if (isValidJson(stringifyMessage) === true) {
    return JSON.parse(stringifyMessage);
  } else {
    return JSON.parse(replaced);
  }
}

function isValidJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export class MiniAppBridgeUtils {
  static BooleanValue(value) {
    if (typeof value === 'boolean') {
      return value;
    } else if (typeof value === 'string') {
      const lowerCaseValue = value.toLowerCase();
      if (lowerCaseValue === 'true' || lowerCaseValue === '1') {
        return true;
      } else if (lowerCaseValue === 'false' || lowerCaseValue === '0') {
        return false;
      }
    }
    return false;
  }
}

/**
 * @description Math.random is a security risk, crypto is used to generate strong pseudo numbers
 * @returns random float number
 */
export function cryptoRandom() {
  const buffer = crypto.randomBytes(4); // Generate 4 random bytes
  const value = buffer.readUInt32LE(0);
  return value / 0xffffffff;
}
