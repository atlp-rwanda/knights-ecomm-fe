import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSingleProduct } from '../actions/productAction';
import { Product } from '../../types/productTypes';

interface SingleProductState {
  loading: boolean;
  product: Product | null;
  error: string | null;
}

const initialState: SingleProductState = {
  loading: false,
  product: null,
  error: null
};

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
      });
  }
});

export default singleProductSlice.reducer;
