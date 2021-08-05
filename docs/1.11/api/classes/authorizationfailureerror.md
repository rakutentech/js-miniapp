**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / AuthorizationFailureError

# Class: AuthorizationFailureError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **AuthorizationFailureError**

## Index

### Constructors

* [constructor](authorizationfailureerror.md#constructor)

### Properties

* [errorInput](authorizationfailureerror.md#errorinput)
* [message](authorizationfailureerror.md#message)
* [name](authorizationfailureerror.md#name)
* [stack](authorizationfailureerror.md#stack)

## Constructors

### constructor

\+ **new AuthorizationFailureError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [AuthorizationFailureError](authorizationfailureerror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/index.ts:59](https://github.com/rakutentech/js-miniapp/blob/549763f/js-miniapp-bridge/src/types/error-types/index.ts#L59)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [AuthorizationFailureError](authorizationfailureerror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/index.ts:60](https://github.com/rakutentech/js-miniapp/blob/549763f/js-miniapp-bridge/src/types/error-types/index.ts#L60)*

___

### message

•  **message**: string

*Inherited from [MiniAppError](miniapperror.md).[message](miniapperror.md#message)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:974*

___

### name

•  **name**: string

*Inherited from [MiniAppError](miniapperror.md).[name](miniapperror.md#name)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:973*

___

### stack

• `Optional` **stack**: string

*Inherited from [MiniAppError](miniapperror.md).[stack](miniapperror.md#stack)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:975*
