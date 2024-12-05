**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / WebviewManager

# Class: WebviewManager

Class implementing the WebViewConfigProvider interface to manage WebView configurations.

## Hierarchy

* **WebviewManager**

## Implements

* [WebViewConfigProvider](../interfaces/webviewconfigprovider.md)

## Index

### Methods

* [allowBackForwardNavigationGestures](webviewmanager.md#allowbackforwardnavigationgestures)

## Methods

### allowBackForwardNavigationGestures

▸ **allowBackForwardNavigationGestures**(`shouldAllow`: boolean): Promise\<boolean>

*Implementation of [WebViewConfigProvider](../interfaces/webviewconfigprovider.md)*

*Defined in [js-miniapp-sdk/src/modules/webview-config-provider.ts:24](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/modules/webview-config-provider.ts#L24)*

Allows or disallows back and forward navigation gestures in the WebView.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`shouldAllow` | boolean | A boolean indicating whether the gestures should be allowed. |

**Returns:** Promise\<boolean>

A promise that resolves to a boolean indicating the success of the operation.
