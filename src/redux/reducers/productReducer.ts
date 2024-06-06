import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../actions/productAction';
import { ProductsResponse } from '../../types/productTypes';

interface ProductState {
  products: ProductsResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: null,
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsResponse>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export default productSlice.reducer;
