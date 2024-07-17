import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App'; // Assuming App is the top-level component

describe('Root Component', () => {
  it('renders without crashing', () => {
    render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );

    expect(screen.getByTestId('app-component')).toBeInTheDocument(); // Use the correct data-testid
  });
});
