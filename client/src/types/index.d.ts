interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  carts: CartItem[];
  orders: Order[];
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  user: User;
}

interface OrderItem extends Product {}

interface Order {
  _id: string;
  user: User;
  orderItems: OrderItem[];
  status: string;
  amount: number;
}
