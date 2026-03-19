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
* [oneClickSdk](miniapp.md#oneclicksdk)
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

*Defined in [js-miniapp-sdk/src/miniapp.ts:176](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L176)*

___

### cookieManager

•  **cookieManager**: CookieManager = new CookieManager()

*Defined in [js-miniapp-sdk/src/miniapp.ts:181](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L181)*

___

### esimService

•  **esimService**: Esim = new Esim()

*Defined in [js-miniapp-sdk/src/miniapp.ts:185](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L185)*

___

### galleryManager

•  **galleryManager**: [GalleryBridge](gallerybridge.md) = new GalleryBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:183](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L183)*

___

### miniappUtils

•  **miniappUtils**: MiniAppUtils = new MiniAppUtils()

*Defined in [js-miniapp-sdk/src/miniapp.ts:179](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L179)*

___

### oneClickSdk

•  **oneClickSdk**: OneClickSdk = new OneClickSdk()

*Defined in [js-miniapp-sdk/src/miniapp.ts:186](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L186)*

___

### preferences

•  **preferences**: MiniAppPreference = new MiniAppPreference()

*Defined in [js-miniapp-sdk/src/miniapp.ts:182](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L182)*

___

### purchaseService

•  **purchaseService**: Purchases = new Purchases()

*Defined in [js-miniapp-sdk/src/miniapp.ts:180](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L180)*

___

### secureStorageService

•  **secureStorageService**: SecureStorageService = new SecureStorageService()

*Defined in [js-miniapp-sdk/src/miniapp.ts:177](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L177)*

___

### universalBridge

•  **universalBridge**: UniversalBridge = new UniversalBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:178](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L178)*

___

### user

•  **user**: [UserInfoProvider](../interfaces/userinfoprovider.md) = new UserInfo()

*Defined in [js-miniapp-sdk/src/miniapp.ts:175](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L175)*

___

### webviewManager

•  **webviewManager**: [WebviewManager](webviewmanager.md) = new WebviewManager()

*Defined in [js-miniapp-sdk/src/miniapp.ts:184](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L184)*

## Methods

### downloadFile

▸ **downloadFile**(`filename`: string, `url`: string, `headers?`: [DownloadFileHeaders](../interfaces/downloadfileheaders.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:298](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L298)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:289](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L289)*

**Returns:** Promise\<[HostEnvironmentInfo](../interfaces/hostenvironmentinfo.md)>

___

### getMauid

▸ **getMauid**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:203](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L203)*

**Returns:** Promise\<string>

___

### getMessagingUniqueId

▸ **getMessagingUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:199](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L199)*

**Returns:** Promise\<string>

___

### getPermissionStatus

▸ **getPermissionStatus**(`name`: [PermissionName](../enums/permissionname.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:310](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L310)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | [PermissionName](../enums/permissionname.md) |

**Returns:** Promise\<string>

___

### getPlatform

▸ **getPlatform**(): string

*Defined in [js-miniapp-sdk/src/miniapp.ts:273](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L273)*

**Returns:** string

___

### getPoints

▸ **getPoints**(): Promise\<[Points](../interfaces/points.md)>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:285](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L285)*

**Returns:** Promise\<[Points](../interfaces/points.md)>

___

### getUniqueId

▸ **getUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:195](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L195)*

**`deprecated`** Deprecated method for getting the uniqueId use `getMessagingUniqueId` or `getMauid` instead

**Returns:** Promise\<string>

___

### loadInterstitialAd

▸ **loadInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:246](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L246)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### loadRewardedAd

▸ **loadRewardedAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:250](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L250)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](../interfaces/custompermission.md)[]): Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:238](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L238)*

#### Parameters:

Name | Type |
------ | ------ |
`permissions` | [CustomPermission](../interfaces/custompermission.md)[] |

**Returns:** Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

___

### requestLocationPermission

▸ **requestLocationPermission**(`permissionDescription?`: string): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:207](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L207)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`permissionDescription` | string | "" |

**Returns:** Promise\<string>

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](../interfaces/closealertinfo.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:306](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L306)*

#### Parameters:

Name | Type |
------ | ------ |
`alertInfo` | [CloseAlertInfo](../interfaces/closealertinfo.md) |

**Returns:** Promise\<string>

___

### setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:281](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L281)*

#### Parameters:

Name | Type |
------ | ------ |
`screenOrientation` | [ScreenOrientation](../enums/screenorientation.md) |

**Returns:** Promise\<string>

___

### shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](../interfaces/shareinfotype.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:262](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L262)*

#### Parameters:

Name | Type |
------ | ------ |
`info` | [ShareInfoType](../interfaces/shareinfotype.md) |

**Returns:** Promise\<string>

___

### showInterstitialAd

▸ **showInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:254](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L254)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### showRewardedAd

▸ **showRewardedAd**(`id`: string): Promise\<[Reward](../interfaces/reward.md)>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:258](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-sdk/src/miniapp.ts#L258)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Reward](../interfaces/reward.md)>
