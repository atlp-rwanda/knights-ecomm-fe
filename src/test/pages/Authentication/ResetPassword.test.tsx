import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../../redux/store';
import { ResetPassword } from '../../../pages/Authentication/ResetPassword';

describe('ResetPassword', () => {
  it('renders the ResetPassword component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ResetPassword />
        </BrowserRouter>
      </Provider>
    );

    const heading = screen.getByText('Reset your password', { selector: 'h1' });
    expect(heading).toBeInTheDocument();

    const newPasswordLabel = screen.getByText('New password', { selector: 'p' });
    expect(newPasswordLabel).toBeInTheDocument();

    const confirmPasswordLabel = screen.getByText('Confirm password', { selector: 'p' });
    expect(confirmPasswordLabel).toBeInTheDocument();

    const resetButton = screen.getByText('Reset Password');
    expect(resetButton).toBeInTheDocument();
  });
});
