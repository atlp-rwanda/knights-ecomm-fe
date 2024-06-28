import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import knightsLogo from '../../images/logo.png';
import cart from '../../images/cart.png';
import user from '../../images/user.png';
import notificationBell from '../../images/bell.png';
import menuIcon from '../../assets/Menu.svg';
import closeIcon from '../../assets/Close.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import DesktopMenu from '../Menu/DesktopMenu';
import Login from './loginComponent';
import CategoriesMenu from '../Menu/CategoriesMenu';

function Navbar() {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setShowDesktopMenu(false);
  }, [userToken]);

  const desktopMenuHandler = () => {
    setShowDesktopMenu((prevData) => !prevData);
  };

  return (
    <nav
      className={`relative z-50 w-full min-h-[10vh] h-auto flex items-center ${userToken ? 'justify-center flex-col gap-4' : 'justify-between'} xmd:flex-row xmd:justify-between bg-white px-6 lg:px-12 py-5 sticky top-0 shadow-navbar text-baseBlack`}
      data-testid="navbar"
    >
      <h1
        onClick={() => {
          navigate('/');
        }}
        className="cursor-pointer flex items-center justify-start gap-x-2 text-primary capitalize font-medium text-xl"
      >
        <img src={knightsLogo} alt="" />
        KNIGHTS STORE
      </h1>

      {!userToken && (
        <div className="xmd:hidden flex gap-5">
          <Search strokeWidth={1.5} className="w-10 h-9 text-black" />
          <img onClick={() => setShowMenu((prevState) => !prevState)} src={menuIcon} className="w-9 h-9" alt="" />
        </div>
      )}

      {userToken && (
        <div className="xmd:hidden flex justify-between w-[100%]">
          <Search strokeWidth={1.5} className="w-[25px] h-[25px] text-black" />
          <a href="/notification" className="relative cursor-pointer">
            <img src={notificationBell} className="w-[25px] h-[25px]" alt="" />
            <span className="absolute min-w-5 h-5 top-1 right-[14px] mt-[-10px] mr-[-15px] bg-orange text-white text-xs flex items-center justify-center rounded-full leading-none p-1">
              0
            </span>
          </a>
          <a href="/cart" className="relative cursor-pointer">
            <img src={cart} alt="" className="w-[25px] h-[25px]" />
            <span className="absolute min-w-5 h5 top-1 right-[6px] mt-[-10px] mr-[-15px] bg-orange text-white text-xs flex items-center justify-center rounded-full leading-none p-1">
              0
            </span>
          </a>
          <img src={user} onClick={desktopMenuHandler} alt="User-Icon" className="w-[25px] h-[25px]" />
          <img
            onClick={() => setShowMenu((prevState) => !prevState)}
            src={menuIcon}
            className="w-[25px] h-[25px]"
            alt=""
          />
        </div>
      )}

      {showMenu && (
        <div
          className={`absolute ${userToken ? 'top-32' : 'top-20'} left-0 w-[100%] bg-slate-100 h-[500px] p-6 flex flex-col gap-6`}
        >
          <div className={`flex ${userToken ? 'justify-end' : 'justify-between'}`}>
            {!userToken && (
              <div onClick={() => setShowMenu(false)}>
                <Link to="/login">
                  <Login />
                </Link>
              </div>
            )}
            <img onClick={() => setShowMenu(false)} src={closeIcon} alt="" />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <CategoriesMenu setShowMenu={setShowMenu} />
          </div>
        </div>
      )}

      <div className=" hidden lg:w-[40%] xmd:w-[40%] min-h-10 xmd:flex items-center justify-between gap-x-1 px-4 py-2 border border-neutrals500 bg-white rounded-3xl">
        <input
          className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-base placeholder-grey2"
          type="text"
          placeholder="search for anything"
        />
        <Search strokeWidth={1.5} className="text-orange" />
      </div>

      <div className="hidden xmd:flex items-center justify-end sm:gap-x-5 lg:gap-x-10">
        {!userToken && (
          <Link to="/login">
            <Login />
          </Link>
        )}
        {userToken && (
          <a href="/notification" className="relative cursor-pointer">
            <img src={notificationBell} alt="" className="w-7 h-7" />
            <span className="absolute min-w-5 h-5 top-1 right-[12px] mt-[-10px] mr-[-15px] bg-orange text-white text-sm flex items-center justify-center rounded-full leading-none p-1">
              0
            </span>
          </a>
        )}
        <a href="/cart" className="relative cursor-pointer">
          <img src={cart} alt="" className="w-7 h-7" />
          <span className="absolute min-w-5 h-5 top-1 right-[5px] mt-[-10px] mr-[-15px] bg-orange text-white text-sm flex items-center justify-center rounded-full leading-none p-1">
            0
          </span>
        </a>
        {userToken && (
          <div onClick={desktopMenuHandler} className="relative cursor-pointer">
            <img src={user} alt="User-Icon" className="w-7 h-7" />
          </div>
        )}
      </div>
      {userToken && showDesktopMenu && (
        <div className="absolute top-[130px] right-[25%] xmd:right-6 xmd:top-[12vh]">
          <DesktopMenu />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
