import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productReducer';
import registerReducer from './registerReducer';
import verifyEmailReducer from './verifyEmailReducer';
import userReducer from './userReducer';
import loginReducer from './loginReducer';
import authReducer from './authReducer';
import passwordReducer from './passwordResetReducer';
import { productCreateReducer } from './createProductReducer';
import getSingleProductReducer from './getSingleProductReducer';
import productSliceReducer from './getVendorProductsReducer';
import updateProductReducer from './updateProductReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  currentUser: userReducer,
  register: registerReducer,
  login: loginReducer,
  verifyEmail: verifyEmailReducer,
  products: productReducer,
  productCreate: productCreateReducer,
  getVendorProduct: productSliceReducer,
  singleProduct: getSingleProductReducer,
  password: passwordReducer,
  updateProduct: updateProductReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
