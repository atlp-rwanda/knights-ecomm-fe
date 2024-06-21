import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productReducer';
import registerReducer from './registerReducer';
import verifyEmailReducer from './verifyEmailReducer';
import passwordReducer from './passwordResetReducer';

const rootReducer = combineReducers({
  register: registerReducer,
  verifyEmail: verifyEmailReducer,
  products: productReducer,
  password: passwordReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
