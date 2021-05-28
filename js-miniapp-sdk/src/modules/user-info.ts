import { AccessTokenData, Contact } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../utils';
import {
  AudienceNotSupportedError,
  AuthorizationFailureError,
  MiniAppError,
  MiniAppErrorType,
  parseMiniAppError,
  ScopesNotSupportedError,
} from '../miniapp-error-type';

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
    return getBridge().getContacts();
  }

  getAccessToken(
    audience: string,
    scopes: string[]
  ): Promise<AccessTokenData | MiniAppError> {
    return getBridge()
      .getAccessToken(audience, scopes)
      .catch(error => {
        try {
          const miniAppError = parseMiniAppError(error);
          const errorType: MiniAppErrorType =
            MiniAppErrorType[
              miniAppError.type as keyof typeof MiniAppErrorType
            ];
          switch (errorType) {
            case MiniAppErrorType.AuthorizationFailureError:
              return Promise.reject(
                new AuthorizationFailureError(miniAppError)
              );
            case MiniAppErrorType.AudienceNotSupportedError:
              return Promise.reject(
                new AudienceNotSupportedError(miniAppError)
              );
            case MiniAppErrorType.ScopesNotSupportedError:
              return Promise.reject(new ScopesNotSupportedError(miniAppError));
            default:
              return Promise.reject(new MiniAppError(miniAppError));
          }
        } catch (e) {
          return Promise.reject(MiniAppError.fromCustomString(error));
        }
      });
  }
}
