import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSideBar from '../components/Dashboard/DashboardSideBar/DashboardSideBar';
import DashboardNavbar from '../components/Dashboard/DashboardNavbar/DashboardNavbar';

const DashboardLayout: React.FC = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className="flex relative h-full">
      <DashboardSideBar setOpenNav={setOpenNav} openNav={openNav} />
      <div className="w-full">
        <DashboardNavbar setOpenNav={setOpenNav} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
