export interface UserInfo{
  id: string;
  name: string;
} 

export interface UserState{
  userInfo: UserInfo | null
  loading: boolean;
  error: object | null;
}

export interface IUserLogin{
  username: string;
  password: string;
}

export interface decodedTokenData {
  name: string;
  exp: number;
  iat: number;
  sub: string;
}

export interface salesResponse{
  id: string,
  client_name: string,
  userId: string,
  productId: string,
  quantity: number,
  paid: number,
  date: string,
  discount: boolean,
  created_at: string
  Product: {
    id: string,
    name: string,
    code: string,
    discountPercentage: number,
    price: number,
    created_at: string
  },
  Payment?: {
    amount: number,
    payment_type: string,
  }[],
  _count: number,
  TotalPrice: number
}


export interface PaymentResponse{
  id: string,
  payment_type: string,
  amount: number,
  description: string,
  date: string,
  sale: {
    client_name: string,
    date: string,
    quantity: number,
    Product: {
      name: string,
      price: number
    }
  }
}