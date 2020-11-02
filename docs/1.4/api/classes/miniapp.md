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
* [setScreenOrientation](miniapp.md#setscreenorientation)
* [shareInfo](miniapp.md#shareinfo)
* [showInterstitialAd](miniapp.md#showinterstitialad)
* [showRewardedAd](miniapp.md#showrewardedad)

## Properties

### `Private` bridge

• **bridge**: *MiniAppBridge* = (window as any).MiniAppBridge

*Defined in [js-miniapp-sdk/src/miniapp.ts:127](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L127)*

___

###  user

• **user**: *[UserInfoProvider](../interfaces/userinfoprovider.md)* = new UserInfo(this.bridge)

*Defined in [js-miniapp-sdk/src/miniapp.ts:128](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L128)*

## Methods

###  getPlatform

▸ **getPlatform**(): *string*

*Implementation of [Platform](../interfaces/platform.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:170](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L170)*

**Returns:** *string*

___

###  getUniqueId

▸ **getUniqueId**(): *Promise‹string›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:134](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L134)*

**Returns:** *Promise‹string›*

___

###  loadInterstitialAd

▸ **loadInterstitialAd**(`id`: string): *Promise‹string›*

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:150](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹string›*

___

###  loadRewardedAd

▸ **loadRewardedAd**(`id`: string): *Promise‹string›*

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:154](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L154)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹string›*

___

###  requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](../interfaces/custompermission.md)[]): *Promise‹[CustomPermissionResult](../interfaces/custompermissionresult.md)[]›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:142](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L142)*

**Parameters:**

Name | Type |
------ | ------ |
`permissions` | [CustomPermission](../interfaces/custompermission.md)[] |

**Returns:** *Promise‹[CustomPermissionResult](../interfaces/custompermissionresult.md)[]›*

___

###  requestLocationPermission

▸ **requestLocationPermission**(): *Promise‹string›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:138](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L138)*

**Returns:** *Promise‹string›*

___

### `Private` requestPermission

▸ **requestPermission**(`permissionType`: [DevicePermission](../enums/devicepermission.md)): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:130](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`permissionType` | [DevicePermission](../enums/devicepermission.md) |

**Returns:** *Promise‹string›*

___

###  setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): *Promise‹string›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:178](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`screenOrientation` | [ScreenOrientation](../enums/screenorientation.md) |

**Returns:** *Promise‹string›*

___

###  shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](../interfaces/shareinfotype.md)): *Promise‹string›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:166](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L166)*

**Parameters:**

Name | Type |
------ | ------ |
`info` | [ShareInfoType](../interfaces/shareinfotype.md) |

**Returns:** *Promise‹string›*

___

###  showInterstitialAd

▸ **showInterstitialAd**(`id`: string): *Promise‹string›*

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:158](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L158)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹string›*

___

###  showRewardedAd

▸ **showRewardedAd**(`id`: string): *Promise‹[Reward](../interfaces/reward.md)›*

*Implementation of [Ad](../interfaces/ad.md)*

*Defined in [js-miniapp-sdk/src/miniapp.ts:162](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[Reward](../interfaces/reward.md)›*
