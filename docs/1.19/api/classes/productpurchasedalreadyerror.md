**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / ProductPurchasedAlreadyError

# Class: ProductPurchasedAlreadyError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **ProductPurchasedAlreadyError**

## Index

### Constructors

* [constructor](productpurchasedalreadyerror.md#constructor)

### Properties

* [errorInput](productpurchasedalreadyerror.md#errorinput)
* [message](productpurchasedalreadyerror.md#message)
* [name](productpurchasedalreadyerror.md#name)
* [stack](productpurchasedalreadyerror.md#stack)

## Constructors

### constructor

\+ **new ProductPurchasedAlreadyError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [ProductPurchasedAlreadyError](productpurchasedalreadyerror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:37](https://github.com/rakutentech/js-miniapp/blob/1b5a7fb/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L37)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [ProductPurchasedAlreadyError](productpurchasedalreadyerror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:38](https://github.com/rakutentech/js-miniapp/blob/1b5a7fb/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L38)*

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
