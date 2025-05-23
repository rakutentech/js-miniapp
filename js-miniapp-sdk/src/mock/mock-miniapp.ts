import {
  AccessTokenData,
  Contact,
  CookieInfo,
  HostEnvironmentInfo,
  HostThemeColor,
  MiniAppSecureStorageSize,
  Platform,
  ProductInfo,
  PurchasedProductInfo,
  Reward,
} from '../../../js-miniapp-bridge/src';
import { CustomPermissionResponse } from '../../../js-miniapp-bridge/src/types/custom-permissions';
import { MiniAppResponseInfo } from '../../../js-miniapp-bridge/src/types/response-types/miniapp';
import { GalleryFileInfo } from '../../../js-miniapp-bridge/src/types/share-info';

export interface MockMiniAppData {
  isMockEnabled: boolean;
  platform?: Platform.ANDROID | Platform.IOS;
  token?: AccessTokenData;
  hostEnvInfo?: HostEnvironmentInfo;
  allCookies?: [CookieInfo];
  cookies?: [CookieInfo];
  features?: string[];
  userName?: string;
  profilePic?: string;
  phoneNo?: string;
  uniqueId?: string;
  messagingUniqueId?: string;
  mauid?: string;
  permissionInfo?: CustomPermissionResponse;
  rewardAdResponse?: Reward;
  contactId?: string;
  points?: string;
  fileDowloadId?: string;
  secureStorageItem?: string;
  secureStorageSize?: MiniAppSecureStorageSize;
  contacts?: Contact[];
  isLoggedIn?: boolean;
  miniAppFinishedLoading?: string;
  closeMiniApp?: boolean;
  productsList?: ProductInfo[];
  productInfo?: PurchasedProductInfo;
  consumedPurchaseInfo?: MiniAppResponseInfo;
  themeColor?: HostThemeColor;
  isDarkMode?: boolean;
  openAppDeeplink?: boolean;
  launchExternalBrowser?: string;
  launchInternalBrowser?: string;
  launchGallery?: string;
  preference?: string;
  requestPermission?: boolean;
  requestLocationPermission?: boolean;
  loadInterstitialAd?: boolean;
  showInterstitialAd?: boolean;
  loadRewardedAd?: boolean;
  shareInfo?: boolean;
  setScreenOrientation?: boolean;
  setCloseAlert?: boolean;
  sendJsonToHostapp?: boolean;
  sendInfoToHostapp?: boolean;
  sendAnalytics?: boolean;
  shouldClearNotifications?: boolean;
  shouldUpdateBadgeNumber?: boolean;
  shouldUpdateNotificationInfo?: boolean;
  setPreferences?: boolean;
  getPreferences?: boolean;
  removePreferences?: boolean;
  clearMiniAppPreferences?: boolean;
  getImageFromGallery?: GalleryFileInfo;
  exchangeToken?: AccessTokenData;
  logEvent?: boolean;
  allowBackForwardNavigationGestures?: boolean;
  isEsimSupported?: boolean;
  setupAndInstallEsim?: boolean;
}
