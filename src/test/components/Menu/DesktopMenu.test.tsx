import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { MemoryRouter } from 'react-router-dom';
import DesktopMenu from '../../../components/Menu/DesktopMenu';

describe('DesktopMenu', () => {
  it('renders the DesktopMenu component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DesktopMenu />
        </MemoryRouter>
      </Provider>
    );
    const listItemElement = screen.getByText('WishList');
    expect(listItemElement).toBeInTheDocument();
  });
});
