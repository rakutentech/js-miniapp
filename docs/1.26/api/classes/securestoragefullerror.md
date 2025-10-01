**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / SecureStorageFullError

# Class: SecureStorageFullError

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **SecureStorageFullError**

## Index

### Constructors

* [constructor](securestoragefullerror.md#constructor)

### Properties

* [errorInput](securestoragefullerror.md#errorinput)
* [message](securestoragefullerror.md#message)
* [name](securestoragefullerror.md#name)
* [stack](securestoragefullerror.md#stack)

## Constructors

### constructor

\+ **new SecureStorageFullError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [SecureStorageFullError](securestoragefullerror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts:10](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [SecureStorageFullError](securestoragefullerror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts:11](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts#L11)*

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
