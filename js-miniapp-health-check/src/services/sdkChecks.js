import MiniApp, {
  MAAnalyticsEventType,
  MAAnalyticsActionType,
  MAAnalyticsConfig,
  LogType,
  ScreenOrientation,
  CustomPermissionName,
  CustomPermissionStatus,
} from 'js-miniapp-sdk';

export const CATEGORY = {
  CORE: 'Core',
  USER: 'User Info',
  UTILS: 'Utilities',
  STORAGE: 'Storage',
  DEVICE: 'Device & Permissions',
  WEBVIEW: 'WebView',
  MESSAGING: 'Messaging',
  ANALYTICS: 'Analytics',
};

export const CHECK_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  SUCCESS: 'success',
  FAILURE: 'failure',
  SKIPPED: 'skipped',
};

/**
 * SDK_CHECKS — master list of all SDK interfaces.
 *
 * Auto-testable checks have:
 *   run()  async fn → { result: string }  (throws on failure)
 *
 * Non-auto-testable checks have:
 *   reason         why it can't be auto-tested
 *   manualConfig   { fields[], run(values) }  for the Detail page trigger UI
 *     fields[]     { id, label, defaultValue, type:'text'|'multiline'|'select', options[] }
 *     run(values)  async fn → { result: string }  (throws on failure)
 */
