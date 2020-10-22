[js-miniapp-bridge - v1.1.0](../README.md) › [MiniAppFeatures](miniappfeatures.md)

# Interface: MiniAppFeatures

A module layer for webapps and mobile native interaction.

## Hierarchy

* **MiniAppFeatures**

## Implemented by

* [MiniApp](../classes/miniapp.md)

## Index

### Methods

* [getUniqueId](miniappfeatures.md#getuniqueid)
* [requestCustomPermissions](miniappfeatures.md#requestcustompermissions)
* [requestLocationPermission](miniappfeatures.md#requestlocationpermission)
* [shareInfo](miniappfeatures.md#shareinfo)

## Methods

###  getUniqueId

▸ **getUniqueId**(): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:15](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L15)*

**Returns:** *Promise‹string›*

The Promise of provided id of mini app from injected side.

___

###  requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](custompermission.md)[]): *Promise‹[CustomPermissionResult](custompermissionresult.md)[]›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:29](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L29)*

Request that the user grant custom permissions related to accessing user data.
Typically, this will show a dialog in the Host App asking the user grant access to your Mini App.
You can pass multiple permissions at once and the Host App will request all of those permissions within a single dialog.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`permissions` | [CustomPermission](custompermission.md)[] | An array containing CustomPermission objects - permission name and description |

**Returns:** *Promise‹[CustomPermissionResult](custompermissionresult.md)[]›*

Promise with the custom permission results - "ALLOWED" or "DENIED" for each permission

___

###  requestLocationPermission

▸ **requestLocationPermission**(): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:18](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L18)*

**Returns:** *Promise‹string›*

The Promise of permission result of mini app from injected side.

___

###  shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](shareinfotype.md)): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:37](https://github.com/rakutentech/js-miniapp/blob/05cfcd6/js-miniapp-sdk/src/miniapp.ts#L37)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`info` | [ShareInfoType](shareinfotype.md) | The shared data must match the property in [ShareInfoType]. |

**Returns:** *Promise‹string›*

The Promise of share info action state from injected side.
