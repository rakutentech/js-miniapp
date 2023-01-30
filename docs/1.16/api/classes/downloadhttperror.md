**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / DownloadHttpError

# Class: DownloadHttpError

Error returned by `MiniApp.downloadFile` when failed to download the file due to an HTTP error.

**`param`** HTTP error code returned by the server.

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **DownloadHttpError**

## Index

### Constructors

* [constructor](downloadhttperror.md#constructor)

### Properties

* [code](downloadhttperror.md#code)
* [errorInput](downloadhttperror.md#errorinput)
* [message](downloadhttperror.md#message)
* [name](downloadhttperror.md#name)
* [stack](downloadhttperror.md#stack)

## Constructors

### constructor

\+ **new DownloadHttpError**(`errorInput`: [MiniAppDownloadError](../interfaces/miniappdownloaderror.md)): [DownloadHttpError](downloadhttperror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/download-file-errors.ts:53](https://github.com/rakutentech/js-miniapp/blob/d3d09f7/js-miniapp-bridge/src/types/error-types/download-file-errors.ts#L53)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppDownloadError](../interfaces/miniappdownloaderror.md) |

**Returns:** [DownloadHttpError](downloadhttperror.md)

## Properties

### code

•  **code**: number

*Defined in [js-miniapp-bridge/src/types/error-types/download-file-errors.ts:53](https://github.com/rakutentech/js-miniapp/blob/d3d09f7/js-miniapp-bridge/src/types/error-types/download-file-errors.ts#L53)*

___

### errorInput

•  **errorInput**: [MiniAppDownloadError](../interfaces/miniappdownloaderror.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/download-file-errors.ts:55](https://github.com/rakutentech/js-miniapp/blob/d3d09f7/js-miniapp-bridge/src/types/error-types/download-file-errors.ts#L55)*

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
