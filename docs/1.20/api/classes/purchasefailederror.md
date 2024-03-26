**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / PurchaseFailedError

# Class: PurchaseFailedError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **PurchaseFailedError**

## Index

### Constructors

* [constructor](purchasefailederror.md#constructor)

### Properties

* [errorInput](purchasefailederror.md#errorinput)
* [message](purchasefailederror.md#message)
* [name](purchasefailederror.md#name)
* [stack](purchasefailederror.md#stack)

## Constructors

### constructor

\+ **new PurchaseFailedError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [PurchaseFailedError](purchasefailederror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:11](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L11)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [PurchaseFailedError](purchasefailederror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:12](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L12)*

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
