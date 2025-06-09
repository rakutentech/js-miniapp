**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / MiniAppPreferences

# Class: MiniAppPreferences

## Hierarchy

* **MiniAppPreferences**

## Index

### Constructors

* [constructor](miniapppreferences.md#constructor)

### Properties

* [executor](miniapppreferences.md#executor)
* [platform](miniapppreferences.md#platform)

### Methods

* [clearMiniAppPreferences](miniapppreferences.md#clearminiapppreferences)
* [get](miniapppreferences.md#get)
* [remove](miniapppreferences.md#remove)
* [set](miniapppreferences.md#set)

## Constructors

### constructor

\+ **new MiniAppPreferences**(`executor`: PlatformExecutor): [MiniAppPreferences](miniapppreferences.md)

*Defined in [js-miniapp-bridge/src/modules/miniapp-preferences.ts:6](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/miniapp-preferences.ts#L6)*

#### Parameters:

Name | Type |
------ | ------ |
`executor` | PlatformExecutor |

**Returns:** [MiniAppPreferences](miniapppreferences.md)

## Properties

### executor

•  **executor**: PlatformExecutor

*Defined in [js-miniapp-bridge/src/modules/miniapp-preferences.ts:5](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/miniapp-preferences.ts#L5)*

___

### platform

•  **platform**: string

*Defined in [js-miniapp-bridge/src/modules/miniapp-preferences.ts:6](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/miniapp-preferences.ts#L6)*

## Methods

### clearMiniAppPreferences

▸ **clearMiniAppPreferences**(): Promise\<string>

*Defined in [js-miniapp-bridge/src/modules/miniapp-preferences.ts:73](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/miniapp-preferences.ts#L73)*

Removes all keys that is stored

**`see`** {clearMiniAppPreferences}

**Returns:** Promise\<string>

___

### get

▸ **get**(`key`: string): Promise\<string>

*Defined in [js-miniapp-bridge/src/modules/miniapp-preferences.ts:37](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/miniapp-preferences.ts#L37)*

Returns the object associated with the specified key.

**`see`** {get}

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |

**Returns:** Promise\<string>

___

### remove

▸ **remove**(`key`: string): Promise\<string>

*Defined in [js-miniapp-bridge/src/modules/miniapp-preferences.ts:55](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/miniapp-preferences.ts#L55)*

Removes the value of the specified default key.

**`see`** {remove}

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |

**Returns:** Promise\<string>

___

### set

▸ **set**(`key`: string, `value`: string): Promise\<string>

*Defined in [js-miniapp-bridge/src/modules/miniapp-preferences.ts:19](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-bridge/src/modules/miniapp-preferences.ts#L19)*

Sets the value of the specified default key.

**`see`** {set}

#### Parameters:

Name | Type |
------ | ------ |
`key` | string |
`value` | string |

**Returns:** Promise\<string>
