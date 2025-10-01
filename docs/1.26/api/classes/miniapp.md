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
* [getPermissionStatus](miniapp.md#getpermissionstatus)
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

*Defined in [js-miniapp-sdk/src/miniapp.ts:175](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L175)*

___

### cookieManager

•  **cookieManager**: CookieManager = new CookieManager()

*Defined in [js-miniapp-sdk/src/miniapp.ts:180](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L180)*

___

### esimService

•  **esimService**: Esim = new Esim()

*Defined in [js-miniapp-sdk/src/miniapp.ts:184](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L184)*

___

### galleryManager

•  **galleryManager**: [GalleryBridge](gallerybridge.md) = new GalleryBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:182](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L182)*

___

### miniappUtils

•  **miniappUtils**: MiniAppUtils = new MiniAppUtils()

*Defined in [js-miniapp-sdk/src/miniapp.ts:178](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L178)*

___

### preferences

•  **preferences**: MiniAppPreference = new MiniAppPreference()

*Defined in [js-miniapp-sdk/src/miniapp.ts:181](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L181)*

___

### purchaseService

•  **purchaseService**: Purchases = new Purchases()

*Defined in [js-miniapp-sdk/src/miniapp.ts:179](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L179)*

___

### secureStorageService

•  **secureStorageService**: SecureStorageService = new SecureStorageService()

*Defined in [js-miniapp-sdk/src/miniapp.ts:176](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L176)*

___

### universalBridge

•  **universalBridge**: UniversalBridge = new UniversalBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:177](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L177)*

___

### user

•  **user**: [UserInfoProvider](../interfaces/userinfoprovider.md) = new UserInfo()

*Defined in [js-miniapp-sdk/src/miniapp.ts:174](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L174)*

___

### webviewManager

•  **webviewManager**: [WebviewManager](webviewmanager.md) = new WebviewManager()

*Defined in [js-miniapp-sdk/src/miniapp.ts:183](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L183)*

## Methods

### downloadFile

▸ **downloadFile**(`filename`: string, `url`: string, `headers?`: [DownloadFileHeaders](../interfaces/downloadfileheaders.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:296](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L296)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:287](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L287)*

**Returns:** Promise\<[HostEnvironmentInfo](../interfaces/hostenvironmentinfo.md)>

___

### getMauid

▸ **getMauid**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:201](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L201)*

**Returns:** Promise\<string>

___

### getMessagingUniqueId

▸ **getMessagingUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:197](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L197)*

**Returns:** Promise\<string>

___

### getPermissionStatus

▸ **getPermissionStatus**(`name`: [PermissionName](../enums/permissionname.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:308](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L308)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | [PermissionName](../enums/permissionname.md) |

**Returns:** Promise\<string>

___

### getPlatform

▸ **getPlatform**(): string

*Defined in [js-miniapp-sdk/src/miniapp.ts:271](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L271)*

**Returns:** string

___

### getPoints

▸ **getPoints**(): Promise\<[Points](../interfaces/points.md)>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:283](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L283)*

**Returns:** Promise\<[Points](../interfaces/points.md)>

___

### getUniqueId

▸ **getUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:193](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L193)*

**`deprecated`** Deprecated method for getting the uniqueId use `getMessagingUniqueId` or `getMauid` instead

**Returns:** Promise\<string>

___

### loadInterstitialAd

▸ **loadInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:244](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L244)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### loadRewardedAd

▸ **loadRewardedAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:248](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L248)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](../interfaces/custompermission.md)[]): Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:236](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L236)*

#### Parameters:

Name | Type |
------ | ------ |
`permissions` | [CustomPermission](../interfaces/custompermission.md)[] |

**Returns:** Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

___

### requestLocationPermission

▸ **requestLocationPermission**(`permissionDescription?`: string): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:205](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L205)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`permissionDescription` | string | "" |

**Returns:** Promise\<string>

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](../interfaces/closealertinfo.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:304](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L304)*

#### Parameters:

Name | Type |
------ | ------ |
`alertInfo` | [CloseAlertInfo](../interfaces/closealertinfo.md) |

**Returns:** Promise\<string>

___

### setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:279](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L279)*

#### Parameters:

Name | Type |
------ | ------ |
`screenOrientation` | [ScreenOrientation](../enums/screenorientation.md) |

**Returns:** Promise\<string>

___

### shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](../interfaces/shareinfotype.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:260](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L260)*

#### Parameters:

Name | Type |
------ | ------ |
`info` | [ShareInfoType](../interfaces/shareinfotype.md) |

**Returns:** Promise\<string>

___

### showInterstitialAd

▸ **showInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:252](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L252)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### showRewardedAd

▸ **showRewardedAd**(`id`: string): Promise\<[Reward](../interfaces/reward.md)>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:256](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/miniapp.ts#L256)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Reward](../interfaces/reward.md)>
