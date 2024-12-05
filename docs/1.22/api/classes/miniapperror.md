**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / MiniAppError

# Class: MiniAppError

This class is a representation of an error sent from MiniApp mobile SDK

## Hierarchy

* [Error](miniapperror.md#error)

  ↳ **MiniAppError**

  ↳↳ [AudienceNotSupportedError](audiencenotsupportederror.md)

  ↳↳ [ScopesNotSupportedError](scopesnotsupportederror.md)

  ↳↳ [AuthorizationFailureError](authorizationfailureerror.md)

  ↳↳ [DownloadFailedError](downloadfailederror.md)

  ↳↳ [InvalidUrlError](invalidurlerror.md)

  ↳↳ [SaveFailureError](savefailureerror.md)

  ↳↳ [DownloadHttpError](downloadhttperror.md)

  ↳↳ [SecureStorageFullError](securestoragefullerror.md)

  ↳↳ [SecureStorageBusyError](securestoragebusyerror.md)

  ↳↳ [SecureStorageUnavailableError](securestorageunavailableerror.md)

  ↳↳ [SecureStorageIOError](securestorageioerror.md)

  ↳↳ [PurchaseFailedError](purchasefailederror.md)

  ↳↳ [ConsumeFailedError](consumefailederror.md)

  ↳↳ [ProductNotFoundError](productnotfounderror.md)

  ↳↳ [ProductPurchasedAlreadyError](productpurchasedalreadyerror.md)

  ↳↳ [UserCancelledPurchaseError](usercancelledpurchaseerror.md)

## Index

### Constructors

* [constructor](miniapperror.md#constructor)

### Properties

* [errorInput](miniapperror.md#errorinput)
* [message](miniapperror.md#message)
* [name](miniapperror.md#name)
* [stack](miniapperror.md#stack)
* [Error](miniapperror.md#error)

## Constructors

### constructor

\+ **new MiniAppError**(`errorInput`: [MiniAppJson](../interfaces/miniappjson.md)): [MiniAppError](miniapperror.md)

*Defined in [js-miniapp-bridge/src/types/error-types/mini-app-error.ts:9](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-bridge/src/types/error-types/mini-app-error.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`errorInput` | [MiniAppJson](../interfaces/miniappjson.md) |

**Returns:** [MiniAppError](miniapperror.md)

## Properties

### errorInput

•  **errorInput**: [MiniAppJson](../interfaces/miniappjson.md)

*Defined in [js-miniapp-bridge/src/types/error-types/mini-app-error.ts:10](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-bridge/src/types/error-types/mini-app-error.ts#L10)*

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

*Overrides [MiniAppError](miniapperror.md).[stack](miniapperror.md#stack)*

*Defined in node_modules/typescript/lib/lib.es5.d.ts:1055*

___

### Error

▪ `Static` **Error**: ErrorConstructor

*Defined in node_modules/typescript/lib/lib.es5.d.ts:1064*
