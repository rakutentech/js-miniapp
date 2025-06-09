**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / EsimProvider

# Interface: EsimProvider

## Hierarchy

* **EsimProvider**

## Index

### Methods

* [isEsimSupported](esimprovider.md#isesimsupported)
* [setupAndInstallEsim](esimprovider.md#setupandinstallesim)

## Methods

### isEsimSupported

▸ **isEsimSupported**(): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/e-sim.ts:8](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/e-sim.ts#L8)*

Checks if esim is supported on native mobile device

**Returns:** Promise\<boolean>

___

### setupAndInstallEsim

▸ **setupAndInstallEsim**(`config`: [EsimConfig](esimconfig.md)): Promise\<boolean>

*Defined in [js-miniapp-sdk/src/modules/e-sim.ts:14](https://github.com/rakutentech/js-miniapp/blob/f59f350/js-miniapp-sdk/src/modules/e-sim.ts#L14)*

Sends information of esim configuration as EsimConfig object
Replies with boolean if esim was configured successfully or not

#### Parameters:

Name | Type |
------ | ------ |
`config` | [EsimConfig](esimconfig.md) |

**Returns:** Promise\<boolean>
