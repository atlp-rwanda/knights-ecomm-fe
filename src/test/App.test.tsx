import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the WelcomePage component', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const welcomePageElement = screen.getByText('Welcome to Knights ecommerce');
    expect(welcomePageElement).toBeInTheDocument();

    const paragraphElement = screen.getByText('Loading...');
    expect(paragraphElement).toBeInTheDocument();
  });
});
