**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / DownloadFailedError

# Class: DownloadFailedError

Error returned by `MiniApp.downloadFile` when failed to download or save the file.

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **DownloadFailedError**

## Index

### Constructors

* [constructor](downloadfailederror.md#constructor)

### Properties

* [errorInput](downloadfailederror.md#errorinput)
* [message](downloadfailederror.md#message)
* [name](downloadfailederror.md#name)
* [stack](downloadfailederror.md#stack)

## Constructors

### constructor

\+ **new DownloadFailedError**(`errorInput`: [MiniAppDownloadError](../interfaces/miniappdownloaderror.md)): [DownloadFailedError](downloadfailederror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/download-file-errors.ts:17](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/types/error-types/download-file-errors.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppDownloadError](../interfaces/miniappdownloaderror.md) |

**Returns:** [DownloadFailedError](downloadfailederror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppDownloadError](../interfaces/miniappdownloaderror.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/download-file-errors.ts:18](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-bridge/src/types/error-types/download-file-errors.ts#L18)*

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
