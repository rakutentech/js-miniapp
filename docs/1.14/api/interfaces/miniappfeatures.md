**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / MiniAppFeatures

# Interface: MiniAppFeatures

A module layer for webapps and mobile native interaction.

## Hierarchy

* **MiniAppFeatures**

## Implemented by

* [MiniApp](../classes/miniapp.md)

## Index

### Methods

* [downloadFile](miniappfeatures.md#downloadfile)
* [getHostEnvironmentInfo](miniappfeatures.md#gethostenvironmentinfo)
* [getPoints](miniappfeatures.md#getpoints)
* [getUniqueId](miniappfeatures.md#getuniqueid)
* [requestCustomPermissions](miniappfeatures.md#requestcustompermissions)
* [requestLocationPermission](miniappfeatures.md#requestlocationpermission)
* [setScreenOrientation](miniappfeatures.md#setscreenorientation)
* [shareInfo](miniappfeatures.md#shareinfo)

## Methods

### downloadFile

▸ **downloadFile**(`filename`: string, `url`: string, `headers?`: [DownloadFileHeaders](downloadfileheaders.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:85](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-sdk/src/miniapp.ts#L85)*

Request a file download

#### Parameters:

Name | Type |
------ | ------ |
`filename` | string |
`url` | string |
`headers?` | [DownloadFileHeaders](downloadfileheaders.md) |

**Returns:** Promise\<string>

Promise of the downloaded files name

___

### getHostEnvironmentInfo

▸ **getHostEnvironmentInfo**(): Promise\<[HostEnvironmentInfo](hostenvironmentinfo.md)>

*Defined in [js-miniapp-sdk/src/miniapp.ts:79](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-sdk/src/miniapp.ts#L79)*

Request the host environment information.

**Returns:** Promise\<[HostEnvironmentInfo](hostenvironmentinfo.md)>

Promise of the provided environment info from mini app.

___

### getPoints

▸ **getPoints**(): Promise\<[Points](points.md)>

*Defined in [js-miniapp-sdk/src/miniapp.ts:73](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-sdk/src/miniapp.ts#L73)*

Request the point balance from the host app.

**Returns:** Promise\<[Points](points.md)>

Promise of the provided point balance from mini app.

___

### getUniqueId

▸ **getUniqueId**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:28](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-sdk/src/miniapp.ts#L28)*

Request the mini app's unique id from the host app.

**Returns:** Promise\<string>

The Promise of provided id of mini app from injected side.

___

### requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](custompermission.md)[]): Promise\<[CustomPermissionResult](custompermissionresult.md)[]>

*Defined in [js-miniapp-sdk/src/miniapp.ts:50](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-sdk/src/miniapp.ts#L50)*

Request that the user grant custom permissions related to accessing user data.
Typically, this will show a dialog in the Host App asking the user grant access to your Mini App.
You can pass multiple permissions at once and the Host App will request all of those permissions within a single dialog.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`permissions` | [CustomPermission](custompermission.md)[] | An array containing CustomPermission objects - permission name and description |

**Returns:** Promise\<[CustomPermissionResult](custompermissionresult.md)[]>

Promise with the custom permission results - "ALLOWED" or "DENIED" for each permission

___

### requestLocationPermission

▸ **requestLocationPermission**(`permissionDescription?`: string): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:39](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-sdk/src/miniapp.ts#L39)*

Request the location permission from the host app.
You must call this before using `navigator.geolocation`.
This will request both the Android/iOS device permission for location (if not yet granted to the host app),
and the custom permission for location [CustomPermissionName.LOCATION](../enums/custompermissionname.md#location).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`permissionDescription?` | string | Description of location permission. |

**Returns:** Promise\<string>

The Promise of permission result of mini app from injected side.
Rejects the promise if the user denied the location permission (either the device permission or custom permission).

___

### setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:67](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-sdk/src/miniapp.ts#L67)*

Swap and lock the screen orientation.
There is no guarantee that all hostapps and devices allow the force screen change so MiniApp should not rely on this.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`screenOrientation` | [ScreenOrientation](../enums/screenorientation.md) | The action that miniapp wants to request on device. |

**Returns:** Promise\<string>

The Promise of screen action state from injected side.

___

### shareInfo

▸ **shareInfo**(`info`: [ShareInfoType](shareinfotype.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:59](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-sdk/src/miniapp.ts#L59)*

Share text data with another App or with the host app.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`info` | [ShareInfoType](shareinfotype.md) | The shared data must match the property in [ShareInfoType]. |

**Returns:** Promise\<string>

The Promise of share info action state from injected side.
