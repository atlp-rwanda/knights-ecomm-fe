import React from 'react';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import DashboardNavbar from '../../../components/Dashboard/DashboardNavbar/DashboardNavbar';

describe('DashboardNavbar', () => {
  it('renders the DashboardNavbar component without crashing', () => {
    render(
      <Router>
        <DashboardNavbar setOpenNav={() => {}} />
      </Router>
    );
  });
});
