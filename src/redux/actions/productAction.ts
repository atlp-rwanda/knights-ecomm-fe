import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CreateCouponArgs } from '../../types/CouponTypes';
import HttpRequest from '../../services/HttpRequest';
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/all`);
  return response.data;
});
export const createCoupon = createAsyncThunk(
  'products/createCoupon',
  async ({ data, vendorid }: CreateCouponArgs) => {
    const response = await HttpRequest.post(
      `${import.meta.env.VITE_APP_API_URL}/coupons/vendor/${vendorid}`,
      data
    );
    return response.data;
  }
);
