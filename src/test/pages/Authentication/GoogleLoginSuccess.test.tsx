import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { MemoryRouter } from 'react-router-dom';
import GoogleLoginSuccess from '../../../pages/Authentication/GoogleLoginSuccess';

describe('GoogleLogin', () => {
  it('renders the GoogleLogin component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <GoogleLoginSuccess />
        </MemoryRouter>
      </Provider>
    );
    const spanElement = screen.getByText('Signing in with Google');
    expect(spanElement).toBeInTheDocument();
  });
});
