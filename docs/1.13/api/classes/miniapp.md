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
* [user](miniapp.md#user)

### Methods

* [getHostEnvironmentInfo](miniapp.md#gethostenvironmentinfo)
* [getPlatform](miniapp.md#getplatform)
* [getPoints](miniapp.md#getpoints)
* [getUniqueId](miniapp.md#getuniqueid)
* [loadInterstitialAd](miniapp.md#loadinterstitialad)
* [loadRewardedAd](miniapp.md#loadrewardedad)
* [requestCustomPermissions](miniapp.md#requestcustompermissions)
* [requestLocationPermission](miniapp.md#requestlocationpermission)
* [setScreenOrientation](miniapp.md#setscreenorientation)
* [shareInfo](miniapp.md#shareinfo)
* [showInterstitialAd](miniapp.md#showinterstitialad)
* [showRewardedAd](miniapp.md#showrewardedad)

## Properties

### chatService

•  **chatService**: ChatService = new ChatService()

*Defined in [js-miniapp-sdk/src/miniapp.ts:130](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L130)*

___

### user

•  **user**: [UserInfoProvider](../interfaces/userinfoprovider.md) = new UserInfo()

*Defined in [js-miniapp-sdk/src/miniapp.ts:129](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L129)*

## Methods

### getHostEnvironmentInfo

▸ **getHostEnvironmentInfo**(): Promise\<[HostEnvironmentInfo](../interfaces/hostenvironmentinfo.md)>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:215](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L215)*

**Returns:** Promise\<[HostEnvironmentInfo](../interfaces/hostenvironmentinfo.md)>

___

### getPlatform

▸ **getPlatform**(): string

*Defined in [js-miniapp-sdk/src/miniapp.ts:199](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L199)*

**Returns:** string

___

### getPoints

▸ **getPoints**(): Promise\<[Points](../interfaces/points.md)>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:211](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L211)*

**Returns:** Promise\<[Points](../interfaces/points.md)>

___

### getUniqueId

▸ **getUniqueId**(): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:136](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L136)*

**Returns:** Promise\<string>

___

### loadInterstitialAd

▸ **loadInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:179](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L179)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### loadRewardedAd

▸ **loadRewardedAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:183](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L183)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](../interfaces/custompermission.md)[]): Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:171](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L171)*

#### Parameters:

Name | Type |
------ | ------ |
`permissions` | [CustomPermission](../interfaces/custompermission.md)[] |

**Returns:** Promise\<[CustomPermissionResult](../interfaces/custompermissionresult.md)[]>

___

### requestLocationPermission

▸ **requestLocationPermission**(`permissionDescription?`: string): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:140](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L140)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`permissionDescription` | string | "" |

**Returns:** Promise\<string>

___

### setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:207](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L207)*

#### Parameters:

Name | Type |
------ | ------ |
`screenOrientation` | [ScreenOrientation](../enums/screenorientation.md) |

**Returns:** Promise\<string>

___

### shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](../interfaces/shareinfotype.md)): Promise\<string>

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:195](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L195)*

#### Parameters:

Name | Type |
------ | ------ |
`info` | [ShareInfoType](../interfaces/shareinfotype.md) |

**Returns:** Promise\<string>

___

### showInterstitialAd

▸ **showInterstitialAd**(`id`: string): Promise\<string>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:187](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L187)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<string>

___

### showRewardedAd

▸ **showRewardedAd**(`id`: string): Promise\<[Reward](../interfaces/reward.md)>

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:191](https://github.com/rakutentech/js-miniapp/blob/68a59c0/js-miniapp-sdk/src/miniapp.ts#L191)*

#### Parameters:

Name | Type |
------ | ------ |
`id` | string |

**Returns:** Promise\<[Reward](../interfaces/reward.md)>
