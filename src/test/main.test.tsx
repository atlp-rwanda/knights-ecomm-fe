import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('Main entry point', () => {
  it('renders the App component inside BrowserRouter without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByTestId('app-component')).toBeInTheDocument();
  });
});
