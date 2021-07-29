export interface Product {
  id: string;
  picture: string;
  name: string;
  type: string;
  color: string;
  size: string;
  quantity: number;
  notes: string;
  weight: number;
  total_weight: number;
  price: number;
  total_price: number;
  currency: string;
  sku: string;
  is_wholesale: boolean;
}

export interface Total {
  total: number;
  shop: string;
  sub_total: any;
}

export interface ProductState {
  product: Product[];
  save: Product[];
  total: Total;
}
