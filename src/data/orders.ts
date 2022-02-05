import {OrderTypes} from '../types';

export const orders: Array<OrderTypes> = [
  {
    id: 1,
    orderId: 'T032NJA',
    orderDate: '20 Jun 2021, 10:20 am',
    paymentMethod: 'Cash on delivery',
    shippingAddress: 'Near City Garden, New York, USA',
    status: 'Pending',
    drugs: [
      {id: 1, name: 'Chiken', qte: 1, price: 20},
      {id: 2, name: 'Farmville Pizza', qte: 1, price: 30},
    ],
  },
  {
    id: 2,
    orderId: 'GDW4329',
    orderDate: '20 Jun 2021, 10:20 am',
    status: 'Accepted',
    shippingAddress: 'Near City Garden, New York, USA',
    paymentMethod: 'Credit Card',
    drugs: [{id: 1, name: 'Fride Chiken', qte: 1, price: 20}],
  },
  {
    id: 3,
    orderId: '3425409',
    orderDate: '20 Jun 2021, 10:20 am',
    shippingAddress: 'Near City Garden, New York, USA',
    status: 'Delivered',
    paymentMethod: 'Paypal',
    drugs: [
      {id: 1, name: 'Fride Chiken', qte: 1, price: 20},
      {id: 2, name: 'Farmville Pizza', qte: 1, price: 30},
      {id: 3, name: 'Pizza', qte: 1, price: 30},
    ],
  },
];
