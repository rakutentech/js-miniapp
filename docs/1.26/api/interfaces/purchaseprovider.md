**[js-miniapp-sdk](../README.md)**

> [Globals](../README.md) / PurchaseProvider

# Interface: PurchaseProvider

## Hierarchy

* **PurchaseProvider**

## Index

### Methods

* [consumePurchaseWith](purchaseprovider.md#consumepurchasewith)
* [getAllProducts](purchaseprovider.md#getallproducts)
* [purchaseProductWith](purchaseprovider.md#purchaseproductwith)

## Methods

### consumePurchaseWith

▸ **consumePurchaseWith**(`id`: string, `transactionId`: string): Promise\<[PurchasedProductInfo](purchasedproductinfo.md)>

*Defined in [js-miniapp-sdk/src/modules/in-app-purchase.ts:26](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/in-app-purchase.ts#L26)*

Triggers the request to host app to Purchase a product using the Product ID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | The product id which must be purchased from inapp-purchase. This will return the status of inapp-purchase and the details of the purchased product.  |
`transactionId` | string | - |

**Returns:** Promise\<[PurchasedProductInfo](purchasedproductinfo.md)>

___

### getAllProducts

▸ **getAllProducts**(): Promise\<[ProductInfo](productinfo.md)[]>

*Defined in [js-miniapp-sdk/src/modules/in-app-purchase.ts:12](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/in-app-purchase.ts#L12)*

Retrieves and lists all the products from the play/app store which are available for inapp-purchases.

**Returns:** Promise\<[ProductInfo](productinfo.md)[]>

___

### purchaseProductWith

▸ **purchaseProductWith**(`id`: string): Promise\<[PurchasedProductInfo](purchasedproductinfo.md)>

*Defined in [js-miniapp-sdk/src/modules/in-app-purchase.ts:19](https://github.com/rakutentech/js-miniapp/blob/759cace/js-miniapp-sdk/src/modules/in-app-purchase.ts#L19)*

Triggers the request to host app to Purchase a product using the Product ID.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`id` | string | The product id which must be purchased from inapp-purchase. This will return the status of inapp-purchase and the details of the purchased product.  |

**Returns:** Promise\<[PurchasedProductInfo](purchasedproductinfo.md)>
