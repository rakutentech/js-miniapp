**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / WebViewConfigManager

# Class: WebViewConfigManager

Manages the configuration of the WebView.

## Hierarchy

* **WebViewConfigManager**

## Index

### Constructors

* [constructor](webviewconfigmanager.md#constructor)

### Properties

* [executor](webviewconfigmanager.md#executor)
* [platform](webviewconfigmanager.md#platform)

### Methods

* [allowBackForwardNavigationGestures](webviewconfigmanager.md#allowbackforwardnavigationgestures)

## Constructors

### constructor

\+ **new WebViewConfigManager**(`executor`: PlatformExecutor): [WebViewConfigManager](webviewconfigmanager.md)

*Defined in [js-miniapp-bridge/src/modules/webview-config-manager.ts:9](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-bridge/src/modules/webview-config-manager.ts#L9)*

Creates an instance of WebViewConfigManager.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`executor` | PlatformExecutor | The platform executor.  |

**Returns:** [WebViewConfigManager](webviewconfigmanager.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/webview-config-manager.ts:8](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-bridge/src/modules/webview-config-manager.ts#L8)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/webview-config-manager.ts:9](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-bridge/src/modules/webview-config-manager.ts#L9)*

## Methods

### allowBackForwardNavigationGestures

▸ **allowBackForwardNavigationGestures**(`shouldAllow`: boolean): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/webview-config-manager.ts:25](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-bridge/src/modules/webview-config-manager.ts#L25)*

Allows or disallows back and forward navigation gestures.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`shouldAllow` | boolean | A boolean indicating whether to allow the gestures. |

**Returns:** Promise\<boolean>

A promise that resolves to a boolean indicating the success of the operation.
