**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / LogType

# Class: LogType

Enum representing the types of logs.

## Hierarchy

* **LogType**

## Index

### Enumeration members

* [DEBUG](logtype.md#debug)
* [ERROR](logtype.md#error)
* [INFO](logtype.md#info)

### Properties

* [icon](logtype.md#icon)
* [type](logtype.md#type)
* [debug](logtype.md#debug)
* [error](logtype.md#error)
* [log](logtype.md#log)
* [warn](logtype.md#warn)

## Enumeration members

### DEBUG

•  **DEBUG**: {} = "debug"

*Defined in [js-miniapp-bridge/src/types/log-type.ts:8](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/types/log-type.ts#L8)*

Debug log type.

___

### ERROR

•  **ERROR**: {} = "error"

*Defined in [js-miniapp-bridge/src/types/log-type.ts:18](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/types/log-type.ts#L18)*

Error log type.

___

### INFO

•  **INFO**: {} = "info"

*Defined in [js-miniapp-bridge/src/types/log-type.ts:13](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/types/log-type.ts#L13)*

Info log type.

## Properties

### icon

• `Readonly` **icon**: string

*Defined in [js-miniapp-bridge/src/common-log.ts:46](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/common-log.ts#L46)*

___

### type

• `Readonly` **type**: string

*Defined in [js-miniapp-bridge/src/common-log.ts:46](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/common-log.ts#L46)*

___

### debug

▪ `Static` `Readonly` **debug**: LogType = new LogType('debug', '📘')

*Defined in [js-miniapp-bridge/src/common-log.ts:41](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/common-log.ts#L41)*

___

### error

▪ `Static` `Readonly` **error**: LogType = new LogType('error', '📕')

*Defined in [js-miniapp-bridge/src/common-log.ts:44](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/common-log.ts#L44)*

___

### log

▪ `Static` `Readonly` **log**: LogType = new LogType('log', '📗')

*Defined in [js-miniapp-bridge/src/common-log.ts:42](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/common-log.ts#L42)*

___

### warn

▪ `Static` `Readonly` **warn**: LogType = new LogType('warning', '📙')

*Defined in [js-miniapp-bridge/src/common-log.ts:43](https://github.com/rakutentech/js-miniapp/blob/53049ef/js-miniapp-bridge/src/common-log.ts#L43)*
