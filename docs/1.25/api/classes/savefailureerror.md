**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / SaveFailureError

# Class: SaveFailureError

Error returned by `MiniApp.downloadFile` when failed to save file to device.

## Hierarchy

* [MiniAppError](miniapperror.md)

  ↳ **SaveFailureError**

## Index

### Constructors

* [constructor](savefailureerror.md#constructor)

### Properties

* [errorInput](savefailureerror.md#errorinput)
* [message](savefailureerror.md#message)
* [name](savefailureerror.md#name)
* [stack](savefailureerror.md#stack)

## Constructors

### constructor

\+ **new SaveFailureError**(`errorInput`: [MiniAppDownloadError](../interfaces/miniappdownloaderror.md)): [SaveFailureError](savefailureerror.md)

*Overrides [MiniAppError](miniapperror.md).[constructor](miniapperror.md#constructor)*

*Defined in [js-miniapp-bridge/src/types/error-types/download-file-errors.ts:40](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/types/error-types/download-file-errors.ts#L40)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppDownloadError](../interfaces/miniappdownloaderror.md) |

**Returns:** [SaveFailureError](savefailureerror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppDownloadError](../interfaces/miniappdownloaderror.md)

*Overrides [MiniAppError](miniapperror.md).[errorInput](miniapperror.md#errorinput)*

*Defined in [js-miniapp-bridge/src/types/error-types/download-file-errors.ts:41](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/types/error-types/download-file-errors.ts#L41)*

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
