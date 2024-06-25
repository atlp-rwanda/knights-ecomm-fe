import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navbar from '../../../components/Navbar/Navbar';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { MemoryRouter } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';

describe('Navbar', () => {
  beforeAll(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PageTitle title="Page Title" />
          <Navbar />
        </MemoryRouter>
      </Provider>
    );
  });
  it('renders the Navbar and PageTitle component', () => {
    const navbarElement = screen.getByText('KNIGHTS STORE');
    expect(navbarElement).toBeInTheDocument();
  });
});
