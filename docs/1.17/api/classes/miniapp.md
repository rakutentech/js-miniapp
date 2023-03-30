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
* [miniappUtils](miniapp.md#miniapputils)
* [purchaseService](miniapp.md#purchaseservice)
* [secureStorageService](miniapp.md#securestorageservice)
* [universalBridge](miniapp.md#universalbridge)
* [user](miniapp.md#user)

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:165](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L165)*

___

### miniappUtils

•  **miniappUtils**: MiniAppUtils = new MiniAppUtils()

*Defined in [js-miniapp-sdk/src/miniapp.ts:168](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L168)*

___

### purchaseService

•  **purchaseService**: Purchases = new Purchases()

*Defined in [js-miniapp-sdk/src/miniapp.ts:169](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L169)*

___

### secureStorageService

•  **secureStorageService**: SecureStorageService = new SecureStorageService()

*Defined in [js-miniapp-sdk/src/miniapp.ts:166](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L166)*

___

### universalBridge

•  **universalBridge**: UniversalBridge = new UniversalBridge()

*Defined in [js-miniapp-sdk/src/miniapp.ts:167](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L167)*

___

### user

•  **user**: [UserInfoProvider](../interfaces/userinfoprovider.md) = new UserInfo()

*Defined in [js-miniapp-sdk/src/miniapp.ts:164](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L164)*

## Methods

### downloadFile

▸ **downloadFile**(`filename`: string, `url`: string, `headers?`: [DownloadFileHeaders](../interfaces/downloadfileheaders.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:274](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L274)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:265](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L265)*

**Returns:** Promise\<[HostEnvironmentInfo](../interfaces/hostenvironmentinfo.md)>

___

### getMauid

▸ **getMauid**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:186](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L186)*

**Returns:** Promise\<string>

___

### getMessagingUniqueId

▸ **getMessagingUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:182](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L182)*

**Returns:** Promise\<string>

___

### getPlatform

▸ **getPlatform**(): string

*Defined in [js-miniapp-sdk/src/miniapp.ts:249](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L249)*

**Returns:** string

___

### getPoints

▸ **getPoints**(): Promise\<[Points](../interfaces/points.md)>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:261](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L261)*

**Returns:** Promise\<[Points](../interfaces/points.md)>

___

### getUniqueId

▸ **getUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:178](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L178)*

**`deprecated`** Deprecated method for getting the uniqueId use `getMessagingUniqueId` or `getMauid` instead

**Returns:** Promise\<string>

___

### loadInterstitialAd

▸ **loadInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:229](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L229)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### loadRewardedAd

▸ **loadRewardedAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:233](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L233)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](../interfaces/custompermission.md)[]): Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:221](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L221)*

#### Parameters:

Name | Type |
------ | ------ |
`permissions` | [CustomPermission](../interfaces/custompermission.md)[] |

**Returns:** Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

___

### requestLocationPermission

▸ **requestLocationPermission**(`permissionDescription?`: string): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:190](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L190)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`permissionDescription` | string | "" |

**Returns:** Promise\<string>

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](../interfaces/closealertinfo.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:285](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L285)*

**`deprecated`** Deprecated method for getting the uniqueId use `getMessagingUniqueId` or `getMauid` instead

#### Parameters:

Name | Type |
------ | ------ |
`alertInfo` | [CloseAlertInfo](../interfaces/closealertinfo.md) |

**Returns:** Promise\<string>

___

### setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:257](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L257)*

#### Parameters:

Name | Type |
------ | ------ |
`screenOrientation` | [ScreenOrientation](../enums/screenorientation.md) |

**Returns:** Promise\<string>

___

### shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](../interfaces/shareinfotype.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:245](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L245)*

#### Parameters:

Name | Type |
------ | ------ |
`info` | [ShareInfoType](../interfaces/shareinfotype.md) |

**Returns:** Promise\<string>

___

### showInterstitialAd

▸ **showInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:237](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L237)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### showRewardedAd

▸ **showRewardedAd**(`id`: string): Promise\<[Reward](../interfaces/reward.md)>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:241](https://github.com/rakutentech/js-miniapp/blob/424c7de/js-miniapp-sdk/src/miniapp.ts#L241)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Reward](../interfaces/reward.md)>
