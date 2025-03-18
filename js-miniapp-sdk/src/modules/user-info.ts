import {
  AccessTokenData,
  Contact,
  MiniAppError,
  Points,
} from '../../../js-miniapp-bridge/src';
import { getBridge } from '../sdkbridge';
import { DecodeManager } from './decoder';

/**
 * Interfaces to retrieve User profile related information.
 */
export interface UserInfoProvider {
  /**
   * Fetches the username from host app.
   * You should request the {@link CustomPermissionName.USER_NAME} permission before using this method.
   * @returns Username saved in the host app user profile.
   */
  getUserName(): Promise<string>;

  /**
   * Fetches the profile photo URI from host app.
   * You should request the {@link CustomPermissionName.PROFILE_PHOTO} permission before using this method.
   * @returns Profile photo saved in the host app user profile.
   */
  getProfilePhoto(): Promise<string>;

  /**
   * Fetches the contact list from host app.
   * You should request the {@link CustomPermissionName.CONTACT_LIST} permission before using this method.
   * @returns Contact list in the host app user profile.
   */
  getContacts(): Promise<Contact[]>;

  /**
   * Fetches the access token from host app.
   * @param audience one of the audiences provided in MiniApp manifest
   * @param scopes scopes array associated to the audience
   * @returns Access token from native host app.
   */
  getAccessToken(
    audience: string,
    scopes: string[]
  ): Promise<AccessTokenData | MiniAppError>;

  /**
   * Fetches the points from host app.
   * @returns Points from native host app.
   */
  getPoints(): Promise<Points>;

  /**
   * Fetches the Phone number of the user.
   * @returns Phone number saved in the host app user profile.
   */
  getPhoneNumber(): Promise<string>;

  /**
   * Fetches the current login status of the user
   */
  isLoggedIn(): Promise<boolean>;

  /**
   * Triggers the login UI in the host app.
   * @returns A promise that resolves to true if the login was successful, false otherwise.
   */
  triggerLoginUI(): Promise<boolean | MiniAppError>;

  /**
   * Send a signal to native application to force a logout
   * @returns true if logout is successful
   */
  forceLogout(): Promise<boolean>;

  /**
   * Fetches the exchange token from host app.
   * @param audience one of the audiences provided in MiniApp manifest
   * @param scopes scopes array associated to the audience
   * @returns Exchange token from native host app.
   */
  getExchangeToken(
    audience: string,
    scopes: string[]
  ): Promise<AccessTokenData | MiniAppError>;
}

/** @internal */
export class UserInfo implements UserInfoProvider {
  /**
   * Fetches the username from host app.
   * You should request the {@link CustomPermissionName.USER_NAME} permission before using this method.
   * @returns Username saved in the host app user profile.
   */
  getUserName(): Promise<string> {
    return getBridge().getUserName();
  }

  /**
   * Fetches the profile photo URI from host app.
   * You should request the {@link CustomPermissionName.PROFILE_PHOTO} permission before using this method.
   * @returns Profile photo saved in the host app user profile.
   */
  getProfilePhoto(): Promise<string> {
    return getBridge().getProfilePhoto();
  }

  /**
   * Fetches the contact list from host app.
   * You should request the {@link CustomPermissionName.CONTACT_LIST} permission before using this method.
   * @returns Contact list in the host app user profile.
   */
  getContacts(): Promise<Contact[]> {
    if (getBridge().getContacts.length > 0) {
      return getBridge()
        .getContacts(true)
        .then(contactList => {
          const decoder = new DecodeManager();
          return decoder.decodeContacts(contactList);
        })
        .catch(error => {
          console.error(`Error retrieving contacts: ${error.message}`);
          return [];
        });
    } else {
      return getBridge().getContacts();
    }
  }

  /**
   * Fetches the access token from host app.
   * @param audience one of the audiences provided in MiniApp manifest
   * @param scopes scopes array associated to the audience
   * @returns Access token from native host app.
   */
  getAccessToken(
    audience: string,
    scopes: string[]
  ): Promise<AccessTokenData | MiniAppError> {
    return getBridge().getAccessToken(audience, scopes);
  }

  /**
   * Fetches the points from host app.
   * @returns Points from native host app.
   */
  getPoints() {
    return getBridge().getPoints();
  }

  /**
   * Fetches the Phone number of the user.
   * @returns Phone number saved in the host app user profile.
   */
  getPhoneNumber(): Promise<string> {
    return getBridge().getPhoneNumber();
  }

  /**
   * Fetches the current login status of the user
   */
  isLoggedIn(): Promise<boolean> {
    return getBridge().userProfileManager.isLoggedIn();
  }

  /**
   * Triggers the login UI in the host app.
   * @returns A promise that resolves to true if the login was successful, false otherwise.
   */
  triggerLoginUI(): Promise<boolean | MiniAppError> {
    return getBridge().userProfileManager.triggerLoginUI();
  }

  /**
   * Send a signal to native application to force a logout
   * @returns true if logout is successful
   */
  forceLogout(): Promise<boolean> {
    return getBridge().userProfileManager.forceLogout();
  }

  /**
   * Fetches the exchange token from host app.
   * @param audience one of the audiences provided in MiniApp manifest
   * @param scopes scopes array associated to the audience
   * @returns Exchange token from native host app.
   */
  getExchangeToken(
    audience: string,
    scopes: string[]
  ): Promise<AccessTokenData | MiniAppError> {
    return getBridge().getExchangeToken(audience, scopes);
  }
}
