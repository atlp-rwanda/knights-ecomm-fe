import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { clearCredentials, setCredentials } from '../../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setUser } from '../../redux/reducers/userReducer';

const GoogleLoginSuccess = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/user/login/success`, { withCredentials: true })
      .then((response) => {
        if (response.data?.data.message === 'Please provide the OTP sent to your email or phone') {
          dispatch(setUser(response.data.data!.email));
          navigate('/otp-verficaton');
        } else {
          dispatch(setCredentials(response.data.data.token));
        }
      })
      .catch((error) => {
        if (error.response?.data?.message === 'Your account has been suspended') {
          navigate('/suspended-account');
        } else {
          toast.error(error.response?.data?.message || 'Unexpected error', {
            duration: 4000
          });
          navigate('/');
        }
        dispatch(clearCredentials());
      });
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] bg-background3 text-baseBlack">
      <div className="bg-black mb-10">
        <PropagateLoader color="#070F2B" />
      </div>
      <span className="text-lg pl-4">Signing in with Google</span>
      <span className="text-neutrals700 italic text-sm pl-4">Please wait a moment.</span>
    </div>
  );
};

export default GoogleLoginSuccess;
