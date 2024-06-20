import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Provider } from 'react-redux';
import DashboardNewProducts from '../../../components/Products/DashboardNewProducts/DashboardNewProducts';
import store from '../../../redux/store';
import { MemoryRouter } from 'react-router-dom';

describe('DashboardNewProducts', () => {
  it('renders the DashboardNewProducts component without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DashboardNewProducts />
        </MemoryRouter>
      </Provider>
    );

    // Check if the component renders the title
    expect(screen.getByText('Add New Product')).toBeInTheDocument();

    // Check if the component renders the form elements
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Expiration Date')).toBeInTheDocument();
    expect(screen.getByText('New Price (Rwf)')).toBeInTheDocument();
    expect(screen.getByText('Image Upload')).toBeInTheDocument();
  });

  it('displays validation errors when form is submitted with invalid data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DashboardNewProducts />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByText('New Product') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(screen.getByText('Product name must be at least 3 characters long.')).toBeInTheDocument();
    expect(screen.getByText('Description must be at least 3 characters long.')).toBeInTheDocument();
    expect(screen.getByText('Please select or enter a category.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid quantity.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid price.')).toBeInTheDocument();
    expect(screen.getByText('Please upload at least two images.')).toBeInTheDocument();
    expect(screen.getByText('You need an experiry date')).toBeInTheDocument();
  });
});
