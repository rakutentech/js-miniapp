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
* [setScreenOrientation](miniappfeatures.md#setscreenorientation)
* [shareInfo](miniappfeatures.md#shareinfo)

## Methods

###  getUniqueId

▸ **getUniqueId**(): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:17](https://github.com/rakutentech/js-miniapp/blob/1e2f55c/js-miniapp-sdk/src/miniapp.ts#L17)*

**Returns:** *Promise‹string›*

The Promise of provided id of mini app from injected side.

___

###  requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](custompermission.md)[]): *Promise‹[CustomPermissionResult](custompermissionresult.md)[]›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:31](https://github.com/rakutentech/js-miniapp/blob/1e2f55c/js-miniapp-sdk/src/miniapp.ts#L31)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:20](https://github.com/rakutentech/js-miniapp/blob/1e2f55c/js-miniapp-sdk/src/miniapp.ts#L20)*

**Returns:** *Promise‹string›*

The Promise of permission result of mini app from injected side.

___

###  setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:47](https://github.com/rakutentech/js-miniapp/blob/1e2f55c/js-miniapp-sdk/src/miniapp.ts#L47)*

Swap and lock the screen orientation.
There is no guarantee that all hostapps and devices allow the force screen change so MiniApp should not rely on this.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`screenOrientation` | [ScreenOrientation](../enums/screenorientation.md) | The action that miniapp wants to request on device. |

**Returns:** *Promise‹string›*

The Promise of screen action state from injected side.

___

###  shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](shareinfotype.md)): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:39](https://github.com/rakutentech/js-miniapp/blob/1e2f55c/js-miniapp-sdk/src/miniapp.ts#L39)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`info` | [ShareInfoType](shareinfotype.md) | The shared data must match the property in [ShareInfoType]. |

**Returns:** *Promise‹string›*

The Promise of share info action state from injected side.
