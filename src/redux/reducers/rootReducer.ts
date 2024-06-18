import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productReducer';
import registerReducer from './registerReducer';
import verifyEmailReducer from './verifyEmailReducer';

const rootReducer = combineReducers({
  register: registerReducer,
  verifyEmail: verifyEmailReducer,
  products: productReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
