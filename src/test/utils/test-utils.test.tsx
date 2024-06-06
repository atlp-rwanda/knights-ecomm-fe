// src/utils/test-utils.test.tsx
import React from 'react';
import { cleanup, render, screen } from './test-utils';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});

function TestComponent() {
  return <div>Test Component</div>;
}

describe('customRender and cleanup', () => {
  it('renders a component using custom render', () => {
    render(<TestComponent />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('cleans up after each test', () => {
    expect(document.body.innerHTML).toBe('');
  });
});
