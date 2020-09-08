/** @internal */

/**
 * Main entry point for SDK
 */

import { MiniApp } from './miniapp';
import { AdTypes } from './types/adTypes';
import {
  InterstitialAdResponse,
  RewardedAdResponse,
} from './types/responseTypes';

/** @internal */
const miniAppInstance = new MiniApp();

export { miniAppInstance, AdTypes, RewardedAdResponse, InterstitialAdResponse };
