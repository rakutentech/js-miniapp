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
* [forceInternalWebView](webviewmanager.md#forceinternalwebview)

## Methods

### allowBackForwardNavigationGestures

▸ **allowBackForwardNavigationGestures**(`shouldAllow`: boolean): Promise\<boolean>

*Implementation of [WebViewConfigProvider](../interfaces/webviewconfigprovider.md)*

*Defined in [js-miniapp-sdk/src/modules/webview-config-provider.ts:31](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/webview-config-provider.ts#L31)*

Allows or disallows back and forward navigation gestures in the WebView.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`shouldAllow` | boolean | A boolean indicating whether the gestures should be allowed. |

**Returns:** Promise\<boolean>

A promise that resolves to a boolean indicating the success of the operation.

___

### forceInternalWebView

▸ **forceInternalWebView**(`enable`: boolean): Promise\<boolean>

*Implementation of [WebViewConfigProvider](../interfaces/webviewconfigprovider.md)*

*Defined in [js-miniapp-sdk/src/modules/webview-config-provider.ts:40](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/webview-config-provider.ts#L40)*

Define whether URLs are opened in internal Webview or external browser

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`enable` | boolean | whether to force internal Webview to be used or not |

**Returns:** Promise\<boolean>

A promise that resolves to a boolean indicating the success of the operation.
