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

*Defined in [js-miniapp-sdk/src/modules/utils.ts:57](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L57)*

Interface to check if the device has the deeplink available.

#### Parameters:

Name | Type |
------ | ------ |
`deeplinkURL` | string |

**Returns:** Promise\<boolean>

___

### closeMiniApp

▸ **closeMiniApp**(`withConfirmation`: boolean): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:25](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L25)*

Mini App can be closed using this method, provided Host app is supporting this interface to close the miniapp.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`withConfirmation` | boolean | boolean value which will be used by the host app to show/hide close confirmation alert which should be set using `setCloseAlert` method in prior before calling this interface  |

**Returns:** Promise\<string>

___

### getFeatureList

▸ **getFeatureList**(): Promise\<string[]>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:52](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L52)*

Interface to get list of features supported by the SDK and Host

**Returns:** Promise\<string[]>

___

### getHostAppThemeColors

▸ **getHostAppThemeColors**(): Promise\<[HostThemeColor](hostthemecolor.md)>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:36](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L36)*

Interface that is used to get the Color theme used in the Host application

**Returns:** Promise\<[HostThemeColor](hostthemecolor.md)>

___

### isAppDeeplinkSupported

▸ **isAppDeeplinkSupported**(`deeplinkURL`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:62](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L62)*

Interface to check if the application has whitelisted the deeplink

#### Parameters:

Name | Type |
------ | ------ |
`deeplinkURL` | string |

**Returns:** Promise\<boolean>

___

### isDarkMode

▸ **isDarkMode**(): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:41](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L41)*

Interface to check if the Device/Application is using Dark mode

**Returns:** Promise\<boolean>

___

### launchExternalBrowser

▸ **launchExternalBrowser**(`url`: string): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:68](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L68)*

This interface will be used to launch the URL in external browser

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string | Remote URL  |

**Returns:** Promise\<boolean>

___

### launchInternalBrowser

▸ **launchInternalBrowser**(`urlOrParams`: string \| [LaunchBrowserOptions](launchbrowseroptions.md)): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:76](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L76)*

This interface will be used to launch the URL in Internal browser.
You can pass either a string URL or a LaunchBrowserOptions object to specify
HTTP method, body, audience, and scopes.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`urlOrParams` | string \| [LaunchBrowserOptions](launchbrowseroptions.md) | The URL string or LaunchBrowserOptions object.  |

**Returns:** Promise\<boolean>

___

### logEvent

▸ **logEvent**(`message`: string, `type`: [LogType](../classes/logtype.md)): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:85](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L85)*

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

*Defined in [js-miniapp-sdk/src/modules/utils.ts:31](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L31)*

Miniapp can notify the host app that it has finished loading using this call.
Host app can implement this interface to perform any other actions after the miniapp has loaded.

**Returns:** Promise\<string>

___

### sendAnalytics

▸ **sendAnalytics**(`analytics`: [MAAnalyticsInfo](maanalyticsinfo.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:47](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L47)*

Interface to send analytics to Host app

#### Parameters:

Name | Type |
------ | ------ |
`analytics` | [MAAnalyticsInfo](maanalyticsinfo.md) |

**Returns:** Promise\<string>

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](closealertinfo.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:18](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/utils.ts#L18)*

Mini App can choose whether to display Close confirmation alert dialog when mini app is closed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`alertInfo` | [CloseAlertInfo](closealertinfo.md) | CloseAlertInfo object  |

**Returns:** Promise\<string>
