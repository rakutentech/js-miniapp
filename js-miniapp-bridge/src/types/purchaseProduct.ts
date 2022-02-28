/** Points type. */
export interface Product {
  id: string;
  title: string;
  description: string;
  price: ProductPrice;
}

export interface ProductPrice {
  amount: number;
  currencyCode: string;
  price: string;
}

export interface PurchasedProduct {
  orderId: string;
  product: Product;
  token: string;
}
