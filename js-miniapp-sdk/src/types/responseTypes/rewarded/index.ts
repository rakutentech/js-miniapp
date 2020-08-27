import { AdTypes } from '../../adTypes';
/**
 * Rewarded ad type response from native SDK
 */
export interface RewardedAdResponse {
  amount?: number;
  adType: AdTypes.REWARDED;
}
