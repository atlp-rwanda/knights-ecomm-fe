import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../../redux/store';
import { ForgotPassword } from '../../../pages/Authentication/ForgotPassword';

describe('ForgotPassword', () => {
  it('renders the ForgotPassword component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ForgotPassword />
        </BrowserRouter>
      </Provider>
    );

    // Check for the heading
    const heading = screen.getByText('Forgot your password?', { selector: 'h1' });
    expect(heading).toBeInTheDocument();

    // Check for the instruction text
    const instructionText = screen.getByText("Enter your email and we'll send you a reset link.");
    expect(instructionText).toBeInTheDocument();

    // Check for the email input field
    const emailInput = screen.getByPlaceholderText('johnDoe@gmail.com');
    expect(emailInput).toBeInTheDocument();

    // Check for the "Send Reset Link" button
    const sendButton = screen.getByText('Send Reset Link');
    expect(sendButton).toBeInTheDocument();
  });

  it('shows error when email is not provided', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ForgotPassword />
        </BrowserRouter>
      </Provider>
    );

    const sendButton = screen.getByText('Send Reset Link');
    fireEvent.click(sendButton);

    const errorMessage = await screen.findByText('Email is required');
    expect(errorMessage).toBeInTheDocument();
  });
});
