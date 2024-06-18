import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { LoginData } from '../../types/registerType';
import { redirect } from 'react-router-dom';

// Thunk for posting a new product
export const loginUser = createAsyncThunk(
  'products/createProduct',
  async (userData: LoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/user/login`, userData);
      console.log('in');
      const resData = await response.json();
      return response.data;
    } catch (err) {
      // Return a rejected action containing the error message if the request fails
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);
