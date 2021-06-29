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
* [ScreenOrientation](enums/screenorientation.md)

### Classes

* [AccessTokenData](classes/accesstokendata.md)
* [AccessTokenScopes](classes/accesstokenscopes.md)
* [AudienceNotSupportedError](classes/audiencenotsupportederror.md)
* [AuthorizationFailureError](classes/authorizationfailureerror.md)
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
* [MessageToContact](interfaces/messagetocontact.md)
* [MiniAppFeatures](interfaces/miniappfeatures.md)
* [MiniAppJson](interfaces/miniappjson.md)
* [Platform](interfaces/platform.md)
* [Reward](interfaces/reward.md)
* [ShareInfoType](interfaces/shareinfotype.md)
* [UserInfoProvider](interfaces/userinfoprovider.md)

### Variables

* [errorTypesDescriptions](README.md#errortypesdescriptions)

### Functions

* [parseMiniAppError](README.md#parseminiapperror)

## Variables

### errorTypesDescriptions

• `Const` **errorTypesDescriptions**: Map\<[MiniAppErrorType](enums/miniapperrortype.md), string> = new Map\<MiniAppErrorType, string>([ [ MiniAppErrorType.AudienceNotSupportedError, "The value passed for 'audience' is not supported.", ], [ MiniAppErrorType.ScopesNotSupportedError, "The value passed for 'scopes' is not supported.", ],])

*Defined in [js-miniapp-bridge/src/types/error-types/index.ts:66](https://github.com/rakutentech/js-miniapp/blob/da5571c/js-miniapp-bridge/src/types/error-types/index.ts#L66)*

## Functions

### parseMiniAppError

▸ **parseMiniAppError**(`jsonString`: string): [MiniAppJson](interfaces/miniappjson.md)

*Defined in [js-miniapp-bridge/src/types/error-types/index.ts:15](https://github.com/rakutentech/js-miniapp/blob/da5571c/js-miniapp-bridge/src/types/error-types/index.ts#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`jsonString` | string |

**Returns:** [MiniAppJson](interfaces/miniappjson.md)
