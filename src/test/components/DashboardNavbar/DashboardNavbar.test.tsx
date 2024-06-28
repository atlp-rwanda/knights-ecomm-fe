import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { MemoryRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DashboardNavbar from '../../../components/Dashboard/DashboardNavbar/DashboardNavbar';
import DashboarInnerLayout from '../../../layout/DashboarInnerLayout';

describe('DashboardNavbar', () => {
  it('renders the DashboardNavbar component without crashing', () => {
    render(
      <Router>
        <DashboardNavbar setOpenNav={() => {}} />
      </Router>
    );
  });
});

it('should render the Outlet content', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/dashboard" element={<DashboarInnerLayout />}>
          <Route path="" element={<div>Dashboard Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
});
