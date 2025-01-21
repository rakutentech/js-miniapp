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

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:9](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/modules/browser-manager.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`executor` | PlatformExecutor |

**Returns:** [BrowserManager](browsermanager.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:8](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/modules/browser-manager.ts#L8)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:9](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/modules/browser-manager.ts#L9)*

## Methods

### launchExternalBrowser

▸ **launchExternalBrowser**(`url`: string): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:22](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/modules/browser-manager.ts#L22)*

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

▸ **launchInternalBrowser**(`url`: string): Promise\<boolean>

*Defined in [js-miniapp-bridge/src/modules/browser-manager.ts:41](https://github.com/rakutentech/js-miniapp/blob/acdf92c/js-miniapp-bridge/src/modules/browser-manager.ts#L41)*

Launches the specified URL in an internal browser.

**`see`** {launchInternalBrowser}

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`url` | string | The URL to be opened in the internal browser. |

**Returns:** Promise\<boolean>

- A promise that resolves to true if the URL was successfully opened, otherwise rejects with an error.
