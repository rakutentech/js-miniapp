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

## Constructors

### constructor

\+ **new BrowserManager**(`executor`: PlatformExecutor): [BrowserManager](browsermanager.md)

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:10](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/browser-manager.ts#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`executor` | PlatformExecutor |

**Returns:** [BrowserManager](browsermanager.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:9](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/browser-manager.ts#L9)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:10](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/browser-manager.ts#L10)*

## Methods

### launchExternalBrowser

▸ **launchExternalBrowser**(`url`: string): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:23](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/browser-manager.ts#L23)*

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

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:44](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/browser-manager.ts#L44)*

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
