**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / WebViewConfigProvider

# Interface: WebViewConfigProvider

Interface representing a provider for WebView configuration.

## Hierarchy

* **WebViewConfigProvider**

## Implemented by

* [WebviewManager](../classes/webviewmanager.md)

## Index

### Methods

* [allowBackForwardNavigationGestures](webviewconfigprovider.md#allowbackforwardnavigationgestures)

## Methods

### allowBackForwardNavigationGestures

▸ **allowBackForwardNavigationGestures**(`shouldAllow`: boolean): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/webview-config-provider.ts:12](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-sdk/src/modules/webview-config-provider.ts#L12)*

Allows or disallows back and forward navigation gestures in the WebView.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`shouldAllow` | boolean | A boolean indicating whether the gestures should be allowed. |

**Returns:** Promise\<boolean>

A promise that resolves to a boolean indicating the success of the operation.
