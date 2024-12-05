## CHANGELOG

### 1.22.0 (2024-12-05)
- **Feature:** Added new interface `launchExternalBrowser` which helps the MiniApps to launch a URL in external browser
- **Feature:** Added new interface `launchInternalBrowser` which helps the MiniApps to launch a URL in internal browser
- **Feature:** Added new interface `getImageFromGallery` to get image from Gallery. User can select one image and the same will be returned  to MiniApp
- **Feature:** Added new interface `isLoggedIn` to get the Login status of the User in the Host application
- **Feature:** Added new interface `allowBackForwardNavigationGestures` to enable/disable swipe gestures in iOS Host application
- **Update:** Update `shareInfo` to allow sharing URL & Image as well

---

### 1.21.0 (2024-07-30)
- **Feature:** Added new interface `isAppDeeplinkSupported` which helps to check if the application have whitelisted/allows the deeplink to open
- **Feature:** Added new interface `canOpenAppDeeplink` which helps to check if the device can open the deeplink scheme
- **Feature:** Added new interface `getPhoneNumber` to get the phone number from the native application
- **Fix:** Updated `MAAnalyticsInfo` in SDK to have more parameters

---

### 1.20.2 (2024-03-27)
- **Fix:** Remove dependecy of `libbase64` and we moved the encode/decode internally in SDK

### 1.20.1 (2024-03-26)
- **Fix:** Updated dependency for `libbase64` to use static `1.2.1` version

### 1.20.0 (2024-03-21)
- **Feature:** Added new interfaces `set(key: string, value: string)`, `get(key: string)`, `remove(key: string)`, `clearMiniAppPreferences()` which uses the native storage features like Shared Preferences/User defaults to store anything from MiniApp.
- **Feature:** Updated HostEnvironmentInfo to have `hostBuildType`, `deviceToken` and `pushToken`
- **Feature:** Added new interface `miniAppFinishedLoading()` which can be used by miniapp to notify the host app that it has finished loading.
- **Fix:** Few Contacts with special characters is failed to retrieve, its fixed now
- **Feature:** Added new interface `getFeatureList()` that will return the list if features supported by the Host and MiniApp SDK.

### 1.19.0 (2023-11-02)
- **Feature:** Added new interface `getAllCookies()` to get `CookieInfo` which contains `name` and `value` of the cookie
- **Feature:** Added new interface `getCookies(cookieNameList:)` that requests for certain cookies to host application that will get `CookieInfo` which contains `name` and `value` of the cookie

### 1.18.0 (2023-07-25)
- **Feature:** Added new interface `getHostAppThemeColors()` to get `HostThemeColor` which contains primary & secondary color set by the Host app
- **Feature:** Added new interface `isDarkMode()`. Interface to know if the Hostapp/Device is set to use the Dark 
- **Feature:** Added new interface `sendAnalytics(analyticsInfo: MAAnalyticsInfo)`. This interface will be used to send analytics to host app.
- **Feature:** Added new interface in Universal Bridge i.e `sendInfoToHostapp` which helps the Miniapp to send `UniversalBridgeInfo` to the HostApp. 


### 1.18.0-alpha (2023-07-12)

:warning: This version is an internal release. It is not fully tested and can produce unexpected behaviors. Due to potential changes, the full change log will be provided with the final version and its usage is discouraged.

This version improves MiniApp loading from cache and brings several UI improvements features and deprecation.

---

### 1.17.0 (2023-03-30)
- **Feature:** Added In-app purchases related interfaces. `getAllProducts()` , `purchaseProductWith(id: string)`, `consumePurchaseWith(id: string, transactionId: string)`. These interfaces can be used to prepare the list of products and make a in-app purchase with product id from associated with Mini App platform.

---

### 1.16.0 (2023-01-30)
- **Feature:** Added Universal Bridge related interface e.g. `sendJsonToHostapp` to send any JSON/String to the HostApp. Also, added support with `HostAppEvents` to receive any JSON/String to MiniApp from the HostApp.
- **Feature:** Added `allEmailList` property in `Contact` to support multiple email address of a specific contact.
- **Feature:** Added `closeMiniApp(withConfirmation: boolean)` interface which will help the miniapp to close on its own, provided Native Host application allows them to close.
- **Update:** Moved `setCloseAlert(alertInfo: CloseAlertInfo)` interface to a MiniApp.miniappUtils object

