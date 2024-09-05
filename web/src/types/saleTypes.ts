export interface Sale {
  id: string;
  client_name: string;
  userId: string;
  productId: string;
  quantity: number;
  paid: number;
  date: string;
  discount: boolean;
  created_at: string;
  Product: {
    id: string;
    name: string;
    code: string;
    discountPercentage: number;
    price: number;
    created_at: string;
  };
  Payment?: {
    amount: number;
    payment_type: string;
  }[];
}

export interface GetSalesResponse {
  Sales: Sale[];
  count: number;
}
