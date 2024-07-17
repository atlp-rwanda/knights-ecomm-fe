import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RegisterData } from '../../../types/registerType'; // Adjust the path as needed
import rootReducer from '../../../redux/reducers/rootReducer'; // Adjust the path to your rootReducer
import { AppDispatch } from '../../../redux/store'; // Import types
import { registerUser } from '../../../redux/actions/registerAction';

describe('registerActions', () => {
  let mockAxios: MockAdapter;
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false
        })
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should register a user and handle the response', async () => {
    const userData: RegisterData = {
      firstName: 'testuser',
      lastName: 'testlast',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      gender: 'male',
      password: 'password123',
      userType: 'regular'
    };
    const responseData = { message: 'User registered successfully' };
    mockAxios.onPost(`${import.meta.env.VITE_APP_API_URL}/user/register`).reply(200, responseData);

    const result = await (store.dispatch as AppDispatch)(registerUser(userData));

    expect(result.payload).toEqual(responseData);
    expect(mockAxios.history.post[0].url).toBe(`${import.meta.env.VITE_APP_API_URL}/user/register`);
    expect(mockAxios.history.post[0].data).toBe(JSON.stringify(userData));
  });

  it('should handle registration errors', async () => {
    const userData: RegisterData = {
      firstName: 'testuser',
      lastName: 'testlast',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      gender: 'male',
      password: 'password123',
      userType: 'regular'
    };
    const errorMessage = 'User registration failed';
    mockAxios.onPost(`${import.meta.env.VITE_APP_API_URL}/user/register`).reply(400, { message: errorMessage });

    const result = await (store.dispatch as AppDispatch)(registerUser(userData));

    expect(result.payload).toEqual({ message: errorMessage });
    expect(mockAxios.history.post[0].url).toBe(`${import.meta.env.VITE_APP_API_URL}/user/register`);
    expect(mockAxios.history.post[0].data).toBe(JSON.stringify(userData));
  });
});
