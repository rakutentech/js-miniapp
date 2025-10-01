**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / UserCancelledPurchaseError

# Class: UserCancelledPurchaseError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **UserCancelledPurchaseError**

## Index

### Constructors

* [constructor](usercancelledpurchaseerror.md#constructor)

### Properties

* [errorInput](usercancelledpurchaseerror.md#errorinput)
* [message](usercancelledpurchaseerror.md#message)
* [name](usercancelledpurchaseerror.md#name)
* [stack](usercancelledpurchaseerror.md#stack)

## Constructors

### constructor

\+ **new UserCancelledPurchaseError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [UserCancelledPurchaseError](usercancelledpurchaseerror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:45](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L45)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [UserCancelledPurchaseError](usercancelledpurchaseerror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:46](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L46)*

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
