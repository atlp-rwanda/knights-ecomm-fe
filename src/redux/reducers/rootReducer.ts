// src/reducers/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productReducer';
import registerReducer from './registerReducer';
import verifyEmailReducer from './verifyEmailReducer';
import loginReducer from './loginReducer';
import authReducer from './authReducer';
import productSliceReducer from './getVendorProductsReducer';
import { productCreateReducer } from './createProductReducer';
import singleProductReducer from './getSingleProductReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer,
  verifyEmail: verifyEmailReducer,
  products: productReducer,
  productCreate: productCreateReducer,
  getVendorProduct: productSliceReducer,
  singleProduct: singleProductReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
