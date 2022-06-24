**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / SecureStorageProvider

# Interface: SecureStorageProvider

## Hierarchy

* **SecureStorageProvider**

## Index

### Methods

* [clear](securestorageprovider.md#clear)
* [getItem](securestorageprovider.md#getitem)
* [onLoadError](securestorageprovider.md#onloaderror)
* [onReady](securestorageprovider.md#onready)
* [removeItems](securestorageprovider.md#removeitems)
* [setItems](securestorageprovider.md#setitems)
* [size](securestorageprovider.md#size)

## Methods

### clear

▸ **clear**(): Promise\<undefined>

*Defined in [js-miniapp-sdk/src/modules/secure-storage.ts:18](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/modules/secure-storage.ts#L18)*

**Returns:** Promise\<undefined>

___

### getItem

▸ **getItem**(`key`: string): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/secure-storage.ts:14](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/modules/secure-storage.ts#L14)*

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |

**Returns:** Promise\<string>

___

### onLoadError

▸ **onLoadError**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/secure-storage.ts:24](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/modules/secure-storage.ts#L24)*

**Returns:** Promise\<string>

___

### onReady

▸ **onReady**(): Promise\<string>

*Defined in [js-miniapp-sdk/src/modules/secure-storage.ts:22](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/modules/secure-storage.ts#L22)*

**Returns:** Promise\<string>

___

### removeItems

▸ **removeItems**(`key`: [string]): Promise\<undefined>

*Defined in [js-miniapp-sdk/src/modules/secure-storage.ts:16](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/modules/secure-storage.ts#L16)*

#### Parameters:

Name | Type |
------ | ------ |
`key` | [string] |

**Returns:** Promise\<undefined>

___

### setItems

▸ **setItems**(`items`: [MiniAppSecureStorageKeyValues](../README.md#miniappsecurestoragekeyvalues)): Promise\<undefined>

*Defined in [js-miniapp-sdk/src/modules/secure-storage.ts:12](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/modules/secure-storage.ts#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`items` | [MiniAppSecureStorageKeyValues](../README.md#miniappsecurestoragekeyvalues) |

**Returns:** Promise\<undefined>

___

### size

▸ **size**(): Promise\<[MiniAppSecureStorageSize](../README.md#miniappsecurestoragesize)>

*Defined in [js-miniapp-sdk/src/modules/secure-storage.ts:20](https://github.com/rakutentech/js-miniapp/blob/c06869b/js-miniapp-sdk/src/modules/secure-storage.ts#L20)*

**Returns:** Promise\<[MiniAppSecureStorageSize](../README.md#miniappsecurestoragesize)>
