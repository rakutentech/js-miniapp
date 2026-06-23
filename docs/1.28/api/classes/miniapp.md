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
* [requestPermission](miniapp.md#requestpermission)
* [setCloseAlert](miniapp.md#setclosealert)
* [setScreenOrientation](miniapp.md#setscreenorientation)
* [shareInfo](miniapp.md#shareinfo)
* [showInterstitialAd](miniapp.md#showinterstitialad)
* [showRewardedAd](miniapp.md#showrewardedad)

## Properties

### chatService

•  **chatService**: ChatService = new ChatService()

*Defined in [js-miniapp-sdk/src/miniapp.ts:184](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L184)*

___

### cookieManager

•  **cookieManager**: CookieManager = new CookieManager()

*Defined in [js-miniapp-sdk/src/miniapp.ts:189](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L189)*

___

### esimService

•  **esimService**: Esim = new Esim()

*Defined in [js-miniapp-sdk/src/miniapp.ts:193](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L193)*

___

### galleryManager

•  **galleryManager**: [GalleryBridge](gallerybridge.md) = new GalleryBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:191](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L191)*

___

### miniappUtils

•  **miniappUtils**: MiniAppUtils = new MiniAppUtils()

*Defined in [js-miniapp-sdk/src/miniapp.ts:187](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L187)*

___

### oneClickSdk

•  **oneClickSdk**: OneClickSdk = new OneClickSdk()

*Defined in [js-miniapp-sdk/src/miniapp.ts:194](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L194)*

___

### preferences

•  **preferences**: MiniAppPreference = new MiniAppPreference()

*Defined in [js-miniapp-sdk/src/miniapp.ts:190](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L190)*

___

### purchaseService

•  **purchaseService**: Purchases = new Purchases()

*Defined in [js-miniapp-sdk/src/miniapp.ts:188](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L188)*

___

### secureStorageService

•  **secureStorageService**: SecureStorageService = new SecureStorageService()

*Defined in [js-miniapp-sdk/src/miniapp.ts:185](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L185)*

___

### universalBridge

•  **universalBridge**: UniversalBridge = new UniversalBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:186](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L186)*

___

### user

•  **user**: [UserInfoProvider](../interfaces/userinfoprovider.md) = new UserInfo()

*Defined in [js-miniapp-sdk/src/miniapp.ts:183](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L183)*

___

### webviewManager

•  **webviewManager**: [WebviewManager](webviewmanager.md) = new WebviewManager()

*Defined in [js-miniapp-sdk/src/miniapp.ts:192](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L192)*

## Methods

### downloadFile

▸ **downloadFile**(`filename`: string, `url`: string, `headers?`: [DownloadFileHeaders](../interfaces/downloadfileheaders.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:310](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L310)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:301](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L301)*

**Returns:** Promise\<[HostEnvironmentInfo](../interfaces/hostenvironmentinfo.md)>

___

### getMauid

▸ **getMauid**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:215](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L215)*

**Returns:** Promise\<string>

___

### getMessagingUniqueId

▸ **getMessagingUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:211](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L211)*

**Returns:** Promise\<string>

___

### getPermissionStatus

▸ **getPermissionStatus**(`name`: [PermissionName](../enums/permissionname.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:322](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L322)*

#### Parameters:

Name | Type |
------ | ------ |
`name` | [PermissionName](../enums/permissionname.md) |

**Returns:** Promise\<string>

___

### getPlatform

▸ **getPlatform**(): string

*Defined in [js-miniapp-sdk/src/miniapp.ts:285](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L285)*

**Returns:** string

___

### getPoints

▸ **getPoints**(): Promise\<[Points](../interfaces/points.md)>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:297](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L297)*

**Returns:** Promise\<[Points](../interfaces/points.md)>

___

### getUniqueId

▸ **getUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:207](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L207)*

**`deprecated`** Deprecated method for getting the uniqueId use `getMessagingUniqueId` or `getMauid` instead

**Returns:** Promise\<string>

___

### loadInterstitialAd

▸ **loadInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:258](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L258)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### loadRewardedAd

▸ **loadRewardedAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:262](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L262)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](../interfaces/custompermission.md)[]): Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:250](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L250)*

#### Parameters:

Name | Type |
------ | ------ |
`permissions` | [CustomPermission](../interfaces/custompermission.md)[] |

**Returns:** Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

___

### requestLocationPermission

▸ **requestLocationPermission**(`permissionDescription?`: string): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:219](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L219)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`permissionDescription` | string | "" |

**Returns:** Promise\<string>

___

### requestPermission

▸ **requestPermission**(`permissionType`: [DevicePermission](../enums/devicepermission.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:196](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L196)*

#### Parameters:

Name | Type |
------ | ------ |
`permissionType` | [DevicePermission](../enums/devicepermission.md) |

**Returns:** Promise\<string>

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](../interfaces/closealertinfo.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:318](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L318)*

#### Parameters:

Name | Type |
------ | ------ |
`alertInfo` | [CloseAlertInfo](../interfaces/closealertinfo.md) |

**Returns:** Promise\<string>

___

### setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:293](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L293)*

#### Parameters:

Name | Type |
------ | ------ |
`screenOrientation` | [ScreenOrientation](../enums/screenorientation.md) |

**Returns:** Promise\<string>

___

### shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](../interfaces/shareinfotype.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:274](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L274)*

#### Parameters:

Name | Type |
------ | ------ |
`info` | [ShareInfoType](../interfaces/shareinfotype.md) |

**Returns:** Promise\<string>

___

### showInterstitialAd

▸ **showInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:266](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L266)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### showRewardedAd

▸ **showRewardedAd**(`id`: string): Promise\<[Reward](../interfaces/reward.md)>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:270](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-sdk/src/miniapp.ts#L270)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Reward](../interfaces/reward.md)>
