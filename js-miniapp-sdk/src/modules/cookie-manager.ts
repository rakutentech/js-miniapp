import { CookieInfo } from '../../../js-miniapp-bridge/src';
import { getBridge } from '../sdkbridge';

/**
 * Interfaces to retrieve Cookies from Host app
 */
export interface CookieProvider {
  /**
   * Fetches all cookies from host app.
   * @returns List of Cookies with name and value details
   */
  getAllCookies(): Promise<[CookieInfo]>;

  /**
   * Fetches the cookies for the provided name list
   * @returns List of Cookies with name and value details
   */
  getCookies(cookieNameList: string[]): Promise<[CookieInfo]>;
}

/** @internal */
export class CookieManager implements CookieProvider {
  getAllCookies(): Promise<[CookieInfo]> {
    return getBridge().getAllCookies();
  }

  getCookies(cookieNameList: string[]): Promise<[CookieInfo]> {
    return getBridge().getCookies(cookieNameList);
  }
}
