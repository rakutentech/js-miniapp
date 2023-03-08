export interface ProductInfo {
  title: string;
  description: string;
  id: string;
  productPriceInfo: ProductPrice;
}
export interface ProductPrice {
  currencyCode: string;
  price: string;
}
export interface PurchasedProductInfo {
  productInfo: ProductInfo;
  transactionId: string;
  transactionDate: string;
}
