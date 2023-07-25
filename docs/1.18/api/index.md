**[js-miniapp-sdk](README.md)**

> Globals

# js-miniapp-sdk

## Index

### Enumerations

* [AdTypes](enums/adtypes.md)
* [CustomPermissionName](enums/custompermissionname.md)
* [CustomPermissionStatus](enums/custompermissionstatus.md)
* [DevicePermission](enums/devicepermission.md)
* [HostAppEvents](enums/hostappevents.md)
* [MAAnalyticsActionType](enums/maanalyticsactiontype.md)
* [MAAnalyticsEventType](enums/maanalyticseventtype.md)
* [MiniAppAuthErrorType](enums/miniappautherrortype.md)
* [MiniAppDownloadErrorType](enums/miniappdownloaderrortype.md)
* [MiniAppEvents](enums/miniappevents.md)
* [MiniAppInAppPurchaseErrorType](enums/miniappinapppurchaseerrortype.md)
* [MiniAppKeyboardEvents](enums/miniappkeyboardevents.md)
* [MiniAppSecureStorageEvents](enums/miniappsecurestorageevents.md)
* [MiniAppStorageErrorType](enums/miniappstorageerrortype.md)
* [Platform](enums/platform.md)
* [ScreenOrientation](enums/screenorientation.md)

### Classes

* [AccessTokenData](classes/accesstokendata.md)
* [AccessTokenScopes](classes/accesstokenscopes.md)
* [AudienceNotSupportedError](classes/audiencenotsupportederror.md)
* [AuthorizationFailureError](classes/authorizationfailureerror.md)
* [ConsumeFailedError](classes/consumefailederror.md)
* [DownloadFailedError](classes/downloadfailederror.md)
* [DownloadHttpError](classes/downloadhttperror.md)
* [InvalidUrlError](classes/invalidurlerror.md)
* [LogType](classes/logtype.md)
* [MiniApp](classes/miniapp.md)
* [MiniAppError](classes/miniapperror.md)
* [ProductNotFoundError](classes/productnotfounderror.md)
* [ProductPurchasedAlreadyError](classes/productpurchasedalreadyerror.md)
* [PurchaseFailedError](classes/purchasefailederror.md)
* [SaveFailureError](classes/savefailureerror.md)
* [ScopesNotSupportedError](classes/scopesnotsupportederror.md)
* [SecureStorageBusyError](classes/securestoragebusyerror.md)
* [SecureStorageFullError](classes/securestoragefullerror.md)
* [SecureStorageIOError](classes/securestorageioerror.md)
* [SecureStorageUnavailableError](classes/securestorageunavailableerror.md)
* [UserCancelledPurchaseError](classes/usercancelledpurchaseerror.md)

### Interfaces

* [Ad](interfaces/ad.md)
* [ChatServiceProvider](interfaces/chatserviceprovider.md)
* [CloseAlertInfo](interfaces/closealertinfo.md)
* [Contact](interfaces/contact.md)
* [CustomPermission](interfaces/custompermission.md)
* [CustomPermissionResponse](interfaces/custompermissionresponse.md)
* [CustomPermissionResult](interfaces/custompermissionresult.md)
* [DownloadFileHeaders](interfaces/downloadfileheaders.md)
* [HostEnvironmentInfo](interfaces/hostenvironmentinfo.md)
* [HostThemeColor](interfaces/hostthemecolor.md)
* [MAAnalyticsInfo](interfaces/maanalyticsinfo.md)
* [MessageToContact](interfaces/messagetocontact.md)
* [MiniAppDownloadError](interfaces/miniappdownloaderror.md)
* [MiniAppFeatures](interfaces/miniappfeatures.md)
* [MiniAppJson](interfaces/miniappjson.md)
* [MiniAppResponseInfo](interfaces/miniappresponseinfo.md)
* [MiniAppUtilsProvider](interfaces/miniapputilsprovider.md)
* [Points](interfaces/points.md)
* [ProductInfo](interfaces/productinfo.md)
* [ProductPrice](interfaces/productprice.md)
* [PurchaseProvider](interfaces/purchaseprovider.md)
* [PurchasedProductInfo](interfaces/purchasedproductinfo.md)
* [Reward](interfaces/reward.md)
* [SecureStorageProvider](interfaces/securestorageprovider.md)
* [ShareInfoType](interfaces/shareinfotype.md)
* [UniversalBridgeInfo](interfaces/universalbridgeinfo.md)
* [UniversalBridgeProvider](interfaces/universalbridgeprovider.md)
* [UserInfoProvider](interfaces/userinfoprovider.md)

