**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / UniversalBridgeProvider

# Interface: UniversalBridgeProvider

Interfaces to communicate with Host application

## Hierarchy

* **UniversalBridgeProvider**

## Index

### Methods

* [sendInfoToHostapp](universalbridgeprovider.md#sendinfotohostapp)
* [sendJsonToHostapp](universalbridgeprovider.md#sendjsontohostapp)

## Methods

### sendInfoToHostapp

▸ **sendInfoToHostapp**(`info`: [UniversalBridgeInfo](universalbridgeinfo.md)): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/universal-bridge.ts:16](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-sdk/src/modules/universal-bridge.ts#L16)*

Send UniversalBridgeInfo to HostApp.

#### Parameters:

Name | Type |
------ | ------ |
`info` | [UniversalBridgeInfo](universalbridgeinfo.md) |

**Returns:** Promise\<string>

___

### sendJsonToHostapp

▸ **sendJsonToHostapp**(`info`: string): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/universal-bridge.ts:11](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-sdk/src/modules/universal-bridge.ts#L11)*

Send JSON/String information to HostApp.

#### Parameters:

Name | Type |
------ | ------ |
`info` | string |

**Returns:** Promise\<string>
