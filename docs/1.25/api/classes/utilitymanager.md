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
* [launchAppSettings](utilitymanager.md#launchappsettings)
* [logEvent](utilitymanager.md#logevent)

## Constructors

### constructor

\+ **new UtilityManager**(`executor`: PlatformExecutor): [UtilityManager](utilitymanager.md)

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:8](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/utility-manager.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`executor` | PlatformExecutor |

**Returns:** [UtilityManager](utilitymanager.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:7](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/utility-manager.ts#L7)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:8](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/utility-manager.ts#L8)*

## Methods

### getPermissionStatus

▸ **getPermissionStatus**(`permissionName`: [PermissionName](../enums/permissionname.md)): Promise\<string>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:39](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/utility-manager.ts#L39)*

Request permission status from host

#### Parameters:

Name | Type |
------ | ------ |
`permissionName` | [PermissionName](../enums/permissionname.md) |

**Returns:** Promise\<string>

permission status of 'granted', 'denied' or 'unknown'

___

### launchAppSettings

▸ **launchAppSettings**(): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:54](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/utility-manager.ts#L54)*

Trigger launchAppSettings from host

**Returns:** Promise\<boolean>

true or false whether launch app settings is launched or not

___

### logEvent

▸ **logEvent**(`message`: string, `type?`: [LogType](logtype.md)): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:21](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/utility-manager.ts#L21)*

Sends logs to the platform.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`message` | string | - | The log message to be sent. |
`type` | [LogType](logtype.md) | LogType.DEBUG | - |

**Returns:** Promise\<boolean>

- A promise that resolves to true if the log was successfully sent, otherwise rejects with an error.
