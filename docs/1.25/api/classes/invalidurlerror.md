**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / InvalidUrlError

# Class: InvalidUrlError

Error returned by `MiniApp.downloadFile` when the provided URL is invalid.
Only `http:`, `https:` and `data:` URLs are supported.

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **InvalidUrlError**

## Index

### Constructors

* [constructor](invalidurlerror.md#constructor)

### Properties

* [errorInput](invalidurlerror.md#errorinput)
* [message](invalidurlerror.md#message)
* [name](invalidurlerror.md#name)
* [stack](invalidurlerror.md#stack)

## Constructors

### constructor

\+ **new InvalidUrlError**(`errorInput`: [MiniAppDownloadError](../interfaces/miniappdownloaderror.md)): [InvalidUrlError](invalidurlerror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/download-file-errors.ts:29](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/types/error-types/download-file-errors.ts#L29)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppDownloadError](../interfaces/miniappdownloaderror.md) |

**Returns:** [InvalidUrlError](invalidurlerror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppDownloadError](../interfaces/miniappdownloaderror.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/download-file-errors.ts:30](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/types/error-types/download-file-errors.ts#L30)*

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
