/** @internal */

/**
 * Bridge for communicating with Mini App
 */

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
import {
  MiniAppSecureStorageEvents,
  MiniAppSecureStorageKeyValues,
  MiniAppSecureStorageSize,
} from './types/secure-storage';
import { ShareInfoType } from './types/share-info';
import { AccessTokenData, NativeTokenData } from './types/token-data';
import { MiniAppError, parseMiniAppError } from './types/error-types';

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

  constructor(executor: PlatformExecutor) {
    this.executor = executor;
    this.platform = executor.getPlatform();

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
    const event = new CustomEvent(eventType, {
      detail: { message: value },
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
        'getUniqueId',
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
  shareInfo(info: ShareInfoType) {
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
        userName => resolve(userName),
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
  getContacts() {
    return new Promise<Contact[]>((resolve, reject) => {
      return this.executor.exec(
        'getContacts',
        null,
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
