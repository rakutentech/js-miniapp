**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / MiniAppUtilsProvider

# Interface: MiniAppUtilsProvider

Mini App Utility methods

## Hierarchy

* **MiniAppUtilsProvider**

## Index

### Methods

* [closeMiniApp](miniapputilsprovider.md#closeminiapp)
* [getFeatureList](miniapputilsprovider.md#getfeaturelist)
* [getHostAppThemeColors](miniapputilsprovider.md#gethostappthemecolors)
* [isDarkMode](miniapputilsprovider.md#isdarkmode)
* [miniAppFinishedLoading](miniapputilsprovider.md#miniappfinishedloading)
* [sendAnalytics](miniapputilsprovider.md#sendanalytics)
* [setCloseAlert](miniapputilsprovider.md#setclosealert)

## Methods

### closeMiniApp

▸ **closeMiniApp**(`withConfirmation`: boolean): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:23](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-sdk/src/modules/utils.ts#L23)*

Mini App can be closed using this method, provided Host app is supporting this interface to close the miniapp.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`withConfirmation` | boolean | boolean value which will be used by the host app to show/hide close confirmation alert which should be set using `setCloseAlert` method in prior before calling this interface  |

**Returns:** Promise\<string>

___

### getFeatureList

▸ **getFeatureList**(): Promise\<string[]>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:50](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-sdk/src/modules/utils.ts#L50)*

Interface to get list of features supported by the SDK and Host

**Returns:** Promise\<string[]>

___

### getHostAppThemeColors

▸ **getHostAppThemeColors**(): Promise\<[HostThemeColor](hostthemecolor.md)>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:34](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-sdk/src/modules/utils.ts#L34)*

Interface that is used to get the Color theme used in the Host application

**Returns:** Promise\<[HostThemeColor](hostthemecolor.md)>

___

### isDarkMode

▸ **isDarkMode**(): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:39](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-sdk/src/modules/utils.ts#L39)*

Interface to check if the Device/Application is using Dark mode

**Returns:** Promise\<boolean>

___

### miniAppFinishedLoading

▸ **miniAppFinishedLoading**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:29](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-sdk/src/modules/utils.ts#L29)*

Miniapp can notify the host app that it has finished loading using this call.
Host app can implement this interface to perform any other actions after the miniapp has loaded.

**Returns:** Promise\<string>

___

### sendAnalytics

▸ **sendAnalytics**(`analytics`: [MAAnalyticsInfo](maanalyticsinfo.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:45](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-sdk/src/modules/utils.ts#L45)*

Interface to send analytics to Host app

#### Parameters:

Name | Type |
------ | ------ |
`analytics` | [MAAnalyticsInfo](maanalyticsinfo.md) |

**Returns:** Promise\<string>

___

### setCloseAlert

▸ **setCloseAlert**(`alertInfo`: [CloseAlertInfo](closealertinfo.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/utils.ts:16](https://github.com/rakutentech/js-miniapp/blob/00ebd5b/js-miniapp-sdk/src/modules/utils.ts#L16)*

Mini App can choose whether to display Close confirmation alert dialog when mini app is closed

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`alertInfo` | [CloseAlertInfo](closealertinfo.md) | CloseAlertInfo object  |

**Returns:** Promise\<string>
