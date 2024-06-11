import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${process.env.VITE_APP_API_URL}/product/all`);
  return response.data;
});
