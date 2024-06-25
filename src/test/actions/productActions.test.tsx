import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchProducts,
  createProduct,
  fetchVendorProducts,
  fetchSingleProduct
} from '../../redux/actions/productAction';
import { ProductActionTypes } from '../../redux/types/productTypes'; // Adjust the path accordingly
import { describe, it, beforeEach } from 'vitest';
import { createTestStore } from '../storeWithCapturedActions';

const mockAxios = new MockAdapter(axios);

describe('Product Actions', () => {
  let store: ReturnType<typeof createTestStore>['store'];
  let actions: ReturnType<typeof createTestStore>['actions'];

  beforeEach(() => {
    const testStore = createTestStore();
    store = testStore.store;
    actions = testStore.actions;
    mockAxios.reset();
  });

  it('creates FETCH_PRODUCTS when fetching products has been done', async () => {
    const mockData = { data: 'mocked data' };
    mockAxios.onGet(`${import.meta.env.VITE_APP_API_URL}/product/all`).reply(200, mockData);

    await store.dispatch(fetchProducts() as any);

    expect(actions[0].type).toEqual('products/fetchProducts/pending');
    expect(actions[1].type).toEqual('products/fetchProducts/fulfilled');
    expect(actions[1].payload).toEqual(mockData);
  });

  it('creates CREATE_PRODUCT_SUCCESS when creating a product has been done', async () => {
    const mockData = { data: 'mocked data', status: 201 };
    const formData = new FormData();
    const token = 'mockedToken';
    localStorage.setItem('userToken', JSON.stringify({ token }));

    mockAxios.onPost(`${import.meta.env.VITE_APP_API_URL}/product/`).reply(201, mockData);

    await store.dispatch(createProduct(formData) as any);

    expect(actions[0]).toEqual({ type: ProductActionTypes.CREATE_PRODUCT_REQUEST });
    expect(actions[1].type).toEqual(ProductActionTypes.CREATE_PRODUCT_SUCCESS);
  });

  it('creates FETCH_VENDOR_PRODUCTS when fetching vendor products has been done', async () => {
    const mockData = { data: 'mocked data' };
    const token = 'mockedToken';
    localStorage.setItem('userToken', JSON.stringify({ token }));

    mockAxios.onGet(`${import.meta.env.VITE_APP_API_URL}/product/collection`).reply(200, mockData);

    await store.dispatch(fetchVendorProducts() as any);

    expect(actions[0].type).toEqual('vendorProducts/fetchVendorProducts/pending');
    expect(actions[1].type).toEqual('vendorProducts/fetchVendorProducts/rejected');
    expect(actions[1].payload).toEqual('Request failed with status code 404');
  });

  it('creates FETCH_SINGLE_PRODUCT when fetching a single product has been done', async () => {
    const mockData = { product: 'mocked product' };
    const productId = 'mockedId';

    mockAxios.onGet(`${import.meta.env.VITE_APP_API_URL}/product/${productId}`).reply(200, mockData);

    await store.dispatch(fetchSingleProduct(productId) as any);

    expect(actions[0].type).toEqual('products/fetchSingleProduct/pending');
    expect(actions[1].type).toEqual('products/fetchSingleProduct/fulfilled');
    expect(actions[1].payload).toEqual(mockData.product);
  });
});
