**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / MiniAppPreferenceProvider

# Interface: MiniAppPreferenceProvider

Interfaces used to store, get and clear miniapp preferences

## Hierarchy

* **MiniAppPreferenceProvider**

## Index

### Methods

* [clearMiniAppPreferences](miniapppreferenceprovider.md#clearminiapppreferences)
* [get](miniapppreferenceprovider.md#get)
* [remove](miniapppreferenceprovider.md#remove)
* [set](miniapppreferenceprovider.md#set)

## Methods

### clearMiniAppPreferences

▸ **clearMiniAppPreferences**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/miniapp-preferences.ts:25](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/modules/miniapp-preferences.ts#L25)*

Clear all key/values that is stored for the MiniApp

**Returns:** Promise\<string>

___

### get

▸ **get**(`key`: string): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/miniapp-preferences.ts:15](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/modules/miniapp-preferences.ts#L15)*

Get the value for a given key

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |

**Returns:** Promise\<string>

___

### remove

▸ **remove**(`key`: string): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/miniapp-preferences.ts:20](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/modules/miniapp-preferences.ts#L20)*

Remove value for a given key

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |

**Returns:** Promise\<string>

___

### set

▸ **set**(`key`: string, `value`: string): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/miniapp-preferences.ts:10](https://github.com/rakutentech/js-miniapp/blob/cac19e7/js-miniapp-sdk/src/modules/miniapp-preferences.ts#L10)*

Store any value for a given key

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |
`value` | string |

**Returns:** Promise\<string>
