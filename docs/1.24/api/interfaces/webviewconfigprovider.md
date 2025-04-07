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
* [forceInternalWebView](webviewconfigprovider.md#forceinternalwebview)

## Methods

### allowBackForwardNavigationGestures

▸ **allowBackForwardNavigationGestures**(`shouldAllow`: boolean): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/webview-config-provider.ts:12](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/modules/webview-config-provider.ts#L12)*

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

*Defined in [js-miniapp-sdk/src/modules/webview-config-provider.ts:19](https://github.com/rakutentech/js-miniapp/blob/b0ef4a6/js-miniapp-sdk/src/modules/webview-config-provider.ts#L19)*

Define whether URLs are opened in internal Webview or external browser

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`enable` | boolean | whether to force internal Webview to be used or not |

**Returns:** Promise\<boolean>

true if the settings update is successful
