import { InterstitialAdResponse } from './types/responseTypes/interstitial';
import { MiniAppPermissionType } from './MiniAppPermissionType';
import { RewardedAdResponse } from './types/responseTypes/rewarded';
/**
 * A module layer for webapps and mobile native interaction.
 */
interface MiniApp {
  /** @returns The Promise of provided id of mini app from injected side. */
  getUniqueId(): Promise<string>;
  /** @returns The Promise of permission result of mini app from injected side. */
  requestLocationPermission(): Promise<string>;
}

/**
 * A contract declaring the interaction mechanism between mini-apps and native host app to display ads.
 */
interface Ad {
  /** @returns The Promise of interstitial ad response result from injected side. */
  showInterstitialAd(): Promise<InterstitialAdResponse>;
  /**
   * Requests bridge to show a Rewarded Ad.
   * Promise is resolved with an object after the user closes the Ad.
   * The object contains the reward earned by the user.
   * Reward amount will be null if the user did not earn the reward.
   * Promise is rejected if the Ad failed to load.
   */
  showRewardedAd(): Promise<RewardedAdResponse>;
}

/** @internal */
/* tslint:disable:no-any */
export class MiniAppImp implements MiniApp, Ad {
  private requestPermission(permissionType: string): Promise<string> {
    return (window as any).MiniAppBridge.requestPermission(permissionType);
  }

  getUniqueId(): Promise<string> {
    return (window as any).MiniAppBridge.getUniqueId();
  }

  requestLocationPermission(): Promise<string> {
    return this.requestPermission(MiniAppPermissionType.LOCATION);
  }

  showInterstitialAd(): Promise<InterstitialAdResponse> {
    return (window as any).MiniAppBridge.showInterstitialAd();
  }

  showRewardedAd(): Promise<RewardedAdResponse> {
    return (window as any).MiniAppBridge.showRewardedAd();
  }
}
