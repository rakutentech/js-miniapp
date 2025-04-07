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
* [esimService](miniapp.md#esimservice)
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

*Defined in [js-miniapp-sdk/src/miniapp.ts:174](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L174)*

___

### cookieManager

•  **cookieManager**: CookieManager = new CookieManager()

*Defined in [js-miniapp-sdk/src/miniapp.ts:179](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L179)*

___

### esimService

•  **esimService**: Esim = new Esim()

*Defined in [js-miniapp-sdk/src/miniapp.ts:183](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L183)*

___

### galleryManager

•  **galleryManager**: [GalleryBridge](gallerybridge.md) = new GalleryBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:181](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L181)*

___

### miniappUtils

•  **miniappUtils**: MiniAppUtils = new MiniAppUtils()

*Defined in [js-miniapp-sdk/src/miniapp.ts:177](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L177)*

___

### preferences

•  **preferences**: MiniAppPreference = new MiniAppPreference()

*Defined in [js-miniapp-sdk/src/miniapp.ts:180](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L180)*

___

### purchaseService

•  **purchaseService**: Purchases = new Purchases()

*Defined in [js-miniapp-sdk/src/miniapp.ts:178](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L178)*

___

### secureStorageService

•  **secureStorageService**: SecureStorageService = new SecureStorageService()

*Defined in [js-miniapp-sdk/src/miniapp.ts:175](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L175)*

___

### universalBridge

•  **universalBridge**: UniversalBridge = new UniversalBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:176](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L176)*

___

### user

•  **user**: [UserInfoProvider](../interfaces/userinfoprovider.md) = new UserInfo()

*Defined in [js-miniapp-sdk/src/miniapp.ts:173](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L173)*

___

### webviewManager

•  **webviewManager**: [WebviewManager](webviewmanager.md) = new WebviewManager()

*Defined in [js-miniapp-sdk/src/miniapp.ts:182](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L182)*

## Methods

### downloadFile

▸ **downloadFile**(`filename`: string, `url`: string, `headers?`: [DownloadFileHeaders](../interfaces/downloadfileheaders.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:295](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L295)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:286](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L286)*

**Returns:** Promise\<[HostEnvironmentInfo](../interfaces/hostenvironmentinfo.md)>

___

### getMauid

▸ **getMauid**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:200](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L200)*

**Returns:** Promise\<string>

___

### getMessagingUniqueId

▸ **getMessagingUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:196](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L196)*

**Returns:** Promise\<string>

___

### getPlatform

▸ **getPlatform**(): string

*Defined in [js-miniapp-sdk/src/miniapp.ts:270](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L270)*

**Returns:** string

___

### getPoints

▸ **getPoints**(): Promise\<[Points](../interfaces/points.md)>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:282](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L282)*

**Returns:** Promise\<[Points](../interfaces/points.md)>

___

### getUniqueId

▸ **getUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:192](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L192)*

**`deprecated`** Deprecated method for getting the uniqueId use `getMessagingUniqueId` or `getMauid` instead

**Returns:** Promise\<string>

___

### loadInterstitialAd

▸ **loadInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:243](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L243)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### loadRewardedAd

▸ **loadRewardedAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:247](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L247)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](../interfaces/custompermission.md)[]): Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:235](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L235)*

#### Parameters:

Name | Type |
------ | ------ |
`permissions` | [CustomPermission](../interfaces/custompermission.md)[] |

**Returns:** Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

___

### requestLocationPermission

▸ **requestLocationPermission**(`permissionDescription?`: string): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:204](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L204)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`permissionDescription` | string | "" |

**Returns:** Promise\<string>

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](../interfaces/closealertinfo.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:303](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L303)*

#### Parameters:

Name | Type |
------ | ------ |
`alertInfo` | [CloseAlertInfo](../interfaces/closealertinfo.md) |

**Returns:** Promise\<string>

___

### setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:278](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L278)*

#### Parameters:

Name | Type |
------ | ------ |
`screenOrientation` | [ScreenOrientation](../enums/screenorientation.md) |

**Returns:** Promise\<string>

___

### shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](../interfaces/shareinfotype.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:259](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L259)*

#### Parameters:

Name | Type |
------ | ------ |
`info` | [ShareInfoType](../interfaces/shareinfotype.md) |

**Returns:** Promise\<string>

___

### showInterstitialAd

▸ **showInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:251](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L251)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### showRewardedAd

▸ **showRewardedAd**(`id`: string): Promise\<[Reward](../interfaces/reward.md)>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:255](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/miniapp.ts#L255)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Reward](../interfaces/reward.md)>
