**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / SimCheckError

# Class: SimCheckError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **SimCheckError**

## Index

### Constructors

* [constructor](simcheckerror.md#constructor)

### Properties

* [errorInput](simcheckerror.md#errorinput)
* [message](simcheckerror.md#message)
* [name](simcheckerror.md#name)
* [stack](simcheckerror.md#stack)

## Constructors

### constructor

\+ **new SimCheckError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [SimCheckError](simcheckerror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/sim-errors.ts:8](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-bridge/src/types/error-types/sim-errors.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [SimCheckError](simcheckerror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/sim-errors.ts:9](https://github.com/rakutentech/js-miniapp/blob/5bf7443/js-miniapp-bridge/src/types/error-types/sim-errors.ts#L9)*

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
