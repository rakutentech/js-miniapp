import { AdTypes } from '../../adTypes';
import { AdResponse } from '../AdResponse';
/**
 * Intterstitial ad type response from native sdk
 */
interface InterStitial {
  adType: AdTypes.INTERSTITIAL;
}
export type InterstitialAdResponse = AdResponse & InterStitial;
