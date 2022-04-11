**[js-miniapp-sdk](README.md)**

> Globals

# js-miniapp-sdk

## Index

### Enumerations

* [AdTypes](enums/adtypes.md)
* [CustomPermissionName](enums/custompermissionname.md)
* [CustomPermissionStatus](enums/custompermissionstatus.md)
* [DevicePermission](enums/devicepermission.md)
* [MiniAppErrorType](enums/miniapperrortype.md)
* [MiniAppEvents](enums/miniappevents.md)
* [MiniAppKeyboardEvents](enums/miniappkeyboardevents.md)
* [Platform](enums/platform.md)
* [ScreenOrientation](enums/screenorientation.md)

### Classes

* [AccessTokenData](classes/accesstokendata.md)
* [AccessTokenScopes](classes/accesstokenscopes.md)
* [AudienceNotSupportedError](classes/audiencenotsupportederror.md)
* [AuthorizationFailureError](classes/authorizationfailureerror.md)
* [LogType](classes/logtype.md)
* [MiniApp](classes/miniapp.md)
* [MiniAppError](classes/miniapperror.md)
* [ScopesNotSupportedError](classes/scopesnotsupportederror.md)

### Interfaces

* [Ad](interfaces/ad.md)
* [ChatServiceProvider](interfaces/chatserviceprovider.md)
* [Contact](interfaces/contact.md)
* [CustomPermission](interfaces/custompermission.md)
* [CustomPermissionResponse](interfaces/custompermissionresponse.md)
* [CustomPermissionResult](interfaces/custompermissionresult.md)
* [DownloadFileHeaders](interfaces/downloadfileheaders.md)
* [HostEnvironmentInfo](interfaces/hostenvironmentinfo.md)
* [MessageToContact](interfaces/messagetocontact.md)
* [MiniAppFeatures](interfaces/miniappfeatures.md)
* [MiniAppJson](interfaces/miniappjson.md)
* [Points](interfaces/points.md)
* [Product](interfaces/product.md)
* [ProductPrice](interfaces/productprice.md)
* [PurchaseItemProvider](interfaces/purchaseitemprovider.md)
* [PurchasedProduct](interfaces/purchasedproduct.md)
* [Reward](interfaces/reward.md)
* [ShareInfoType](interfaces/shareinfotype.md)
* [UserInfoProvider](interfaces/userinfoprovider.md)

### Variables

* [errorTypesDescriptions](README.md#errortypesdescriptions)
* [mabCustomEventQueue](README.md#mabcustomeventqueue)
* [mabKeyboardEventQueue](README.md#mabkeyboardeventqueue)
* [originalDebug](README.md#originaldebug)
* [originalError](README.md#originalerror)
* [originalLog](README.md#originallog)
* [originalWarn](README.md#originalwarn)

### Functions

* [getConsoleForLogType](README.md#getconsoleforlogtype)
* [logMessage](README.md#logmessage)
* [parseMiniAppError](README.md#parseminiapperror)
* [removeFromEventQueue](README.md#removefromeventqueue)
* [removeFromKeyboardEventQueue](README.md#removefromkeyboardeventqueue)
* [trimBannerText](README.md#trimbannertext)

## Variables

### errorTypesDescriptions

• `Const` **errorTypesDescriptions**: Map\<[MiniAppErrorType](enums/miniapperrortype.md), string> = new Map\<MiniAppErrorType, string>([ [ MiniAppErrorType.AudienceNotSupportedError, "The value passed for 'audience' is not supported.", ], [ MiniAppErrorType.ScopesNotSupportedError, "The value passed for 'scopes' is not supported.", ],])

*Defined in [js-miniapp-bridge/src/types/error-types/index.ts:66](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/types/error-types/index.ts#L66)*

___

### mabCustomEventQueue

• `Const` **mabCustomEventQueue**: CustomEvent[] = []

*Defined in [js-miniapp-bridge/src/common-bridge.ts:34](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-bridge.ts#L34)*

___

### mabKeyboardEventQueue

• `Const` **mabKeyboardEventQueue**: CustomEvent[] = []

*Defined in [js-miniapp-bridge/src/common-bridge.ts:35](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-bridge.ts#L35)*

___

### originalDebug

• `Const` **originalDebug**: debug = console.debug

*Defined in [js-miniapp-bridge/src/common-log.ts:65](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-log.ts#L65)*

___

### originalError

• `Const` **originalError**: error = console.error

*Defined in [js-miniapp-bridge/src/common-log.ts:64](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-log.ts#L64)*

___

### originalLog

• `Const` **originalLog**: log = console.log

*Defined in [js-miniapp-bridge/src/common-log.ts:62](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-log.ts#L62)*

___

### originalWarn

• `Const` **originalWarn**: warn = console.warn

*Defined in [js-miniapp-bridge/src/common-log.ts:63](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-log.ts#L63)*

## Functions

### getConsoleForLogType

▸ **getConsoleForLogType**(`type`: [LogType](classes/logtype.md)): error

*Defined in [js-miniapp-bridge/src/common-log.ts:49](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-log.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`type` | [LogType](classes/logtype.md) |

**Returns:** error

___

### logMessage

▸ **logMessage**(`type`: [LogType](classes/logtype.md), `argumentsList`: any[]): void

*Defined in [js-miniapp-bridge/src/common-log.ts:67](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-log.ts#L67)*

#### Parameters:

Name | Type |
------ | ------ |
`type` | [LogType](classes/logtype.md) |
`argumentsList` | any[] |

**Returns:** void

___

### parseMiniAppError

▸ **parseMiniAppError**(`jsonString`: string): [MiniAppJson](interfaces/miniappjson.md)

*Defined in [js-miniapp-bridge/src/types/error-types/index.ts:15](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/types/error-types/index.ts#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`jsonString` | string |

**Returns:** [MiniAppJson](interfaces/miniappjson.md)

___

### removeFromEventQueue

▸ **removeFromEventQueue**(`queueObj`: any): void

*Defined in [js-miniapp-bridge/src/common-bridge.ts:600](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-bridge.ts#L600)*

#### Parameters:

Name | Type |
------ | ------ |
`queueObj` | any |

**Returns:** void

___

### removeFromKeyboardEventQueue

▸ **removeFromKeyboardEventQueue**(`queueObj`: any): void

*Defined in [js-miniapp-bridge/src/common-bridge.ts:611](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-bridge.ts#L611)*

#### Parameters:

Name | Type |
------ | ------ |
`queueObj` | any |

**Returns:** void

___

### trimBannerText

▸ **trimBannerText**(`message?`: string, `maxLength?`: number): string

*Defined in [js-miniapp-bridge/src/common-bridge.ts:622](https://github.com/rakutentech/js-miniapp/blob/4d58a2f/js-miniapp-bridge/src/common-bridge.ts#L622)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`message` | string | null |
`maxLength` | number | 128 |

**Returns:** string
