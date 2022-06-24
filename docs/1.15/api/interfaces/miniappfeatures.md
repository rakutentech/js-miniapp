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
* [getMauid](miniappfeatures.md#getmauid)
* [getMessagingUniqueId](miniappfeatures.md#getmessaginguniqueid)
* [getPoints](miniappfeatures.md#getpoints)
* [getUniqueId](miniappfeatures.md#getuniqueid)
* [requestCustomPermissions](miniappfeatures.md#requestcustompermissions)
* [requestLocationPermission](miniappfeatures.md#requestlocationpermission)
* [setCloseAlert](miniappfeatures.md#setclosealert)
* [setScreenOrientation](miniappfeatures.md#setscreenorientation)
* [shareInfo](miniappfeatures.md#shareinfo)

## Methods

### downloadFile

▸ **downloadFile**(`filename`: string, `url`: string, `headers?`: [DownloadFileHeaders](downloadfileheaders.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:100](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L100)*

Request to download a file and save to the user's device.

#### Parameters:

Name | Type |
------ | ------ |
`filename` | string |
`url` | string |
`headers?` | [DownloadFileHeaders](downloadfileheaders.md) |

**Returns:** Promise\<string>

Promise of the downloaded files name. Response will be `null` in case the user cancelled the download.
Can be rejected with [MiniAppError](../classes/miniapperror.md), [DownloadFailedError](../enums/miniappdownloaderrortype.md#downloadfailederror), [DownloadHttpError](../enums/miniappdownloaderrortype.md#downloadhttperror), [InvalidUrlError](../enums/miniappdownloaderrortype.md#invalidurlerror), or [SaveFailureError](../enums/miniappdownloaderrortype.md#savefailureerror).

___

### getHostEnvironmentInfo

▸ **getHostEnvironmentInfo**(): Promise\<[HostEnvironmentInfo](hostenvironmentinfo.md)>

*Defined in [js-miniapp-sdk/src/miniapp.ts:93](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L93)*

Request the host environment information.

**Returns:** Promise\<[HostEnvironmentInfo](hostenvironmentinfo.md)>

Promise of the provided environment info from mini app.

___

### getMauid

▸ **getMauid**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:42](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L42)*

Request the mini app's mauid from the host app.

**Returns:** Promise\<string>

The Promise of provided id of mini app from injected side.

___

### getMessagingUniqueId

▸ **getMessagingUniqueId**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:36](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L36)*

Request the mini app's messaging unique id from the host app.

**Returns:** Promise\<string>

The Promise of provided id of mini app from injected side.

___

### getPoints

▸ **getPoints**(): Promise\<[Points](points.md)>

*Defined in [js-miniapp-sdk/src/miniapp.ts:87](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L87)*

Request the point balance from the host app.

**Returns:** Promise\<[Points](points.md)>

Promise of the provided point balance from mini app.

___

### getUniqueId

▸ **getUniqueId**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:30](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L30)*

Request the mini app's unique id from the host app.

**Returns:** Promise\<string>

The Promise of provided id of mini app from injected side.

___

### requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](custompermission.md)[]): Promise\<[CustomPermissionResult](custompermissionresult.md)[]>

*Defined in [js-miniapp-sdk/src/miniapp.ts:64](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L64)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:53](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L53)*

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

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](closealertinfo.md)): Promise\<undefined>

*Defined in [js-miniapp-sdk/src/miniapp.ts:109](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L109)*

Mini App can choose whether to display Close confirmation alert dialog when mini app is closed

#### Parameters:

Name | Type |
------ | ------ |
`alertInfo` | [CloseAlertInfo](closealertinfo.md) |

**Returns:** Promise\<undefined>

___

### setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:81](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L81)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:73](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/miniapp.ts#L73)*

Share text data with another App or with the host app.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`info` | [ShareInfoType](shareinfotype.md) | The shared data must match the property in [ShareInfoType]. |

**Returns:** Promise\<string>

The Promise of share info action state from injected side.
