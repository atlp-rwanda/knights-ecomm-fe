import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './productReducer';
import registerReducer from './registerReducer';
import verifyEmailReducer from './verifyEmailReducer';
import loginReducer from './loginReducer';
import authReducer from './authReducer';
import passwordReducer from './passwordResetReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer,
  verifyEmail: verifyEmailReducer,
  products: productReducer,
  password: passwordReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
