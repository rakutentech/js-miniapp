[js-miniapp-bridge - v1.1.0](../README.md) › [Ad](ad.md)

# Interface: Ad

A contract declaring the interaction mechanism between mini-apps and native host app to display ads.

## Hierarchy

* **Ad**

## Implemented by

* [MiniApp](../classes/miniapp.md)

## Index

### Methods

* [loadInterstitialAd](ad.md#loadinterstitialad)
* [loadRewardedAd](ad.md#loadrewardedad)
* [showInterstitialAd](ad.md#showinterstitialad)
* [showRewardedAd](ad.md#showrewardedad)

## Methods

###  loadInterstitialAd

▸ **loadInterstitialAd**(`id`: string): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:60](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L60)*

Loads the specified Interstittial Ad Unit ID.
Can be called multiple times to pre-load multiple ads.
Promise is resolved when successfully loaded.

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹string›*

The Promise of load success response.
Promise is rejected if failed to load.

___

###  loadRewardedAd

▸ **loadRewardedAd**(`id`: string): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:69](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L69)*

Loads the specified Rewarded Ad Unit ID.
Can be called multiple times to pre-load multiple ads.
Promise is resolved when successfully loaded.

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹string›*

The Promise of load success response.
Promise is rejected if failed to load.

___

###  showInterstitialAd

▸ **showInterstitialAd**(`id`: string): *Promise‹string›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:77](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L77)*

Shows the Interstitial Ad for the specified ID.
Promise is resolved after the user closes the Ad.

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹string›*

The Promise of close success response.
Promise is rejected if the Ad failed to display wasn't loaded first using MiniApp.loadInterstitialAd.

___

###  showRewardedAd

▸ **showRewardedAd**(`id`: string): *Promise‹[Reward](reward.md)›*

*Defined in [js-miniapp-sdk/src/miniapp.ts:86](https://github.com/rakutentech/js-miniapp/blob/b2a8f8e/js-miniapp-sdk/src/miniapp.ts#L86)*

Shows the Rewarded Ad for the specified ID.
Promise is resolved with an object after the user closes the Ad. The object contains the reward earned by the user.
Reward will be null if the user did not earn the reward.

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[Reward](reward.md)›*

The Promise of Rewarded ad response result from injected side.
Promise is rejected if the Ad failed to display wasn't loaded first using MiniApp.loadRewardedAds.
