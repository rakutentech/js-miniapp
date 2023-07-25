**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / ProductNotFoundError

# Class: ProductNotFoundError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **ProductNotFoundError**

## Index

### Constructors

* [constructor](productnotfounderror.md#constructor)

### Properties

* [errorInput](productnotfounderror.md#errorinput)
* [message](productnotfounderror.md#message)
* [name](productnotfounderror.md#name)
* [stack](productnotfounderror.md#stack)

## Constructors

### constructor

\+ **new ProductNotFoundError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [ProductNotFoundError](productnotfounderror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:28](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L28)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [ProductNotFoundError](productnotfounderror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:29](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L29)*

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
