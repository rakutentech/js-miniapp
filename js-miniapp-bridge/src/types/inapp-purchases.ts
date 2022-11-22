export interface Product {
  title: string;
  description: string;
  id: string;
  price: ProductPrice;
}

export interface ProductPrice {
  currencyCode: string;
  price: string;
}

export interface PurchasedProduct {
  product: Product;
  transactionId: string;
  transactionDate: string;
}
