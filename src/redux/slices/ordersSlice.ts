import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: string;
//    id: number; // Змінено тип даних з string на number
//   name: string;
//   price: number;
  amount: number; // Додано властивість amount
}

interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products: Product[];
//   products: [];
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [
    {
      id: 1,
      title: 'Order 1',
      date: '2017-06-29 12:09:33',
      description: 'desc',
      products: [
        { id: '1', amount: 1 },
        { id: '2', amount: 2 },
      ] // Заповніть відповідними даними
    },
    {
      id: 2,
      title: 'Order 2',
      date: '2017-06-29 12:09:33',
      description: 'desc',
      products: [
        { id: '1', amount: 3 },
        { id: '2', amount: 4 },
      ] // Заповніть відповідними даними
    },
    {
      id: 3,
      title: 'Order 3',
      date: '2017-06-29 12:09:33',
      description: 'desc',
      products: [
        { id: '1', amount: 4 },
        { id: '2', amount: 5 },
      ] // Заповніть відповідними даними
    }
  ],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    removeOrder(state, action: PayloadAction<number>) {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },
  },
});

export const { addOrder, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;