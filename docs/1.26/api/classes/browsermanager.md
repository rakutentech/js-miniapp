**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / BrowserManager

# Class: BrowserManager

Manages browser-related functionalities for the MiniApp.

## Hierarchy

* **BrowserManager**

## Index

### Constructors

* [constructor](browsermanager.md#constructor)

### Properties

* [executor](browsermanager.md#executor)
* [platform](browsermanager.md#platform)

### Methods

* [launchExternalBrowser](browsermanager.md#launchexternalbrowser)
* [launchInternalBrowser](browsermanager.md#launchinternalbrowser)
* [loadUsingHTMLString](browsermanager.md#loadusinghtmlstring)

## Constructors

### constructor

\+ **new BrowserManager**(`executor`: PlatformExecutor): [BrowserManager](browsermanager.md)

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:13](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/modules/browser-manager.ts#L13)*

#### Parameters:

Name | Type |
------ | ------ |
`executor` | PlatformExecutor |

**Returns:** [BrowserManager](browsermanager.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:12](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/modules/browser-manager.ts#L12)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:13](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/modules/browser-manager.ts#L13)*

## Methods

### launchExternalBrowser

▸ **launchExternalBrowser**(`url`: string): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:26](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/modules/browser-manager.ts#L26)*

Launches the specified URL in an external browser.

**`see`** {launchExternalBrowser}

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string | The URL to be opened in the external browser. |

**Returns:** Promise\<boolean>

- A promise that resolves to true if the URL was successfully opened, otherwise rejects with an error.

___

### launchInternalBrowser

▸ **launchInternalBrowser**(`urlOrParams`: string \| [LaunchBrowserOptions](../interfaces/launchbrowseroptions.md)): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:47](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/modules/browser-manager.ts#L47)*

Launches the specified URL in an internal browser.
You can pass either a string URL or a LaunchBrowserOptions object to specify
HTTP method, body, audience, and scopes.

**`see`** {launchInternalBrowser}

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`urlOrParams` | string \| [LaunchBrowserOptions](../interfaces/launchbrowseroptions.md) | The URL string or LaunchBrowserOptions object. |

**Returns:** Promise\<boolean>

- A promise that resolves to true if the URL was successfully opened, otherwise rejects with an error.

___

### loadUsingHTMLString

▸ **loadUsingHTMLString**(`params`: [LoadHTMLStringOptions](../interfaces/loadhtmlstringoptions.md)): Promise\<string \| null>

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:71](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-bridge/src/modules/browser-manager.ts#L71)*

Load HTML String to Host App
Passing a LoadHTMLStringOptions object

**`see`** {loadUsingHTMLString}

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`params` | [LoadHTMLStringOptions](../interfaces/loadhtmlstringoptions.md) | The URL string or LoadHTMLStringOptions object. |

**Returns:** Promise\<string \| null>

- Returns a Promise that resolves with the intercepted URL or null, or rejects with an error, based on the response received from the native side via the bridge.
