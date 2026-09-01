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
* [requestPermission](miniappfeatures.md#requestpermission)
* [setCloseAlert](miniappfeatures.md#setclosealert)
* [setScreenOrientation](miniappfeatures.md#setscreenorientation)
* [shareInfo](miniappfeatures.md#shareinfo)

## Methods

### downloadFile

▸ **downloadFile**(`filename`: string, `url`: string, `headers?`: [DownloadFileHeaders](downloadfileheaders.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:123](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L123)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:116](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L116)*

Request the host environment information.

**Returns:** Promise\<[HostEnvironmentInfo](hostenvironmentinfo.md)>

Promise of the provided environment info from mini app.

___

### getMauid

▸ **getMauid**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:57](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L57)*

Request the mini app's mauid from the host app.

**Returns:** Promise\<string>

The Promise of provided id of mini app from injected side.

___

### getMessagingUniqueId

▸ **getMessagingUniqueId**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:51](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L51)*

Request the mini app's messaging unique id from the host app.

**Returns:** Promise\<string>

The Promise of provided id of mini app from injected side.

___

### getPoints

▸ **getPoints**(): Promise\<[Points](points.md)>

*Defined in [js-miniapp-sdk/src/miniapp.ts:110](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L110)*

Request the point balance from the host app.

**Returns:** Promise\<[Points](points.md)>

Promise of the provided point balance from mini app.

___

### getUniqueId

▸ **getUniqueId**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:45](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L45)*

**`deprecated`** 
Use `getMessagingUniqueId` or `getMauid` instead
Request the mini app's unique id from the host app.

**Returns:** Promise\<string>

The Promise of provided id of mini app from injected side.

___

### requestCustomPermissions

▸ **requestCustomPermissions**(`permissions`: [CustomPermission](custompermission.md)[]): Promise\<[CustomPermissionResult](custompermissionresult.md)[]>

*Defined in [js-miniapp-sdk/src/miniapp.ts:87](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L87)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:68](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L68)*

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

### requestPermission

▸ **requestPermission**(`permissionType`: [DevicePermission](../enums/devicepermission.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:76](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L76)*

Request a device permission from the host app.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`permissionType` | [DevicePermission](../enums/devicepermission.md) | The type of device permission to request e.g. DevicePermission.LOCATION, DevicePermission.PHONE_STATE |

**Returns:** Promise\<string>

The Promise of permission result ('ALLOWED' or 'DENIED') from the host app.
Rejects the promise if the permission is denied.

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](closealertinfo.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:132](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L132)*

Mini App can choose whether to display Close confirmation alert dialog when mini app is closed

#### Parameters:

Name | Type |
------ | ------ |
`alertInfo` | [CloseAlertInfo](closealertinfo.md) |

**Returns:** Promise\<string>

___

### setScreenOrientation

▸ **setScreenOrientation**(`screenOrientation`: [ScreenOrientation](../enums/screenorientation.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/miniapp.ts:104](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L104)*

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

*Defined in [js-miniapp-sdk/src/miniapp.ts:96](https://github.com/rakutentech/js-miniapp/blob/939c227/js-miniapp-sdk/src/miniapp.ts#L96)*

Share text and image with another App or with the host app.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`info` | [ShareInfoType](shareinfotype.md) | The shared data must match the property in [ShareInfoType]. |

**Returns:** Promise\<string>

The Promise of share info action state from injected side.