export const SDK_CHECKS = [

  // ─── CORE ─────────────────────────────────────────────────────────────────
  {
    id: 'getPlatform',
    name: 'getPlatform()',
    category: CATEGORY.CORE,
    description: 'Synchronously returns the current host platform ("Android", "iOS", or "Unknown").',
    isAutoTestable: true,
    run: async () => {
      const result = MiniApp.getPlatform();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'getMessagingUniqueId',
    name: 'getMessagingUniqueId()',
    category: CATEGORY.CORE,
    description: 'Gets a unique identifier for the current user, intended for messaging features.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.getMessagingUniqueId();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'getMauid',
    name: 'getMauid()',
    category: CATEGORY.CORE,
    description: 'Gets the MAUID (Mobile Advertising User ID) for the current user.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.getMauid();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'getHostEnvironmentInfo',
    name: 'getHostEnvironmentInfo()',
    category: CATEGORY.CORE,
    description: 'Gets metadata about the host app environment (OS, SDK version, app details).',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.getHostEnvironmentInfo();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'getPoints',
    name: 'getPoints()',
    category: CATEGORY.CORE,
    description: 'Gets the Rakuten point balance for the user.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.getPoints();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'shareInfo',
    name: 'shareInfo()',
    category: CATEGORY.CORE,
    description: 'Opens the host app native share dialog with the provided content.',
    isAutoTestable: false,
    reason: 'Would open the native share dialog, requiring user interaction.',
    manualConfig: {
      fields: [
        { id: 'content', label: 'Content', defaultValue: 'Check out this MiniApp!', type: 'text' },
        { id: 'url', label: 'URL (optional)', defaultValue: 'https://miniapp.example.com', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.shareInfo({ content: v.content, url: v.url || undefined });
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'setScreenOrientation',
    name: 'setScreenOrientation()',
    category: CATEGORY.CORE,
    description: 'Locks or releases the screen orientation.',
    isAutoTestable: false,
    reason: 'Would change the device screen orientation.',
    manualConfig: {
      fields: [
        {
          id: 'orientation',
          label: 'Orientation',
          defaultValue: ScreenOrientation.LOCK_PORTRAIT,
          type: 'select',
          options: [
            { value: ScreenOrientation.LOCK_PORTRAIT, label: 'Lock Portrait' },
            { value: ScreenOrientation.LOCK_LANDSCAPE, label: 'Lock Landscape' },
            { value: ScreenOrientation.LOCK_RELEASE, label: 'Release Lock' },
          ],
        },
      ],
      run: async (v) => {
        const result = await MiniApp.setScreenOrientation(v.orientation);
        return { result: JSON.stringify(result) };
      },
    },
  },

  // ─── USER INFO ────────────────────────────────────────────────────────────
  {
    id: 'user_isLoggedIn',
    name: 'user.isLoggedIn()',
    category: CATEGORY.USER,
    description: 'Checks whether the user is currently logged in to the host app.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.user.isLoggedIn();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'user_getUserName',
    name: 'user.getUserName()',
    category: CATEGORY.USER,
    description: 'Gets the display name of the currently logged-in user.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.user.getUserName();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'user_getProfilePhoto',
    name: 'user.getProfilePhoto()',
    category: CATEGORY.USER,
    description: 'Gets the profile photo URL of the currently logged-in user.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.user.getProfilePhoto();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'user_getContacts',
    name: 'user.getContacts()',
    category: CATEGORY.USER,
    description: 'Gets the contact list for the currently logged-in user.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.user.getContacts();
      if (Array.isArray(result) && result.length === 0) {
        throw new Error('Returned empty array — contact permission may not be granted');
      }
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'user_getPoints',
    name: 'user.getPoints()',
    category: CATEGORY.USER,
    description: 'Gets the Rakuten point balance via the user service.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.user.getPoints();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'user_getPhoneNumber',
    name: 'user.getPhoneNumber()',
    category: CATEGORY.USER,
    description: 'Gets the phone number of the currently logged-in user.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.user.getPhoneNumber();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'user_getAccessToken',
    name: 'user.getAccessToken()',
    category: CATEGORY.USER,
    description: 'Gets an OAuth access token for the given audience and scopes.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.user.getAccessToken('rae', ['idinfo_read_openid']);
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'user_getExchangeToken',
    name: 'user.getExchangeToken()',
    category: CATEGORY.USER,
    description: 'Gets an exchange token for the given audience and scopes.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.user.getExchangeToken('rae', ['idinfo_read_openid']);
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'user_triggerLoginUI',
    name: 'user.triggerLoginUI()',
    category: CATEGORY.USER,
    description: 'Opens the host app login UI.',
    isAutoTestable: false,
    reason: 'Would open the host app login UI, requiring user interaction.',
    manualConfig: {
      fields: [],
      run: async () => {
        const result = await MiniApp.user.triggerLoginUI();
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'user_forceLogout',
    name: 'user.forceLogout()',
    category: CATEGORY.USER,
    description: 'Forces the user to log out from the host app.',
    isAutoTestable: false,
    reason: 'Destructive — would immediately log the user out of the host app.',
    manualConfig: {
      fields: [],
      warning: 'This will log you out of the host app immediately.',
      run: async () => {
        const result = await MiniApp.user.forceLogout();
        return { result: JSON.stringify(result) };
      },
    },
  },

  // ─── UTILITIES ────────────────────────────────────────────────────────────
  {
    id: 'utils_miniAppFinishedLoading',
    name: 'miniappUtils.miniAppFinishedLoading()',
    category: CATEGORY.UTILS,
    description: 'Notifies the host app that the MiniApp has finished its initial load.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.miniappUtils.miniAppFinishedLoading();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'utils_getHostAppThemeColors',
    name: 'miniappUtils.getHostAppThemeColors()',
    category: CATEGORY.UTILS,
    description: 'Gets the primary and secondary color values from the host app theme.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.miniappUtils.getHostAppThemeColors();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'utils_isDarkMode',
    name: 'miniappUtils.isDarkMode()',
    category: CATEGORY.UTILS,
    description: 'Checks whether the host app is currently in dark mode.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.miniappUtils.isDarkMode();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'utils_getFeatureList',
    name: 'miniappUtils.getFeatureList()',
    category: CATEGORY.UTILS,
    description: 'Gets the list of SDK feature flags supported by the current host app version.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.miniappUtils.getFeatureList();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'utils_canOpenAppDeeplink',
    name: 'miniappUtils.canOpenAppDeeplink()',
    category: CATEGORY.UTILS,
    description: 'Checks whether the host app can handle a given deep link URL.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.miniappUtils.canOpenAppDeeplink('https://example.com');
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'utils_isAppDeeplinkSupported',
    name: 'miniappUtils.isAppDeeplinkSupported()',
    category: CATEGORY.UTILS,
    description: 'Checks whether deep link support is available in the current host app.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.miniappUtils.isAppDeeplinkSupported('https://example.com');
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'utils_isAppInstalled',
    name: 'miniappUtils.isAppInstalledInDevice()',
    category: CATEGORY.UTILS,
    description: 'Checks whether a specific app is installed on the device.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.miniappUtils.isAppInstalledInDevice('com.example.healthcheck.test');
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'utils_setCloseAlert',
    name: 'miniappUtils.setCloseAlert()',
    category: CATEGORY.UTILS,
    description: 'Configures whether to show a confirmation dialog when the user closes the MiniApp.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.miniappUtils.setCloseAlert({ shouldDisplay: false, title: '', description: '' });
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'utils_closeMiniApp',
    name: 'miniappUtils.closeMiniApp()',
    category: CATEGORY.UTILS,
    description: 'Closes the MiniApp.',
    isAutoTestable: false,
    reason: 'Would immediately close this MiniApp and all results would be lost.',
    manualConfig: {
      fields: [],
      warning: '⚠ This will close the MiniApp immediately. All unsaved results will be lost.',
      run: async () => {
        const result = await MiniApp.miniappUtils.closeMiniApp(false);
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'utils_launchExternalBrowser',
    name: 'miniappUtils.launchExternalBrowser()',
    category: CATEGORY.UTILS,
    description: "Opens a URL in the device's default external browser.",
    isAutoTestable: false,
    reason: 'Would open an external browser, navigating the user away.',
    manualConfig: {
      fields: [
        { id: 'url', label: 'URL', defaultValue: 'https://www.google.com', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.miniappUtils.launchExternalBrowser(v.url);
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'utils_launchInternalBrowser',
    name: 'miniappUtils.launchInternalBrowser()',
    category: CATEGORY.UTILS,
    description: "Opens a URL in the host app's built-in browser.",
    isAutoTestable: false,
    reason: 'Would open an in-app browser view.',
    manualConfig: {
      fields: [
        { id: 'url', label: 'URL', defaultValue: 'https://www.google.com', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.miniappUtils.launchInternalBrowser(v.url);
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'utils_launchAppSettings',
    name: 'miniappUtils.launchAppSettings()',
    category: CATEGORY.UTILS,
    description: 'Opens the device app permission settings screen.',
    isAutoTestable: false,
    reason: 'Would navigate the user to the device settings screen.',
    manualConfig: {
      fields: [],
      run: async () => {
        const result = await MiniApp.miniappUtils.launchAppSettings();
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'utils_launchAppUsingDeeplink',
    name: 'miniappUtils.launchAppUsingDeeplink()',
    category: CATEGORY.UTILS,
    description: 'Launches another app using a deep link URL.',
    isAutoTestable: false,
    reason: 'Requires a valid deep link URL and would open another app.',
    manualConfig: {
      fields: [
        { id: 'url', label: 'Deep Link URL', defaultValue: 'https://example.com/deeplink', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.miniappUtils.launchAppUsingDeeplink(v.url);
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'utils_launchAppUsingPackageName',
    name: 'miniappUtils.launchAppUsingPackageName()',
    category: CATEGORY.UTILS,
    description: 'Launches another app using its package name (Android only).',
    isAutoTestable: false,
    reason: 'Requires a valid Android package name.',
    manualConfig: {
      fields: [
        { id: 'packageName', label: 'Package Name', defaultValue: 'com.example.app', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.miniappUtils.launchAppUsingPackageName(v.packageName);
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'utils_loadUsingHTMLString',
    name: 'miniappUtils.loadUsingHTMLString()',
    category: CATEGORY.UTILS,
    description: "Loads HTML content directly in the host app's web view.",
    isAutoTestable: false,
    reason: 'Would replace this page with the provided HTML content.',
    manualConfig: {
      fields: [
        { id: 'htmlString', label: 'HTML String', defaultValue: '<h1>Hello from MiniApp</h1>', type: 'multiline' },
        { id: 'callbackUrl', label: 'Callback URL', defaultValue: 'https://miniapp.example.com/callback', type: 'text' },
        { id: 'baseUrl', label: 'Base URL (optional)', defaultValue: '', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.miniappUtils.loadUsingHTMLString(
          v.htmlString,
          v.callbackUrl,
          v.baseUrl || undefined
        );
        return { result: JSON.stringify(result) };
      },
    },
  },

  // ─── ANALYTICS ────────────────────────────────────────────────────────────
  {
    id: 'analytics_sendAnalytics',
    name: 'miniappUtils.sendAnalytics()',
    category: CATEGORY.ANALYTICS,
    description: 'Sends an analytics event to the host app.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.miniappUtils.sendAnalytics({
        eventType: MAAnalyticsEventType.appear,
        actionType: MAAnalyticsActionType.open,
        pageName: 'HealthCheck',
        componentName: 'Dashboard',
        elementType: 'Screen',
        data: 'sdk_health_check_test',
      });
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'analytics_configureAnalytics',
    name: 'miniappUtils.configureAnalytics()',
    category: CATEGORY.ANALYTICS,
    description: 'Configures analytics with application ID, account ID, and SSC values.',
    isAutoTestable: false,
    reason: 'Requires valid application ID, account ID, and SSC from your analytics setup.',
    manualConfig: {
      fields: [
        { id: 'applicationId', label: 'Application ID', defaultValue: 'your-app-id', type: 'text' },
        { id: 'accountId', label: 'Account ID', defaultValue: 'your-account-id', type: 'text' },
        { id: 'ssc', label: 'SSC', defaultValue: 'your-ssc', type: 'text' },
        { id: 'customerId', label: 'Customer ID (optional)', defaultValue: '', type: 'text' },
      ],
      run: async (v) => {
        const config = new MAAnalyticsConfig();
        config.applicationId = v.applicationId;
        config.accountId = v.accountId;
        config.ssc = v.ssc;
        if (v.customerId) config.customerId = v.customerId;
        const result = await MiniApp.miniappUtils.configureAnalytics(config);
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'analytics_logEvent',
    name: 'miniappUtils.logEvent()',
    category: CATEGORY.ANALYTICS,
    description: 'Sends a log message with a specified log level to the host app.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.miniappUtils.logEvent('SDK Health Check: log event test', LogType.INFO);
      return { result: JSON.stringify(result) };
    },
  },

  // ─── STORAGE ─────────────────────────────────────────────────────────────
  {
    id: 'storage_secureStorageSize',
    name: 'secureStorageService.size()',
    category: CATEGORY.STORAGE,
    description: 'Gets the current used/max size of the secure storage.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.secureStorageService.size();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'storage_secureStorageSet',
    name: 'secureStorageService.setItems()',
    category: CATEGORY.STORAGE,
    description: 'Sets one or more key-value pairs in the secure storage.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.secureStorageService.setItems({ _health_check_key_: 'health_check_value' });
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'storage_secureStorageGet',
    name: 'secureStorageService.getItem()',
    category: CATEGORY.STORAGE,
    description: 'Gets a value from secure storage by its key.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.secureStorageService.getItem('_health_check_key_');
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'storage_secureStorageRemove',
    name: 'secureStorageService.removeItems()',
    category: CATEGORY.STORAGE,
    description: 'Removes one or more items from secure storage by key.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.secureStorageService.removeItems(['_health_check_key_']);
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'storage_secureStorageClear',
    name: 'secureStorageService.clear()',
    category: CATEGORY.STORAGE,
    description: 'Clears ALL items from secure storage.',
    isAutoTestable: false,
    reason: 'Destructive — would permanently delete all data from secure storage.',
    manualConfig: {
      fields: [],
      warning: 'This will permanently delete ALL data from secure storage.',
      run: async () => {
        const result = await MiniApp.secureStorageService.clear();
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'storage_cookiesGetAll',
    name: 'cookieManager.getAllCookies()',
    category: CATEGORY.STORAGE,
    description: 'Retrieves all cookies available to the MiniApp from the host.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.cookieManager.getAllCookies();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'storage_cookiesGet',
    name: 'cookieManager.getCookies()',
    category: CATEGORY.STORAGE,
    description: 'Retrieves cookies by a list of specified cookie names.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.cookieManager.getCookies(['_health_check_cookie_']);
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'storage_preferencesSet',
    name: 'preferences.set()',
    category: CATEGORY.STORAGE,
    description: 'Sets a persistent key-value preference for this MiniApp.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.preferences.set('_health_check_pref_', 'test_value');
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'storage_preferencesGet',
    name: 'preferences.get()',
    category: CATEGORY.STORAGE,
    description: 'Gets a MiniApp preference value by key.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.preferences.get('_health_check_pref_');
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'storage_preferencesRemove',
    name: 'preferences.remove()',
    category: CATEGORY.STORAGE,
    description: 'Removes a single MiniApp preference by key.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.preferences.remove('_health_check_pref_');
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'storage_preferencesClear',
    name: 'preferences.clearMiniAppPreferences()',
    category: CATEGORY.STORAGE,
    description: 'Clears ALL preferences stored for this MiniApp.',
    isAutoTestable: false,
    reason: 'Destructive — would permanently delete all stored MiniApp preferences.',
    manualConfig: {
      fields: [],
      warning: 'This will permanently delete ALL MiniApp preferences.',
      run: async () => {
        const result = await MiniApp.preferences.clearMiniAppPreferences();
        return { result: JSON.stringify(result) };
      },
    },
  },

  // ─── WEBVIEW ──────────────────────────────────────────────────────────────
  {
    id: 'webview_allowBackForward',
    name: 'webviewManager.allowBackForwardNavigationGestures()',
    category: CATEGORY.WEBVIEW,
    description: 'Enables or disables back/forward swipe navigation gestures in the WebView (iOS).',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.webviewManager.allowBackForwardNavigationGestures(false);
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'webview_forceInternalWebView',
    name: 'webviewManager.forceInternalWebView()',
    category: CATEGORY.WEBVIEW,
    description: 'Forces URLs opened by this MiniApp to use the host app internal web view.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.webviewManager.forceInternalWebView(false);
      return { result: JSON.stringify(result) };
    },
  },

  // ─── DEVICE & PERMISSIONS ─────────────────────────────────────────────────
  {
    id: 'device_isEsimSupported',
    name: 'esimService.isEsimSupported()',
    category: CATEGORY.DEVICE,
    description: 'Checks whether the device hardware supports eSIM.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.esimService.isEsimSupported();
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'device_setupEsim',
    name: 'esimService.setupAndInstallEsim()',
    category: CATEGORY.DEVICE,
    description: 'Sets up and installs an eSIM profile on the device.',
    isAutoTestable: false,
    reason: 'Requires a valid eSIM activation code and would attempt a real eSIM installation.',
    manualConfig: {
      fields: [
        { id: 'activationCode', label: 'Activation Code', defaultValue: 'LPA:1$your-esim-server$your-activation-code', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.esimService.setupAndInstallEsim({ activationCode: v.activationCode });
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'device_requestLocationPermission',
    name: 'requestLocationPermission()',
    category: CATEGORY.DEVICE,
    description: 'Requests location permission from the user via a system dialog.',
    isAutoTestable: false,
    reason: 'Would show a system permission dialog requiring user interaction.',
    manualConfig: {
      fields: [
        { id: 'description', label: 'Permission Description', defaultValue: 'Location is needed for this feature.', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.requestLocationPermission(v.description);
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'device_requestCustomPermissions',
    name: 'requestCustomPermissions()',
    category: CATEGORY.DEVICE,
    description: 'Requests one or more custom permissions from the user.',
    isAutoTestable: false,
    reason: 'Would show a permissions UI requiring user interaction.',
    manualConfig: {
      fields: [],
      run: async () => {
        const result = await MiniApp.requestCustomPermissions([
          {
            name: CustomPermissionName.USER_NAME,
            status: CustomPermissionStatus.DENIED,
            description: 'We need your name to personalise your experience.',
          },
          {
            name: CustomPermissionName.PROFILE_PHOTO,
            status: CustomPermissionStatus.DENIED,
            description: 'We need your profile photo to display your avatar.',
          },
        ]);
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'device_downloadFile',
    name: 'downloadFile()',
    category: CATEGORY.DEVICE,
    description: 'Downloads a file from a given URL to the device.',
    isAutoTestable: false,
    reason: 'Requires a valid file URL and may show a permission dialog.',
    manualConfig: {
      fields: [
        { id: 'filename', label: 'File Name', defaultValue: 'sample.pdf', type: 'text' },
        { id: 'url', label: 'File URL', defaultValue: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.downloadFile(v.filename, v.url, {});
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'device_galleryGetImage',
    name: 'galleryManager.getImageFromGallery()',
    category: CATEGORY.DEVICE,
    description: 'Opens the device photo gallery for the user to pick an image.',
    isAutoTestable: false,
    reason: 'Opens the device gallery UI requiring user selection.',
    manualConfig: {
      fields: [],
      run: async () => {
        const result = await MiniApp.galleryManager.getImageFromGallery();
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'device_oneClickKyc',
    name: 'oneClickSdk.startICChipKyc()',
    category: CATEGORY.DEVICE,
    description: 'Starts the IC Chip KYC identity verification flow.',
    isAutoTestable: false,
    reason: 'Would initiate a KYC verification flow requiring user interaction.',
    manualConfig: {
      fields: [
        { id: 'clientId', label: 'Client ID', defaultValue: 'your-client-id', type: 'text' },
        { id: 'redirectUri', label: 'Redirect URI', defaultValue: 'https://example.com/kyc/callback', type: 'text' },
        { id: 'scope', label: 'Scope', defaultValue: 'openid', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.oneClickSdk.startICChipKyc({
          clientId: v.clientId,
          redirectUri: v.redirectUri,
          scope: v.scope,
        });
        return { result: JSON.stringify(result) };
      },
    },
  },

  // ─── MESSAGING ────────────────────────────────────────────────────────────
  {
    id: 'chat_sendMessageToContact',
    name: 'chatService.sendMessageToContact()',
    category: CATEGORY.MESSAGING,
    description: 'Opens a contact picker and sends a templated message to a chosen contact.',
    isAutoTestable: false,
    reason: 'Opens a contact picker UI requiring user selection.',
    manualConfig: {
      fields: [
        { id: 'text', label: 'Message Text', defaultValue: 'Hello from SDK Health Check!', type: 'text' },
        { id: 'caption', label: 'Caption (optional)', defaultValue: 'MiniApp SDK Test', type: 'text' },
        { id: 'action', label: 'Action URL (optional)', defaultValue: '', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.chatService.sendMessageToContact({
          text: v.text,
          caption: v.caption || undefined,
          action: v.action || undefined,
        });
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'chat_sendMessageToContactId',
    name: 'chatService.sendMessageToContactId()',
    category: CATEGORY.MESSAGING,
    description: 'Sends a templated message to a specific contact by ID.',
    isAutoTestable: false,
    reason: 'Requires a pre-known valid contact ID.',
    manualConfig: {
      fields: [
        { id: 'contactId', label: 'Contact ID', defaultValue: '', type: 'text', placeholder: 'Enter contact ID' },
        { id: 'text', label: 'Message Text', defaultValue: 'Hello from SDK Health Check!', type: 'text' },
        { id: 'caption', label: 'Caption (optional)', defaultValue: 'MiniApp SDK Test', type: 'text' },
      ],
      run: async (v) => {
        if (!v.contactId) throw new Error('Contact ID is required.');
        const result = await MiniApp.chatService.sendMessageToContactId(v.contactId, {
          text: v.text,
          caption: v.caption || undefined,
        });
        return { result: JSON.stringify(result) };
      },
    },
  },
  {
    id: 'chat_sendMessageToMultipleContacts',
    name: 'chatService.sendMessageToMultipleContacts()',
    category: CATEGORY.MESSAGING,
    description: 'Opens a multi-select contact picker and sends a message to all chosen contacts.',
    isAutoTestable: false,
    reason: 'Opens a multi-select contact picker UI requiring user selection.',
    manualConfig: {
      fields: [
        { id: 'text', label: 'Message Text', defaultValue: 'Hello from SDK Health Check!', type: 'text' },
        { id: 'caption', label: 'Caption (optional)', defaultValue: 'MiniApp SDK Test', type: 'text' },
      ],
      run: async (v) => {
        const result = await MiniApp.chatService.sendMessageToMultipleContacts({
          text: v.text,
          caption: v.caption || undefined,
        });
        return { result: JSON.stringify(result) };
      },
    },
  },

  // ─── UNIVERSAL BRIDGE ─────────────────────────────────────────────────────
  {
    id: 'bridge_sendJson',
    name: 'universalBridge.sendJsonToHostapp()',
    category: CATEGORY.UTILS,
    description: 'Sends an arbitrary JSON string to the host app via the universal bridge.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.universalBridge.sendJsonToHostapp(
        '{"type":"health_check","source":"js-miniapp-health-check"}'
      );
      return { result: JSON.stringify(result) };
    },
  },
  {
    id: 'bridge_sendInfo',
    name: 'universalBridge.sendInfoToHostapp()',
    category: CATEGORY.UTILS,
    description: 'Sends a structured UniversalBridgeInfo object to the host app.',
    isAutoTestable: true,
    run: async () => {
      const result = await MiniApp.universalBridge.sendInfoToHostapp({
        messageName: 'health_check',
        messageContent: 'test',
        messageDescription: 'SDK Health Check test message',
      });
      return { result: JSON.stringify(result) };
    },
  },
];

export function getChecksByCategory() {
  const groups = {};
  for (const check of SDK_CHECKS) {
    if (!groups[check.category]) groups[check.category] = [];
    groups[check.category].push(check);
  }
  return groups;
}

export function getSummaryStats(results) {
  let total = 0, passed = 0, failed = 0, skipped = 0, pending = 0, running = 0;
  for (const check of SDK_CHECKS) {
    total++;
    const r = results[check.id];
    if (!r || r.status === CHECK_STATUS.PENDING) pending++;
    else if (r.status === CHECK_STATUS.RUNNING) running++;
    else if (r.status === CHECK_STATUS.SUCCESS) passed++;
    else if (r.status === CHECK_STATUS.FAILURE) failed++;
    else if (r.status === CHECK_STATUS.SKIPPED) skipped++;
  }
  return { total, passed, failed, skipped, pending, running };
}
