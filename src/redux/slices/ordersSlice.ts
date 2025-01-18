import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Order {
  id: number;
  orderId: number;
  title: string;
  date: string;
  description: string;
  products: {
    productId: number;
    amount: number;
  }[];
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  // const response = await axios.get('http://localhost:3001/api/orders');
  const response = await axios.get(`${API_URL}/api/orders`);

  return response.data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    removeOrder(state, action: PayloadAction<number>) {
      console.log(action.payload);
      state.orders = state.orders.filter(order => order.orderId !== action.payload);
      console.log(state.orders);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const { addOrder, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;