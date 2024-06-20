import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ProductActionTypes, ProductActions } from '../types/productTypes';
import { Product, VendorProduct } from '../../types/productTypes';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_LOCAL}/product/all`);
  return response.data;
});

export const createProduct = (formData: FormData) => async (dispatch: Dispatch<ProductActions>) => {
  try {
    dispatch({ type: ProductActionTypes.CREATE_PRODUCT_REQUEST });
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3ZTBmYjQxLWM3OTUtNDczOS1iZWEwLTEzYjE4YWU2MTY0NiIsImVtYWlsIjoibWF4bWl6NTEyQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiVmVuZG9yIiwiaWF0IjoxNzE4ODkzNDA4LCJleHAiOjE3MTg5Nzk4MDh9.fojElRatvQN6KUQDbBrK5mZrR0vAmfBeWP1kNrM_7KE';
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL_LOCAL}/product/`, formData, config);

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
      const token = localStorage.getItem('token');
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3ZTBmYjQxLWM3OTUtNDczOS1iZWEwLTEzYjE4YWU2MTY0NiIsImVtYWlsIjoibWF4bWl6NTEyQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiVmVuZG9yIiwiaWF0IjoxNzE4OTgwMDE2LCJleHAiOjE3MTkwNjY0MTZ9.p-oxEoekPUWC1dLRVfXsvtcnU_iyO-JROU0u4TnEHC8';
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_LOCAL}/product/collection`, {
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
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL_LOCAL}/product/${productId}`, {});
      return response.data.product;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
