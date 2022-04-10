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
  product: Product;
  transactionId: string;
  transactionDate: string;
}
