import React, { useState } from 'react';
import notificationIcon from '/notification.svg';
import searchIcon from '/search.svg';
import { Link } from 'react-router-dom';
import { AlignJustify } from 'lucide-react';

interface DashboardNavBarProps {
  setOpenNav: (open: boolean) => void;
}
const DashboardNavbar: React.FC<DashboardNavBarProps> = ({ setOpenNav }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex justify-end gap-4 lg:gap-0 flex-col-reverse items-end lg:flex-row lg:justify-between lg:items-center p-8 border-b-[1px] border-[#7c7c7c] text-black relative">
      <Link to="/dashboard" className="lg:hidden text-4xl font-bold text-[#070f2b] absolute left-8 top-8">
        Knight
      </Link>
      <div className="flex flex-col items-end lg:items-start">
        <p className="font-bold text-xl">Welcome, James</p>
        <p className="text-[#7c7c7c] text-sm">1 October 2022 | 11:59 AM GMT</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex gap-4 items-center">
          <button className="px-4 lg:border-r-2 border-[#7c7c7c]">
            <img src={notificationIcon} />
          </button>
          <button onClick={() => setOpenNav(true)} className="lg:hidden">
            <AlignJustify />
          </button>
        </div>
        <div className="hidden lg:flex px-4 py-2 rounded-lg border border-[#d1d1d1] gap-2">
          <img src={searchIcon} />
          <input
            type="text"
            className="bg-white w-[200px] outline-none"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