### Type aliases

* [MiniAppSecureStorageKeyValues](README.md#miniappsecurestoragekeyvalues)
* [MiniAppSecureStorageSize](README.md#miniappsecurestoragesize)

### Variables

* [mabCustomEventQueue](README.md#mabcustomeventqueue)
* [mabKeyboardEventQueue](README.md#mabkeyboardeventqueue)
* [originalDebug](README.md#originaldebug)
* [originalError](README.md#originalerror)
* [originalLog](README.md#originallog)
* [originalWarn](README.md#originalwarn)

### Functions

* [BooleanValue](README.md#booleanvalue)
* [getConsoleForLogType](README.md#getconsoleforlogtype)
* [logMessage](README.md#logmessage)
* [parseAuthError](README.md#parseautherror)
* [parseDownloadError](README.md#parsedownloaderror)
* [parseInAppPurchaseError](README.md#parseinapppurchaseerror)
* [parseMiniAppError](README.md#parseminiapperror)
* [parseStorageError](README.md#parsestorageerror)
* [removeFromEventQueue](README.md#removefromeventqueue)
* [removeFromKeyboardEventQueue](README.md#removefromkeyboardeventqueue)
* [trimBannerText](README.md#trimbannertext)

## Type aliases

### MiniAppSecureStorageKeyValues

Ƭ  **MiniAppSecureStorageKeyValues**: { [key:string]: string;  }

*Defined in [js-miniapp-bridge/src/types/secure-storage.ts:5](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/secure-storage.ts#L5)*

Type used when requesting to set/get multiple key/value pairs using MiniApp.setItems

___

### MiniAppSecureStorageSize

Ƭ  **MiniAppSecureStorageSize**: { max: number ; used: number  }

*Defined in [js-miniapp-bridge/src/types/secure-storage.ts:10](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/secure-storage.ts#L10)*

#### Type declaration:

Name | Type |
------ | ------ |
`max` | number |
`used` | number |

## Variables

### mabCustomEventQueue

• `Const` **mabCustomEventQueue**: CustomEvent[] = []

*Defined in [js-miniapp-bridge/src/common-bridge.ts:37](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-bridge.ts#L37)*

___

### mabKeyboardEventQueue

• `Const` **mabKeyboardEventQueue**: CustomEvent[] = []

*Defined in [js-miniapp-bridge/src/common-bridge.ts:38](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-bridge.ts#L38)*

___

### originalDebug

• `Const` **originalDebug**: debug = console.debug

*Defined in [js-miniapp-bridge/src/common-log.ts:65](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-log.ts#L65)*

___

### originalError

• `Const` **originalError**: error = console.error

*Defined in [js-miniapp-bridge/src/common-log.ts:64](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-log.ts#L64)*

___

### originalLog

• `Const` **originalLog**: log = console.log

*Defined in [js-miniapp-bridge/src/common-log.ts:62](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-log.ts#L62)*

___

### originalWarn

• `Const` **originalWarn**: warn = console.warn

*Defined in [js-miniapp-bridge/src/common-log.ts:63](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-log.ts#L63)*

## Functions

### BooleanValue

▸ **BooleanValue**(`value`: any): boolean

*Defined in [js-miniapp-bridge/src/common-bridge.ts:840](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-bridge.ts#L840)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |

**Returns:** boolean

___

### getConsoleForLogType

▸ **getConsoleForLogType**(`type`: [LogType](classes/logtype.md)): error

*Defined in [js-miniapp-bridge/src/common-log.ts:49](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-log.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`type` | [LogType](classes/logtype.md) |

**Returns:** error

___

### logMessage

▸ **logMessage**(`type`: [LogType](classes/logtype.md), `argumentsList`: any[]): void

*Defined in [js-miniapp-bridge/src/common-log.ts:67](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-log.ts#L67)*

#### Parameters:

Name | Type |
------ | ------ |
`type` | [LogType](classes/logtype.md) |
`argumentsList` | any[] |

**Returns:** void

___

### parseAuthError

▸ **parseAuthError**(`json`: [MiniAppJson](interfaces/miniappjson.md)): [AudienceNotSupportedError](classes/audiencenotsupportederror.md) \| [ScopesNotSupportedError](classes/scopesnotsupportederror.md) \| [AuthorizationFailureError](classes/authorizationfailureerror.md)

*Defined in [js-miniapp-bridge/src/types/error-types/auth-errors.ts:32](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/error-types/auth-errors.ts#L32)*

#### Parameters:

Name | Type |
------ | ------ |
`json` | [MiniAppJson](interfaces/miniappjson.md) |

**Returns:** [AudienceNotSupportedError](classes/audiencenotsupportederror.md) \| [ScopesNotSupportedError](classes/scopesnotsupportederror.md) \| [AuthorizationFailureError](classes/authorizationfailureerror.md)

___

### parseDownloadError

▸ **parseDownloadError**(`json`: [MiniAppDownloadError](interfaces/miniappdownloaderror.md)): [DownloadFailedError](classes/downloadfailederror.md) \| [InvalidUrlError](classes/invalidurlerror.md) \| [SaveFailureError](classes/savefailureerror.md) \| [DownloadHttpError](classes/downloadhttperror.md)

*Defined in [js-miniapp-bridge/src/types/error-types/download-file-errors.ts:63](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/error-types/download-file-errors.ts#L63)*

#### Parameters:

Name | Type |
------ | ------ |
`json` | [MiniAppDownloadError](interfaces/miniappdownloaderror.md) |

**Returns:** [DownloadFailedError](classes/downloadfailederror.md) \| [InvalidUrlError](classes/invalidurlerror.md) \| [SaveFailureError](classes/savefailureerror.md) \| [DownloadHttpError](classes/downloadhttperror.md)

___

### parseInAppPurchaseError

▸ **parseInAppPurchaseError**(`json`: [MiniAppJson](interfaces/miniappjson.md)): [PurchaseFailedError](classes/purchasefailederror.md) \| [ConsumeFailedError](classes/consumefailederror.md) \| [ProductNotFoundError](classes/productnotfounderror.md) \| [ProductPurchasedAlreadyError](classes/productpurchasedalreadyerror.md) \| [UserCancelledPurchaseError](classes/usercancelledpurchaseerror.md)

*Defined in [js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts:53](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/error-types/in-app-purchase-errors.ts#L53)*

#### Parameters:

Name | Type |
------ | ------ |
`json` | [MiniAppJson](interfaces/miniappjson.md) |

**Returns:** [PurchaseFailedError](classes/purchasefailederror.md) \| [ConsumeFailedError](classes/consumefailederror.md) \| [ProductNotFoundError](classes/productnotfounderror.md) \| [ProductPurchasedAlreadyError](classes/productpurchasedalreadyerror.md) \| [UserCancelledPurchaseError](classes/usercancelledpurchaseerror.md)

___

### parseMiniAppError

▸ **parseMiniAppError**(`jsonString`: string): [MiniAppError](classes/miniapperror.md)

*Defined in [js-miniapp-bridge/src/types/error-types/index.ts:31](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/error-types/index.ts#L31)*

#### Parameters:

Name | Type |
------ | ------ |
`jsonString` | string |

**Returns:** [MiniAppError](classes/miniapperror.md)

___

### parseStorageError

▸ **parseStorageError**(`json`: [MiniAppJson](interfaces/miniappjson.md)): [SecureStorageFullError](classes/securestoragefullerror.md) \| [SecureStorageBusyError](classes/securestoragebusyerror.md) \| [SecureStorageUnavailableError](classes/securestorageunavailableerror.md) \| [SecureStorageIOError](classes/securestorageioerror.md)

*Defined in [js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts:42](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/error-types/secure-storage-errors.ts#L42)*

#### Parameters:

Name | Type |
------ | ------ |
`json` | [MiniAppJson](interfaces/miniappjson.md) |

**Returns:** [SecureStorageFullError](classes/securestoragefullerror.md) \| [SecureStorageBusyError](classes/securestoragebusyerror.md) \| [SecureStorageUnavailableError](classes/securestorageunavailableerror.md) \| [SecureStorageIOError](classes/securestorageioerror.md)

___

### removeFromEventQueue

▸ **removeFromEventQueue**(`queueObj`: any): void

*Defined in [js-miniapp-bridge/src/common-bridge.ts:812](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-bridge.ts#L812)*

#### Parameters:

Name | Type |
------ | ------ |
`queueObj` | any |

**Returns:** void

___

### removeFromKeyboardEventQueue

▸ **removeFromKeyboardEventQueue**(`queueObj`: any): void

*Defined in [js-miniapp-bridge/src/common-bridge.ts:823](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-bridge.ts#L823)*

#### Parameters:

Name | Type |
------ | ------ |
`queueObj` | any |

**Returns:** void

___

### trimBannerText

▸ **trimBannerText**(`message?`: string, `maxLength?`: number): string

*Defined in [js-miniapp-bridge/src/common-bridge.ts:834](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/common-bridge.ts#L834)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`message` | string | null |
`maxLength` | number | 128 |

**Returns:** string
