**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / Platform

# Enumeration: Platform

Device platform.

## Index

### Enumeration members

* [ANDROID](platform.md#android)
* [IOS](platform.md#ios)

### Functions

* [getPlatform](platform.md#getplatform)

## Enumeration members

### ANDROID

•  **ANDROID**:  = "Android"

*Defined in [js-miniapp-bridge/src/types/platform.ts:5](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/platform.ts#L5)*

___

### IOS

•  **IOS**:  = "iOS"

*Defined in [js-miniapp-bridge/src/types/platform.ts:6](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-bridge/src/types/platform.ts#L6)*

## Functions

### getPlatform

▸ **getPlatform**(): string

*Defined in [js-miniapp-sdk/src/miniapp.ts:163](https://github.com/rakutentech/js-miniapp/blob/2f882c8/js-miniapp-sdk/src/miniapp.ts#L163)*

Detect which platform your mini app is running on.

**Returns:** string

`Android`, `iOS`, or `Unknown`
