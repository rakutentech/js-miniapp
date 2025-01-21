**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / SecureStorageIOError

# Class: SecureStorageIOError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **SecureStorageIOError**

## Index

### Constructors

* [constructor](securestorageioerror.md#constructor)

### Properties

* [errorInput](securestorageioerror.md#errorinput)
* [message](securestorageioerror.md#message)
* [name](securestorageioerror.md#name)
* [stack](securestorageioerror.md#stack)

## Constructors

### constructor

\+ **new SecureStorageIOError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [SecureStorageIOError](securestorageioerror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts:34](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts#L34)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [SecureStorageIOError](securestorageioerror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts:35](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts#L35)*

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