---

### 1.15.0 (2022-06-24)
- **Feature:** Added `setCloseAlert(alertInfo: CloseAlertInfo)` interface support to Mini Apps share info about Close confirm alert
- **Feature:** Added Secure storage related interfaces. `setItems(items: MiniAppSecureStorageKeyValues)` , `getItem(key: string)`, `removeItems(key: [string])`, `clear()`, `size()`. These interfaces can be used to storage items in the SDK.

---
### 1.14.0 (2022-04-12)
- **Feature:** Added `downloadFile(filename, url, headers)` to download and save the file with proper filename

---

### 1.13.0 (2021-12-17)

- **Feature:** Added default values for message form in demo app
- **Feature:** Added `hostLocale` to `HostEnvironmentInfo` to retrieve locale info from host app
- **Feature:** Added camera picture screen in demo app

--- 

### 1.12.0 (2021-10-10)

- **Feature:** Added `CustomPermissionName.FILE_DOWNLOAD` permission to support downloading attachments
- **Feature:** Added `getHostEnvironmentInfo()`  to retrieve Host app environment information
- **Feature:** Added support for Mini app external webview close events

--- 

### 1.11.0 (2021-08-05)
- **Feature:** Added interface to get user points
- **Feature:** Added an optional banner message field in messaging feature

---

### 1.10.0 (2021-06-29)
- **Feature:** Added `MiniAppError` class for a better bridge errors management [See here](README.md#Errors-management).

---

### 1.9.0 (2021-05-27)
- **Feature:** Added `Send Messsage` custom permission for sending message to specific contact. [See here](README.md#Request-Permissions).
- **Feature:** Added `MiniAppError` class for a better bridge errors management [See here](README.md#Errors-management).

---

### 1.8.0 (2021-04-22)

- **Feature:** Support send message to specific and multiple contacts. [See here](README.md#Send-message).

---

### 1.7.0 (2021-04-02)

- **Feature:** Support send message to contact. [See Send message documentation](README.md#Send-message).
- **Feature:** Added `Access Token` Custom permission.
- **Feature:** Added optional `Name` & `Email` properties to Contact object
- **Feature:** Added `Access Token` scopes and audience

---

### 1.6.1 (2021-01-06)

- **Fix:** Location permission support for iOS/Android Mini App SDK 2.6 and below.
- **Fix:** Reject promise from `MiniApp.requestLocationPermission` when the user denies location custom permission.

### 1.6.0 (2020-12-18)

- **Feature:** Added `CustomPermissionName.LOCATION`.
- **Change:** Updated `requestLocationPermission()` to `requestLocationPermission(permissionDescription?: string)`. From now `requestLocationPermission` will request both custom and device permission respectively. [See here](README.md#Request-Permissions).
- **Feature:** Added support for requesting Contact list from Host app. [See here](README.md#Requesting-User-details).

### 1.5.0 (2020-11-13)

- **Feature:** Added `MiniApp.getAccessToken` for retrieving an access token. [See here](README.md#Get-access-token).

### 1.4.0 (2020-11-02)

- **Feature:** Set and lock device screen orientation. [See here](README.md#Set-screen-orientation).

### 1.3.0 (2020-10-22)

- **Feature:** Added support for requesting the load and display of Interstitial & Rewarded Ads in Host app. [See here](README.md#4-Show-Ads).
- **Feature:** Added support for requesting User Name and Profile Photo from Host app. [See here](README.md#Requesting-User-details).
- **Feature:** Added `MiniApp.getPlatform` for retrieving the platform name of the device. [See here](README.md#check-androidios-device).

### v1.2.0 (2020-10-02)

- **Feature:** Added `MiniApp.requestCustomPermissions` for requesting `USER_NAME`, `PROFILE_PHOTO`, and `CONTACT_LIST` permissions. [See here](README.md#Request-Permissions)
- **Feature:** Added `MiniApp.shareInfo` for sharing content with other Apps. [See here](README.md#Share-Info).

### v1.1.0 (2020-7-21)

- Added support for requesting geolocation permission from the host application to allow fetching of the coordinates data thereafter. [See here](README.md#Request-Permissions).

### v1.0.0 (2020-5-13)

- Initial release.
