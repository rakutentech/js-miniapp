**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / MiniApp

# Class: MiniApp

## Hierarchy

* **MiniApp**

## Implements

* [MiniAppFeatures](../interfaces/miniappfeatures.md)
* [Ad](../interfaces/ad.md)
* Platform

## Index

### Properties

* [chatService](miniapp.md#chatservice)
* [cookieManager](miniapp.md#cookiemanager)
* [galleryManager](miniapp.md#gallerymanager)
* [miniappUtils](miniapp.md#miniapputils)
* [preferences](miniapp.md#preferences)
* [purchaseService](miniapp.md#purchaseservice)
* [secureStorageService](miniapp.md#securestorageservice)
* [universalBridge](miniapp.md#universalbridge)
* [user](miniapp.md#user)
* [webviewManager](miniapp.md#webviewmanager)

### Methods

* [downloadFile](miniapp.md#downloadfile)
* [getHostEnvironmentInfo](miniapp.md#gethostenvironmentinfo)
* [getMauid](miniapp.md#getmauid)
* [getMessagingUniqueId](miniapp.md#getmessaginguniqueid)
* [getPlatform](miniapp.md#getplatform)
* [getPoints](miniapp.md#getpoints)
* [getUniqueId](miniapp.md#getuniqueid)
* [loadInterstitialAd](miniapp.md#loadinterstitialad)
* [loadRewardedAd](miniapp.md#loadrewardedad)
* [requestCustomPermissions](miniapp.md#requestcustompermissions)
* [requestLocationPermission](miniapp.md#requestlocationpermission)
* [setCloseAlert](miniapp.md#setclosealert)
* [setScreenOrientation](miniapp.md#setscreenorientation)
* [shareInfo](miniapp.md#shareinfo)
* [showInterstitialAd](miniapp.md#showinterstitialad)
* [showRewardedAd](miniapp.md#showrewardedad)

## Properties

### chatService

•  **chatService**: ChatService = new ChatService()

*Defined in [js-miniapp-sdk/src/miniapp.ts:173](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L173)*

___

### cookieManager

•  **cookieManager**: CookieManager = new CookieManager()

*Defined in [js-miniapp-sdk/src/miniapp.ts:178](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L178)*

___

### galleryManager

•  **galleryManager**: [GalleryBridge](gallerybridge.md) = new GalleryBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:180](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L180)*

___

### miniappUtils

•  **miniappUtils**: MiniAppUtils = new MiniAppUtils()

*Defined in [js-miniapp-sdk/src/miniapp.ts:176](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L176)*

___

### preferences

•  **preferences**: MiniAppPreference = new MiniAppPreference()

*Defined in [js-miniapp-sdk/src/miniapp.ts:179](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L179)*

___

### purchaseService

•  **purchaseService**: Purchases = new Purchases()

*Defined in [js-miniapp-sdk/src/miniapp.ts:177](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L177)*

___

### secureStorageService

•  **secureStorageService**: SecureStorageService = new SecureStorageService()

*Defined in [js-miniapp-sdk/src/miniapp.ts:174](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L174)*

___

### universalBridge

•  **universalBridge**: UniversalBridge = new UniversalBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:175](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L175)*

___

### user

•  **user**: [UserInfoProvider](../interfaces/userinfoprovider.md) = new UserInfo()

*Defined in [js-miniapp-sdk/src/miniapp.ts:172](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L172)*

___

### webviewManager

•  **webviewManager**: [WebviewManager](webviewmanager.md) = new WebviewManager()

*Defined in [js-miniapp-sdk/src/miniapp.ts:181](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L181)*

## Methods

### downloadFile

▸ **downloadFile**(`filename`: string, `url`: string, `headers?`: [DownloadFileHeaders](../interfaces/downloadfileheaders.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:293](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L293)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`filename` | string | - |
`url` | string | - |
`headers` | [DownloadFileHeaders](../interfaces/downloadfileheaders.md) | {} |

**Returns:** Promise\<string>

___

### getHostEnvironmentInfo

▸ **getHostEnvironmentInfo**(): Promise\<[HostEnvironmentInfo](../interfaces/hostenvironmentinfo.md)>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:284](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L284)*

**Returns:** Promise\<[HostEnvironmentInfo](../interfaces/hostenvironmentinfo.md)>

___

### getMauid

▸ **getMauid**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:198](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L198)*

**Returns:** Promise\<string>

___

### getMessagingUniqueId

▸ **getMessagingUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:194](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L194)*

**Returns:** Promise\<string>

___

### getPlatform

▸ **getPlatform**(): string

*Defined in [js-miniapp-sdk/src/miniapp.ts:268](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L268)*

**Returns:** string

___

### getPoints

▸ **getPoints**(): Promise\<[Points](../interfaces/points.md)>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:280](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L280)*

**Returns:** Promise\<[Points](../interfaces/points.md)>

___

### getUniqueId

▸ **getUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:190](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L190)*

**`deprecated`** Deprecated method for getting the uniqueId use `getMessagingUniqueId` or `getMauid` instead

**Returns:** Promise\<string>

___

### loadInterstitialAd

▸ **loadInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:241](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L241)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### loadRewardedAd

▸ **loadRewardedAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:245](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L245)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](../interfaces/custompermission.md)[]): Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:233](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L233)*

#### Parameters:

Name | Type |
------ | ------ |
`permissions` | [CustomPermission](../interfaces/custompermission.md)[] |

**Returns:** Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

___

### requestLocationPermission

▸ **requestLocationPermission**(`permissionDescription?`: string): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:202](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L202)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`permissionDescription` | string | "" |

**Returns:** Promise\<string>

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](../interfaces/closealertinfo.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:301](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L301)*

#### Parameters:

Name | Type |
------ | ------ |
`alertInfo` | [CloseAlertInfo](../interfaces/closealertinfo.md) |

**Returns:** Promise\<string>

___

### setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:276](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L276)*

#### Parameters:

Name | Type |
------ | ------ |
`screenOrientation` | [ScreenOrientation](../enums/screenorientation.md) |

**Returns:** Promise\<string>

___

### shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](../interfaces/shareinfotype.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:257](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L257)*

#### Parameters:

Name | Type |
------ | ------ |
`info` | [ShareInfoType](../interfaces/shareinfotype.md) |

**Returns:** Promise\<string>

___

### showInterstitialAd

▸ **showInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:249](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L249)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### showRewardedAd

▸ **showRewardedAd**(`id`: string): Promise\<[Reward](../interfaces/reward.md)>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:253](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/miniapp.ts#L253)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Reward](../interfaces/reward.md)>
