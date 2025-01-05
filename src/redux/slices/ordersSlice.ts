import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: string;
  amount: number;
}

interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  // products: Product[];
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get('http://localhost:3001/api/orders');
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
      state.orders = state.orders.filter(order => order.id !== action.payload);
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