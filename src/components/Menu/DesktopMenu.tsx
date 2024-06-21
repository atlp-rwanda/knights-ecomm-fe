import React from 'react';
import { AppDispatch } from '../../redux/store';
import { clearCredentials } from '../../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';

function DesktopMenu() {
  const dispatch = useDispatch<AppDispatch>();

  const logoutHandler = () => {
    dispatch(clearCredentials(''));
  };

  return (
    <div className="bg-baseWhite border border-neutral-300 rounded-2 w-48 p-1 text-neutral-600">
      <ul className="flex flex-col ">
        <li className="hover:bg-neutral-300 pl-5 py-2 cursor-pointer">WishList</li>
        <li className="hover:bg-neutral-300 pl-5 py-2 cursor-pointer">Profile</li>
        <li onClick={logoutHandler} className="hover:bg-neutral-300 pl-5 py-2 cursor-pointer">
          Logout
        </li>
      </ul>
    </div>
  );
}

export default DesktopMenu;
