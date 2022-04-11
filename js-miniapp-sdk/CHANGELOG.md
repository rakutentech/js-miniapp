## CHANGELOG
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
