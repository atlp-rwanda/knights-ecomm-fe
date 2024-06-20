import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { clearCredentials, setCredentials } from '../../redux/reducers/authReducer';

const GoogleLoginSuccess = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/user/login/success`, { withCredentials: true })
      .then((response) => {
        dispatch(setCredentials(response.data.data.token));
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => {
        dispatch(clearCredentials(''));
      });
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] bg-background3 text-baseBlack">
      <div className="bg-black mb-10">
        <PropagateLoader color="#070F2B" />
      </div>
      <span className="text-lg pl-4">Signing in with Google </span>
      <span className="text-neutrals700 italic text-sm pl-4">Please wait a moment.</span>
    </div>
  );
};

export default GoogleLoginSuccess;
