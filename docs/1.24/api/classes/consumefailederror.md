**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / ConsumeFailedError

# Class: ConsumeFailedError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **ConsumeFailedError**

## Index

### Constructors

* [constructor](consumefailederror.md#constructor)

### Properties

* [errorInput](consumefailederror.md#errorinput)
* [message](consumefailederror.md#message)
* [name](consumefailederror.md#name)
* [stack](consumefailederror.md#stack)

## Constructors

### constructor

\+ **new ConsumeFailedError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [ConsumeFailedError](consumefailederror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:19](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L19)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [ConsumeFailedError](consumefailederror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:20](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L20)*

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
