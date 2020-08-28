import { AdTypes } from '../../adTypes';
/**
 * A contract declaring the interaction mechanism between Rewarded ad type response from native SDK
 */
export interface RewardedAdResponse {
  amount?: number;
  adType: AdTypes.REWARDED;
}
