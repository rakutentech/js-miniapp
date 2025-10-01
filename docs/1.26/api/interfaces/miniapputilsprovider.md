**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / MiniAppUtilsProvider

# Interface: MiniAppUtilsProvider

Mini App Utility methods

## Hierarchy

* **MiniAppUtilsProvider**

## Index

### Methods

* [canOpenAppDeeplink](miniapputilsprovider.md#canopenappdeeplink)
* [closeMiniApp](miniapputilsprovider.md#closeminiapp)
* [getFeatureList](miniapputilsprovider.md#getfeaturelist)
* [getHostAppThemeColors](miniapputilsprovider.md#gethostappthemecolors)
* [isAppDeeplinkSupported](miniapputilsprovider.md#isappdeeplinksupported)
* [isDarkMode](miniapputilsprovider.md#isdarkmode)
* [launchAppUsingDeeplink](miniapputilsprovider.md#launchappusingdeeplink)
* [launchAppUsingPackageName](miniapputilsprovider.md#launchappusingpackagename)
* [launchExternalBrowser](miniapputilsprovider.md#launchexternalbrowser)
* [launchInternalBrowser](miniapputilsprovider.md#launchinternalbrowser)
* [loadUsingHTMLString](miniapputilsprovider.md#loadusinghtmlstring)
* [logEvent](miniapputilsprovider.md#logevent)
* [miniAppFinishedLoading](miniapputilsprovider.md#miniappfinishedloading)
* [sendAnalytics](miniapputilsprovider.md#sendanalytics)
* [setCloseAlert](miniapputilsprovider.md#setclosealert)

## Methods

### canOpenAppDeeplink

▸ **canOpenAppDeeplink**(`deeplinkURL`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:60](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L60)*

Interface to check if the device has the deeplink available.

#### Parameters:

Name | Type |
------ | ------ |
`deeplinkURL` | string |

**Returns:** Promise\<boolean>

___

### closeMiniApp

▸ **closeMiniApp**(`withConfirmation`: boolean): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:28](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L28)*

Mini App can be closed using this method, provided Host app is supporting this interface to close the miniapp.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`withConfirmation` | boolean | boolean value which will be used by the host app to show/hide close confirmation alert which should be set using `setCloseAlert` method in prior before calling this interface  |

**Returns:** Promise\<string>

___

### getFeatureList

▸ **getFeatureList**(): Promise\<string[]>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:55](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L55)*

Interface to get list of features supported by the SDK and Host

**Returns:** Promise\<string[]>

___

### getHostAppThemeColors

▸ **getHostAppThemeColors**(): Promise\<[HostThemeColor](hostthemecolor.md)>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:39](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L39)*

Interface that is used to get the Color theme used in the Host application

**Returns:** Promise\<[HostThemeColor](hostthemecolor.md)>

___

### isAppDeeplinkSupported

▸ **isAppDeeplinkSupported**(`deeplinkURL`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:65](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L65)*

Interface to check if the application has whitelisted the deeplink

#### Parameters:

Name | Type |
------ | ------ |
`deeplinkURL` | string |

**Returns:** Promise\<boolean>

___

### isDarkMode

▸ **isDarkMode**(): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:44](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L44)*

Interface to check if the Device/Application is using Dark mode

**Returns:** Promise\<boolean>

___

### launchAppUsingDeeplink

▸ **launchAppUsingDeeplink**(`url`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:97](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L97)*

Launches an application on the device using a deeplink URL.
This method is useful for both iOS and Android devices where applications can be launched using deeplinks.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string | The deeplink URL of the application to launch. |

**Returns:** Promise\<boolean>

A promise or result from the underlying utility manager indicating the success or failure of the launch operation.

___

### launchAppUsingPackageName

▸ **launchAppUsingPackageName**(`packageName`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:106](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L106)*

Launches an application on the device using its package name.
This method is useful for Android devices where applications can be launched using their unique package names.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`packageName` | string | The unique package name of the application to launch. |

**Returns:** Promise\<boolean>

A promise or result from the underlying utility manager indicating the success or failure of the launch operation.

___

### launchExternalBrowser

▸ **launchExternalBrowser**(`url`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:71](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L71)*

This interface will be used to launch the URL in external browser

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string | Remote URL  |

**Returns:** Promise\<boolean>

___

### launchInternalBrowser

▸ **launchInternalBrowser**(`urlOrParams`: string \| [LaunchBrowserOptions](launchbrowseroptions.md)): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:79](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L79)*

This interface will be used to launch the URL in Internal browser.
You can pass either a string URL or a LaunchBrowserOptions object to specify
HTTP method, body, audience, and scopes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`urlOrParams` | string \| [LaunchBrowserOptions](launchbrowseroptions.md) | The URL string or LaunchBrowserOptions object.  |

**Returns:** Promise\<boolean>

___

### loadUsingHTMLString

▸ **loadUsingHTMLString**(`htmlString`: string, `callbackUrl`: string, `baseUrl?`: string): Promise\<string \| null>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:116](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L116)*

Direct HTML String loading from Host app to Miniapp

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`htmlString` | string | HTML in string format. |
`callbackUrl` | string | callbackUrl call after loading |
`baseUrl?` | string | optional |

**Returns:** Promise\<string \| null>

A promise whether successful or not

___

### logEvent

▸ **logEvent**(`message`: string, `type`: [LogType](../classes/logtype.md)): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:88](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L88)*

Interface to log events with a message and log type.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`message` | string | The log message. |
`type` | [LogType](../classes/logtype.md) | The log type.  |

**Returns:** Promise\<boolean>

___

### miniAppFinishedLoading

▸ **miniAppFinishedLoading**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:34](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L34)*

Miniapp can notify the host app that it has finished loading using this call.
Host app can implement this interface to perform any other actions after the miniapp has loaded.

**Returns:** Promise\<string>

___

### sendAnalytics

▸ **sendAnalytics**(`analytics`: [MAAnalyticsInfo](maanalyticsinfo.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:50](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L50)*

Interface to send analytics to Host app

#### Parameters:

Name | Type |
------ | ------ |
`analytics` | [MAAnalyticsInfo](maanalyticsinfo.md) |

**Returns:** Promise\<string>

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](closealertinfo.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:21](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/utils.ts#L21)*

Mini App can choose whether to display Close confirmation alert dialog when mini app is closed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`alertInfo` | [CloseAlertInfo](closealertinfo.md) | CloseAlertInfo object  |

**Returns:** Promise\<string>
