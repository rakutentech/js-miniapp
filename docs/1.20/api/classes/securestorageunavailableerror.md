**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / SecureStorageUnavailableError

# Class: SecureStorageUnavailableError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **SecureStorageUnavailableError**

## Index

### Constructors

* [constructor](securestorageunavailableerror.md#constructor)

### Properties

* [errorInput](securestorageunavailableerror.md#errorinput)
* [message](securestorageunavailableerror.md#message)
* [name](securestorageunavailableerror.md#name)
* [stack](securestorageunavailableerror.md#stack)

## Constructors

### constructor

\+ **new SecureStorageUnavailableError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [SecureStorageUnavailableError](securestorageunavailableerror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts:26](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts#L26)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [SecureStorageUnavailableError](securestorageunavailableerror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts:27](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts#L27)*

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
