import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DashboardEditProducts from '../../../components/Products/DashboardEditProducts/DashboardEditProducts';
import { updateProduct } from '../../../redux/actions/productAction';

const mockStore = configureStore([thunk as any]);
const store = mockStore({
  singleProduct: {
    loading: false,
    product: {
      name: 'Sample Product',
      description: 'Sample Description',
      quantity: 10,
      newPrice: '1000',
      oldPrice: '1200',
      categories: [{ id: '1', name: 'Category1' }],
      images: ['image1.jpg'],
      expirationDate: '2024-12-31'
    },
    error: null
  }
});

describe('DashboardEditProducts', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('renders the component with product details', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/vendor/dashboard/products/1/edit']}>
          <Routes>
            <Route path="/vendor/dashboard/products/:id/edit" element={<DashboardEditProducts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Update Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sample Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sample Description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1200')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2024-12-31')).toBeInTheDocument();
  });

  test('updates product details on form submission', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/vendor/dashboard/products/1/edit']}>
          <Routes>
            <Route path="/vendor/dashboard/products/:id/edit" element={<DashboardEditProducts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Product Name'), {
      target: { value: 'Updated Product' }
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Updated Description' }
    });
    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText('New Price (Rwf)'), { target: { value: '1500' } });
    fireEvent.change(screen.getByLabelText('Old Price (Rwf)'), { target: { value: '1800' } });
    fireEvent.change(screen.getByLabelText('Expiration Date'), { target: { value: '2025-12-31' } });

    fireEvent.click(screen.getByText('Update Product'));

    await waitFor(() => {
      expect(updateProduct).toHaveBeenCalled();
      expect(updateProduct).toHaveBeenCalledWith({
        id: '1',
        formData: expect.any(FormData)
      });
    });
  });

  test('displays validation errors', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/vendor/dashboard/products/1/edit']}>
          <Routes>
            <Route path="/vendor/dashboard/products/:id/edit" element={<DashboardEditProducts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Product Name'), { target: { value: 'Up' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Up' } });
    fireEvent.change(screen.getByLabelText('Quantity'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('New Price (Rwf)'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Expiration Date'), { target: { value: '' } });

    fireEvent.click(screen.getByText('Update Product'));

    expect(await screen.findByText('Product name must be at least 3 characters long.')).toBeInTheDocument();
    expect(await screen.findByText('Description must be at least 3 characters long.')).toBeInTheDocument();
    expect(await screen.findByText('Please enter a valid quantity.')).toBeInTheDocument();
    expect(await screen.findByText('Please enter a valid price.')).toBeInTheDocument();
    expect(await screen.findByText('You need an expiry date')).toBeInTheDocument();
  });

  test('displays error message on API failure', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/vendor/dashboard/products/1/edit']}>
          <Routes>
            <Route path="/vendor/dashboard/products/:id/edit" element={<DashboardEditProducts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Update Product'));

    await waitFor(() => {
      expect(screen.getByText('Failed to update product.')).toBeInTheDocument();
    });
  });

  test('renders categories correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/vendor/dashboard/products/1/edit']}>
          <Routes>
            <Route path="/vendor/dashboard/products/:id/edit" element={<DashboardEditProducts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Category1')).toBeInTheDocument();
  });

  test('handles image upload', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/vendor/dashboard/products/1/edit']}>
          <Routes>
            <Route path="/vendor/dashboard/products/:id/edit" element={<DashboardEditProducts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const file = new File(['image'], 'image.jpg', { type: 'image/jpeg' });
    const input = screen.getByLabelText('Upload Images');
    fireEvent.change(input, { target: { files: [file] } });

    expect(await screen.findByText('image.jpg')).toBeInTheDocument();
  });

  test('resets form fields', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/vendor/dashboard/products/1/edit']}>
          <Routes>
            <Route path="/vendor/dashboard/products/:id/edit" element={<DashboardEditProducts />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Product Name'), {
      target: { value: 'Updated Product' }
    });
    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByDisplayValue('Sample Product')).toBeInTheDocument();
  });
});
