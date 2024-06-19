import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createCoupon, fetchProducts } from '../actions/productAction';
import { ProductsResponse } from '../../types/productTypes';

interface ProductState {
  products: ProductsResponse | null;
  loading: boolean;
  message: string;
  error: string | null;
}

const initialState: ProductState = {
  products: null,
  loading: false,
  message: '',
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
      })
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createCoupon.fulfilled,
        (state, action: PayloadAction<{ data: { message: string } }>) => {
          state.loading = false;
          state.message = action.payload || 'Success!';
        }
      )
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  }
});

export default productSlice.reducer;
