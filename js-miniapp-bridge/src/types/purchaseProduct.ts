export interface Product {
  id: string;
  title: string;
  description: string;
  price: ProductPrice;
}

export interface ProductPrice {
  currencyCode: string;
  price: string;
}

export interface PurchasedProduct {
  productInfo: Product;
  transactionId: string;
  transactionDate: string;
}

export interface PurchasedProductResponse {
  status: PurchasedProductResponseStatus;
  purchasedProduct: PurchasedProduct;
}

export enum PurchasedProductResponseStatus {
  PURCHASED = 'PURCHASED',
  FAILED = 'FAILED',
  RESTORED = 'RESTORED',
}
