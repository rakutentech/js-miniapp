[js-miniapp-sdk - v1.2.0](../README.md) › [MiniApp](miniapp.md)

# Class: MiniApp

## Hierarchy

* **MiniApp**

## Implements

* [MiniAppFeatures](../interfaces/miniappfeatures.md)

## Index

### Methods

* [getUniqueId](miniapp.md#getuniqueid)
* [requestCustomPermissions](miniapp.md#requestcustompermissions)
* [requestLocationPermission](miniapp.md#requestlocationpermission)
* [requestPermission](miniapp.md#private-requestpermission)
* [shareInfo](miniapp.md#shareinfo)

## Methods

###  getUniqueId

▸ **getUniqueId**(): *Promise‹string›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [miniapp.ts:44](https://github.com/rakutentech/js-miniapp/blob/2466e71/js-miniapp-sdk/src/miniapp.ts#L44)*

**Returns:** *Promise‹string›*

___

###  requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](../interfaces/custompermission.md)[]): *Promise‹[CustomPermissionResult](../interfaces/custompermissionresult.md)[]›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [miniapp.ts:52](https://github.com/rakutentech/js-miniapp/blob/2466e71/js-miniapp-sdk/src/miniapp.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`permissions` | [CustomPermission](../interfaces/custompermission.md)[] |

**Returns:** *Promise‹[CustomPermissionResult](../interfaces/custompermissionresult.md)[]›*

___

###  requestLocationPermission

▸ **requestLocationPermission**(): *Promise‹string›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [miniapp.ts:48](https://github.com/rakutentech/js-miniapp/blob/2466e71/js-miniapp-sdk/src/miniapp.ts#L48)*

**Returns:** *Promise‹string›*

___

### `Private` requestPermission

▸ **requestPermission**(`permissionType`: string): *Promise‹string›*

*Defined in [miniapp.ts:40](https://github.com/rakutentech/js-miniapp/blob/2466e71/js-miniapp-sdk/src/miniapp.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`permissionType` | string |

**Returns:** *Promise‹string›*

___

###  shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](../interfaces/shareinfotype.md)): *Promise‹string›*

*Implementation of [MiniAppFeatures](../interfaces/miniappfeatures.md)*

*Defined in [miniapp.ts:60](https://github.com/rakutentech/js-miniapp/blob/2466e71/js-miniapp-sdk/src/miniapp.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`info` | [ShareInfoType](../interfaces/shareinfotype.md) |

**Returns:** *Promise‹string›*
