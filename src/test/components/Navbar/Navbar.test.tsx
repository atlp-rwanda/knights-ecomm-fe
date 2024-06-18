import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navbar from '../../../components/Navbar/Navbar';

describe('Navbar', () => {
  it('renders the Navbar component', () => {
    render(<Navbar />);
    const navbarElement = screen.getByText('KNIGHTS STORE');
    expect(navbarElement).toBeInTheDocument();
  });
});
