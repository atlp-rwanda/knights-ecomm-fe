import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ProductActionTypes, ProductActions } from '../types/productTypes';
import { Product, VendorProduct } from '../../types/productTypes';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/all`);
  return response.data;
});

export const createProduct = (formData: FormData) => async (dispatch: Dispatch<ProductActions>) => {
  try {
    dispatch({ type: ProductActionTypes.CREATE_PRODUCT_REQUEST });

    const tokenString = localStorage.getItem('userToken');
    if (!tokenString) {
      throw new Error('Token not found');
    }

    const { token } = JSON.parse(tokenString);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/product/`, formData, config);

    dispatch({
      type: ProductActionTypes.CREATE_PRODUCT_SUCCESS,
      payload: { data: response.data, status: response.status }
    });
  } catch (error: any) {
    dispatch({
      type: ProductActionTypes.CREATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const fetchVendorProducts = createAsyncThunk<VendorProduct, void>(
  'vendorProducts/fetchVendorProducts',
  async (_, { rejectWithValue }) => {
    try {
      const tokenString = localStorage.getItem('userToken');
      if (!tokenString) {
        throw new Error('Token not found');
      }

      const { token } = JSON.parse(tokenString);

      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/collection`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk<Product, string>(
  'products/fetchSingleProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/${productId}`, {});
      return response.data.product;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
