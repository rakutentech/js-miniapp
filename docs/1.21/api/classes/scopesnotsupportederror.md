**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / ScopesNotSupportedError

# Class: ScopesNotSupportedError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **ScopesNotSupportedError**

## Index

### Constructors

* [constructor](scopesnotsupportederror.md#constructor)

### Properties

* [errorInput](scopesnotsupportederror.md#errorinput)
* [message](scopesnotsupportederror.md#message)
* [name](scopesnotsupportederror.md#name)
* [stack](scopesnotsupportederror.md#stack)

## Constructors

### constructor

\+ **new ScopesNotSupportedError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [ScopesNotSupportedError](scopesnotsupportederror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/auth-errors.ts:17](https://github.com/rakutentech/js-miniapp/blob/e6e9208/js-miniapp-bridge/src/types/error-types/auth-errors.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [ScopesNotSupportedError](scopesnotsupportederror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/auth-errors.ts:18](https://github.com/rakutentech/js-miniapp/blob/e6e9208/js-miniapp-bridge/src/types/error-types/auth-errors.ts#L18)*

___

### message

•  **message**: string

*Inherited from [MiniAppError](miniapperror.md).[message](miniapperror.md#message)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:1054*

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
