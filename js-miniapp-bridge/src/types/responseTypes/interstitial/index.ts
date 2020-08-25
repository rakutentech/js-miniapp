import { AdTypes } from '../../adTypes';
import { AdResponse } from '../AdResponse';
/**
 * Intterstitial ad type response from native sdk
 */
export interface InterstitialAdResponse extends AdResponse {
  adType: AdTypes.INTERSTITIAL;
}
