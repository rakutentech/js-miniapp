**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / AudienceNotSupportedError

# Class: AudienceNotSupportedError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **AudienceNotSupportedError**

## Index

### Constructors

* [constructor](audiencenotsupportederror.md#constructor)

### Properties

* [errorInput](audiencenotsupportederror.md#errorinput)
* [message](audiencenotsupportederror.md#message)
* [name](audiencenotsupportederror.md#name)
* [stack](audiencenotsupportederror.md#stack)

## Constructors

### constructor

\+ **new AudienceNotSupportedError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [AudienceNotSupportedError](audiencenotsupportederror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/auth-errors.ts:9](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/auth-errors.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [AudienceNotSupportedError](audiencenotsupportederror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/auth-errors.ts:10](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/auth-errors.ts#L10)*

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
