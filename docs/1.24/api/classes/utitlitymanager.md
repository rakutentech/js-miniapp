**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / UtitlityManager

# Class: UtitlityManager

## Hierarchy

* **UtitlityManager**

## Index

### Constructors

* [constructor](utitlitymanager.md#constructor)

### Properties

* [executor](utitlitymanager.md#executor)
* [platform](utitlitymanager.md#platform)

### Methods

* [logEvent](utitlitymanager.md#logevent)

## Constructors

### constructor

\+ **new UtitlityManager**(`executor`: PlatformExecutor): [UtitlityManager](utitlitymanager.md)

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:7](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/modules/utility-manager.ts#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`executor` | PlatformExecutor |

**Returns:** [UtitlityManager](utitlitymanager.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:6](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/modules/utility-manager.ts#L6)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:7](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/modules/utility-manager.ts#L7)*

## Methods

### logEvent

▸ **logEvent**(`message`: string, `type?`: [LogType](logtype.md)): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/utility-manager.ts:20](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/modules/utility-manager.ts#L20)*

Sends logs to the platform.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`message` | string | - | The log message to be sent. |
`type` | [LogType](logtype.md) | LogType.DEBUG | - |

**Returns:** Promise\<boolean>

- A promise that resolves to true if the log was successfully sent, otherwise rejects with an error.
