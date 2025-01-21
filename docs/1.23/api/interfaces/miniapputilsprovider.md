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
* [launchExternalBrowser](miniapputilsprovider.md#launchexternalbrowser)
* [launchInternalBrowser](miniapputilsprovider.md#launchinternalbrowser)
* [logEvent](miniapputilsprovider.md#logevent)
* [miniAppFinishedLoading](miniapputilsprovider.md#miniappfinishedloading)
* [sendAnalytics](miniapputilsprovider.md#sendanalytics)
* [setCloseAlert](miniapputilsprovider.md#setclosealert)

## Methods

### canOpenAppDeeplink

▸ **canOpenAppDeeplink**(`deeplinkURL`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:56](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L56)*

Interface to check if the device has the deeplink available.

#### Parameters:

Name | Type |
------ | ------ |
`deeplinkURL` | string |

**Returns:** Promise\<boolean>

___

### closeMiniApp

▸ **closeMiniApp**(`withConfirmation`: boolean): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:24](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L24)*

Mini App can be closed using this method, provided Host app is supporting this interface to close the miniapp.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`withConfirmation` | boolean | boolean value which will be used by the host app to show/hide close confirmation alert which should be set using `setCloseAlert` method in prior before calling this interface  |

**Returns:** Promise\<string>

___

### getFeatureList

▸ **getFeatureList**(): Promise\<string[]>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:51](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L51)*

Interface to get list of features supported by the SDK and Host

**Returns:** Promise\<string[]>

___

### getHostAppThemeColors

▸ **getHostAppThemeColors**(): Promise\<[HostThemeColor](hostthemecolor.md)>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:35](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L35)*

Interface that is used to get the Color theme used in the Host application

**Returns:** Promise\<[HostThemeColor](hostthemecolor.md)>

___

### isAppDeeplinkSupported

▸ **isAppDeeplinkSupported**(`deeplinkURL`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:61](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L61)*

Interface to check if the application has whitelisted the deeplink

#### Parameters:

Name | Type |
------ | ------ |
`deeplinkURL` | string |

**Returns:** Promise\<boolean>

___

### isDarkMode

▸ **isDarkMode**(): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:40](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L40)*

Interface to check if the Device/Application is using Dark mode

**Returns:** Promise\<boolean>

___

### launchExternalBrowser

▸ **launchExternalBrowser**(`url`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:67](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L67)*

This interface will be used to launch the URL in external browser

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string | Remote URL  |

**Returns:** Promise\<boolean>

___

### launchInternalBrowser

▸ **launchInternalBrowser**(`url`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:73](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L73)*

This interface will be used to launch the URL in Internal browser

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string | Remote URL  |

**Returns:** Promise\<boolean>

___

### logEvent

▸ **logEvent**(`message`: string, `type`: [LogType](../classes/logtype.md)): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:80](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L80)*

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

*Defined in [js-miniapp-sdk/src/modules/utils.ts:30](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L30)*

Miniapp can notify the host app that it has finished loading using this call.
Host app can implement this interface to perform any other actions after the miniapp has loaded.

**Returns:** Promise\<string>

___

### sendAnalytics

▸ **sendAnalytics**(`analytics`: [MAAnalyticsInfo](maanalyticsinfo.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:46](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L46)*

Interface to send analytics to Host app

#### Parameters:

Name | Type |
------ | ------ |
`analytics` | [MAAnalyticsInfo](maanalyticsinfo.md) |

**Returns:** Promise\<string>

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](closealertinfo.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:17](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/utils.ts#L17)*

Mini App can choose whether to display Close confirmation alert dialog when mini app is closed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`alertInfo` | [CloseAlertInfo](closealertinfo.md) | CloseAlertInfo object  |

**Returns:** Promise\<string>
