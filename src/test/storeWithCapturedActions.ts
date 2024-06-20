import { ThunkMiddleware, configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from '../redux/reducers/rootReducer';
import { thunk } from 'redux-thunk';
// Adjust the path to your rootReducer

export const createTestStore = () => {
  const actions: any[] = [];
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(() => (next) => (action) => {
        actions.push(action);
        return next(action);
        [thunk as ThunkMiddleware<RootState>];
      })
  });

  return { store, actions };
};
