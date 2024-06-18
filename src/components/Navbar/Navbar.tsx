import React from 'react';
import { Search } from 'lucide-react';
import knightsLogo from '../../images/logo.png';
import cart from '../../images/cart.png';

function Navbar() {
  return (
    <nav className="w-full min-h-[10vh] h-auto flex items-center justify-between bg-white px-12 py-5 sticky top-0 shadow-navbar">
      <h1 className="flex items-center justify-start gap-x-2 text-primary capitalize font-medium text-2xl">
        <img src={knightsLogo} alt="" />
        KNIGHTS STORE
      </h1>

      <div className="hidden w-[500px] min-h-[50px] md:flex items-center justify-between gap-x-1 px-4 py-2 border border-grey2 bg-white rounded-full">
        <input
          className="w-full h-[100%] border-none outline-none bg-white text-grey2 text-lg placeholder-grey2"
          type="text"
          placeholder="search for anything"
        />
        <Search strokeWidth={1.5} className="text-orange" />
      </div>

      <div className="hidden md:flex items-center justify-end gap-x-10">
        <a
          href="/login"
          className="h-[50px] flex items-center justify-center no-underline text-primary border border-primary rounded-full px-10 text-xl"
        >
          Login
        </a>
        <a href="/cart" className="relative cursor-pointer">
          <img src={cart} alt="" className="w-[30px] h-[30px]" />
          <span className="absolute min-w-[25px] h-[25px] top-0 right-0 mt-[-10px] mr-[-15px] bg-orange text-white flex items-center justify-center rounded-full leading-none p-1">
            0
          </span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
