**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / InternalBrowserError

# Class: InternalBrowserError

## Hierarchy

* [MiniAppJson](../interfaces/miniappjson.md)

* [MiniAppError](miniapperror.md)

  ↳ **InternalBrowserError**

## Index

### Constructors

* [constructor](internalbrowsererror.md#constructor)

### Properties

* [code](internalbrowsererror.md#code)
* [errorInput](internalbrowsererror.md#errorinput)
* [message](internalbrowsererror.md#message)
* [name](internalbrowsererror.md#name)
* [stack](internalbrowsererror.md#stack)
* [type](internalbrowsererror.md#type)

## Constructors

### constructor

\+ **new InternalBrowserError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [InternalBrowserError](internalbrowsererror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/internal-browser-error.ts:20](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/internal-browser-error.ts#L20)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [InternalBrowserError](internalbrowsererror.md)

## Properties

### code

•  **code**: [InternalBrowserErrorType](../enums/internalbrowsererrortype.md)

*Defined in [js-miniapp-bridge/src/types/error-types/internal-browser-error.ts:15](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/internal-browser-error.ts#L15)*

*Defined in [js-miniapp-bridge/src/types/error-types/internal-browser-error.ts:20](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/internal-browser-error.ts#L20)*

___

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Inherited from [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/mini-app-error.ts:10](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/mini-app-error.ts#L10)*

___

### message

•  **message**: string

*Overrides [MiniAppJson](../interfaces/miniappjson.md).[message](../interfaces/miniappjson.md#message)*

*Defined in [js-miniapp-bridge/src/types/error-types/internal-browser-error.ts:16](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/internal-browser-error.ts#L16)*

___

### name

•  **name**: string

*Inherited from [MiniAppError](miniapperror.md).[name](miniapperror.md#name)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:1053*

___

### stack

• `Optional` **stack**: string

*Inherited from [MiniAppError](miniapperror.md).[stack](miniapperror.md#stack)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:1055*

___

### type

• `Optional` **type**: string

*Inherited from [MiniAppJson](../interfaces/miniappjson.md).[type](../interfaces/miniappjson.md#type)*

*Defined in [js-miniapp-bridge/src/types/error-types/mini-app-error.ts:3](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/mini-app-error.ts#L3)*
