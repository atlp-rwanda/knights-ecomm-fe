import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, VendorProduct } from '../../types/productTypes';
import { ProductActionTypes, ResetProductStateAction } from '../types/productTypes';
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/all`);
  return response.data;
});
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (formData: FormData, { rejectWithValue }) => {
    try {
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
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response && error.response.data.message ? error.response.data.message : error.message
      );
    }
  }
);
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
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
      const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}/product/${id}`, formData, config);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response && error.response.data.message ? error.response.data.message : error.message
      );
    }
  }
);
export const fetchVendorProducts = createAsyncThunk<VendorProduct, void>(
  'vendorProducts/fetchVendorProducts',
  async (_, { rejectWithValue }) => {
    try {
      const tokenString = localStorage.getItem('userToken');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const { token } = JSON.parse(tokenString);
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/product/collection?limit=100`, {
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
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const deleteProduct = createAsyncThunk<string, string>(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const tokenString = localStorage.getItem('userToken');
      if (!tokenString) {
        throw new Error('Token not found');
      }
      const { token } = JSON.parse(tokenString);
      await axios.delete(`${import.meta.env.VITE_APP_API_URL}/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const resetProductState = (): ResetProductStateAction => ({
  type: ProductActionTypes.RESET_PRODUCT_STATE
});
