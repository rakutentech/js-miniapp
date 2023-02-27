export interface ProductInfo {
  title: string;
  description: string;
  id: string;
  price: ProductPrice;
}

export interface ProductPrice {
  currencyCode: string;
  price: string;
}

export interface PurchasedProductInfo {
  product: ProductInfo;
  transactionId: string;
  transactionDate: string;
}
