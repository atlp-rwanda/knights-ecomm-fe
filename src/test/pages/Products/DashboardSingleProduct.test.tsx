import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Provider } from 'react-redux';
import DashboardSingleProduct from '../../../components/Products/DashboardSingleProduct/DashboardSingleProduct';
import store from '../../../redux/store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('DashboardSingleProduct', () => {
  it('displays loading indicator when fetching product', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/vendor/dashboard/products/1']}>
          <Routes>
            <Route path="/vendor/dashboard/products/:id" element={<DashboardSingleProduct />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
