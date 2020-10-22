[js-miniapp-bridge - v1.1.0](../README.md) › [MiniApp](miniapp.md)

# Class: MiniApp

## Hierarchy

* **MiniApp**

## Implements

* [MiniAppFeatures](../interfaces/miniappfeatures.md)
* [Ad](../interfaces/ad.md)
* [Platform](../interfaces/platform.md)

## Index

### Properties

* [bridge](miniapp.md#private-bridge)
* [user](miniapp.md#user)

### Methods

* [getPlatform](miniapp.md#getplatform)
* [getUniqueId](miniapp.md#getuniqueid)
* [loadInterstitialAd](miniapp.md#loadinterstitialad)
* [loadRewardedAd](miniapp.md#loadrewardedad)
* [requestCustomPermissions](miniapp.md#requestcustompermissions)
* [requestLocationPermission](miniapp.md#requestlocationpermission)
* [requestPermission](miniapp.md#private-requestpermission)
* [shareInfo](miniapp.md#shareinfo)
* [showInterstitialAd](miniapp.md#showinterstitialad)
* [showRewardedAd](miniapp.md#showrewardedad)

## Properties

### `Private` bridge

• **bridge**: *MiniAppBridge* = (window as any).MiniAppBridge

*Defined in [js-miniapp-sdk/src/miniapp.ts:118](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L118)*

___

###  user

• **user**: *[UserInfoProvider](../interfaces/userinfoprovider.md)* = new UserInfo(this.bridge)

*Defined in [js-miniapp-sdk/src/miniapp.ts:119](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L119)*

## Methods

###  getPlatform

▸ **getPlatform**(): *string*

*Implementation of [Platform](../interfaces/platform.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:161](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L161)*

**Returns:** *string*

___

###  getUniqueId

▸ **getUniqueId**(): *Promise‹string›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:125](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L125)*

**Returns:** *Promise‹string›*

___

###  loadInterstitialAd

▸ **loadInterstitialAd**(`id`: string): *Promise‹string›*

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:141](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L141)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹string›*

___

###  loadRewardedAd

▸ **loadRewardedAd**(`id`: string): *Promise‹string›*

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:145](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹string›*

___

###  requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](../interfaces/custompermission.md)[]): *Promise‹[CustomPermissionResult](../interfaces/custompermissionresult.md)[]›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:133](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L133)*

**Parameters:**

Name | Type |
------ | ------ |
`permissions` | [CustomPermission](../interfaces/custompermission.md)[] |

**Returns:** *Promise‹[CustomPermissionResult](../interfaces/custompermissionresult.md)[]›*

___

###  requestLocationPermission

▸ **requestLocationPermission**(): *Promise‹string›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:129](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L129)*

**Returns:** *Promise‹string›*

___

### `Private` requestPermission

▸ **requestPermission**(`permissionType`: [DevicePermission](../enums/devicepermission.md)): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:121](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L121)*

**Parameters:**

Name | Type |
------ | ------ |
`permissionType` | [DevicePermission](../enums/devicepermission.md) |

**Returns:** *Promise‹string›*

___

###  shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](../interfaces/shareinfotype.md)): *Promise‹string›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:157](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`info` | [ShareInfoType](../interfaces/shareinfotype.md) |

**Returns:** *Promise‹string›*

___

###  showInterstitialAd

▸ **showInterstitialAd**(`id`: string): *Promise‹string›*

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:149](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L149)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹string›*

___

###  showRewardedAd

▸ **showRewardedAd**(`id`: string): *Promise‹[Reward](../interfaces/reward.md)›*

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:153](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L153)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[Reward](../interfaces/reward.md)›*
