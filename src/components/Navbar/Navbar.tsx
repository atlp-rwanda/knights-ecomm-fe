import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import knightsLogo from '../../images/logo.png';
import cart from '../../images/cart.png';
import user from '../../images/user.png';
import notificationBell from '../../images/bell.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import DesktopMenu from '../Menu/DesktopMenu';

function Navbar() {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setShowDesktopMenu(false);
  }, [userToken]);

  const desktopMenuHandler = () => {
    setShowDesktopMenu((prevData) => !prevData);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav
      className="w-full min-h-[10vh] h-auto flex items-center justify-between bg-white px-6 lg:px-12 py-5 sticky top-0 shadow-navbar text-baseBlack"
      data-testid="navbar"
    >
      <h1 className="flex items-center justify-start gap-x-2 text-primary capitalize font-medium text-xl">
        <img src={knightsLogo} alt="" />
        KNIGHTS STORE
      </h1>

      <div className="hidden lg:w-[26rem] md:w-72 min-h-10 md:flex items-center justify-between gap-x-1 px-4 py-2 border border-neutrals500 bg-white rounded-3xl">
        <input
          className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-base placeholder-grey2"
          type="text"
          id="searchInput"
          placeholder="search for anything"
          value={searchTerm}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchSubmit}
        />
        <Search strokeWidth={1.5} className="text-orange" />
      </div>

      <div className="hidden md:flex items-center justify-end md:gap-x-5 lg:gap-x-10">
        {!userToken && (
          <Link
            to="/login"
            className="h-10 md:w-24 lg:w-28 flex items-center justify-center no-underline text-primary border border-neutrals500 rounded-full px-9 text-base"
          >
            Login
          </Link>
        )}
        {userToken && (
          <a href="/notification" className="relative cursor-pointer">
            <img src={notificationBell} alt="" className="w-7 h-7" />
            <span className="absolute min-w-6 h-6 top-0 right-[3px] mt-[-10px] mr-[-15px] bg-orange text-white text-sm flex items-center justify-center rounded-full leading-none p-1">
              0
            </span>
          </a>
        )}
        <a href="/cart" className="relative cursor-pointer">
          <img src={cart} alt="" className="w-7 h-7" />
          <span className="absolute min-w-6 h-6 top-0 right-[1px] mt-[-10px] mr-[-15px] bg-orange text-white text-sm flex items-center justify-center rounded-full leading-none p-1">
            0
          </span>
        </a>
        {userToken && (
          <div onClick={desktopMenuHandler} className="relative cursor-pointer">
            <img src={user} alt="User-Icon" className="w-8 h-8" />
          </div>
        )}
      </div>
      {userToken && showDesktopMenu && (
        <div className="absolute right-6 top-[12vh]">
          <DesktopMenu />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
