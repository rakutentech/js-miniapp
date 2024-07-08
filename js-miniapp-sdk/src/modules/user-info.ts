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
}

/** @internal */
export class UserInfo implements UserInfoProvider {
  getUserName(): Promise<string> {
    return getBridge().getUserName();
  }

  getProfilePhoto(): Promise<string> {
    return getBridge().getProfilePhoto();
  }

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

  getAccessToken(audience: string, scopes: string[]): Promise<AccessTokenData> {
    return getBridge().getAccessToken(audience, scopes);
  }

  getPoints() {
    return getBridge().getPoints();
  }

  getPhoneNumber(): Promise<string> {
    return getBridge().getPhoneNumber();
  }
}
