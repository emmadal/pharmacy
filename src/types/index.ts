export interface LoginTypes {
  email: string;
  password: string;
}
interface DrugOrderTypes {
  id: number;
  name: string;
  qte: number;
  price: number;
}
export interface OrderTypes {
  id: number;
  orderId: string;
  orderDate: string;
  paymentMethod: string;
  shippingAddress: string;
  status: string;
  drugs: Array<DrugOrderTypes>;
}
