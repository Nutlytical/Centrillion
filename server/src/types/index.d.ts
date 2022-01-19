interface ProductType {
  name: string;
  description: string;
  price: number;
}

interface UserType {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  tokenVersion: number;
  carts: SchemaTypeOptions<cartItemType[]>;
  orders: SchemaTypeOptions<OrderType[]>;
}

interface OrderItemType {
  product: SchemaTypeOptions<ProductType[]>;
  quantity: number;
  user: SchemaTypeOptions<UserType>;
}

interface OrderType {
  user: SchemaTypeOptions<UserType>;
  orderItems: SchemaTypeOptions<OrderItemType[]>;
  status: enum;
  amount: number;
}

interface TokenType {
  userId: string;
  tokenVersion: string;
  iat: number;
  exp: number;
}

interface cartItemType {
  product: SchemaTypeOptions<ProductType>;
  quantity: number;
  user: SchemaTypeOptions<UserType>;
}
