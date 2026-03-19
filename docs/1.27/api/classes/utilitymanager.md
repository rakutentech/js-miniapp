**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / UtilityManager

# Class: UtilityManager

## Hierarchy

* **UtilityManager**

## Index

### Constructors

* [constructor](utilitymanager.md#constructor)

### Properties

* [executor](utilitymanager.md#executor)
* [platform](utilitymanager.md#platform)

### Methods

* [getPermissionStatus](utilitymanager.md#getpermissionstatus)
* [isAppInstalledInDevice](utilitymanager.md#isappinstalledindevice)
* [launchAppSettings](utilitymanager.md#launchappsettings)
* [launchAppUsingDeeplink](utilitymanager.md#launchappusingdeeplink)
* [launchAppUsingPackageName](utilitymanager.md#launchappusingpackagename)
* [logEvent](utilitymanager.md#logevent)

## Constructors

### constructor

\+ **new UtilityManager**(`executor`: PlatformExecutor): [UtilityManager](utilitymanager.md)

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:8](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/modules/utility-manager.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`executor` | PlatformExecutor |

**Returns:** [UtilityManager](utilitymanager.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:7](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/modules/utility-manager.ts#L7)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:8](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/modules/utility-manager.ts#L8)*

## Methods

### getPermissionStatus

▸ **getPermissionStatus**(`permissionName`: [PermissionName](../enums/permissionname.md)): Promise\<string>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:39](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/modules/utility-manager.ts#L39)*

Request permission status from host

#### Parameters:

Name | Type |
------ | ------ |
`permissionName` | [PermissionName](../enums/permissionname.md) |

**Returns:** Promise\<string>

permission status of 'granted', 'denied' or 'unknown'

___

### isAppInstalledInDevice

▸ **isAppInstalledInDevice**(`packageName`: string): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:112](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/modules/utility-manager.ts#L112)*

Checks if an application is installed on the device using a package name (Android).

**`example`** 
isAppInstalledInDevice('com.example.app')

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`packageName` | string | The package name of the application to check (e.g., 'com.example.app'). |

**Returns:** Promise\<boolean>

A promise that resolves to `true` if the application is installed, or `false` otherwise.

▸ **isAppInstalledInDevice**(`url`: string): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:123](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/modules/utility-manager.ts#L123)*

Checks if an application is installed on the device using a deeplink URL (iOS).

**`example`** 
isAppInstalledInDevice('myapp://')

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string | The deeplink URL scheme to check (e.g., 'myapp://'). |

**Returns:** Promise\<boolean>

A promise that resolves to `true` if the application is installed, or `false` otherwise.

___

### launchAppSettings

▸ **launchAppSettings**(): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:54](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/modules/utility-manager.ts#L54)*

Trigger launchAppSettings from host

**Returns:** Promise\<boolean>

true or false whether launch app settings is launched or not

___

### launchAppUsingDeeplink

▸ **launchAppUsingDeeplink**(`deeplink`: string): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:71](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/modules/utility-manager.ts#L71)*

Launches an app using the provided deeplink URL.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`deeplink` | string | The deeplink URL to use for launching the app. |

**Returns:** Promise\<boolean>

A promise that resolves to `true` if the app was launched successfully, or `false` otherwise.

___

### launchAppUsingPackageName

▸ **launchAppUsingPackageName**(`packageName`: string): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:90](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/modules/utility-manager.ts#L90)*

Launches an application on the device using its package name. Please note that this method is only applicable for Android devices.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`packageName` | string | The package name of the application to launch. |

**Returns:** Promise\<boolean>

A promise that resolves to `true` if the application was successfully launched, or `false` otherwise.

___

### logEvent

▸ **logEvent**(`message`: string, `type?`: [LogType](logtype.md)): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:21](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/modules/utility-manager.ts#L21)*

Sends logs to the platform.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`message` | string | - | The log message to be sent. |
`type` | [LogType](logtype.md) | LogType.DEBUG | - |

**Returns:** Promise\<boolean>

- A promise that resolves to true if the log was successfully sent, otherwise rejects with an error.
