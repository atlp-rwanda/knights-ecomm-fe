import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import WelcomePage from '../pages/welcomePage';
import Register from '../pages/Authentication/Register';
import RegisterVendor from '../pages/Authentication/RegisterVendor';
import VerifyEmail from '../pages/Authentication/VerifyEmail';
import Login, { DecodedToken } from '../pages/Authentication/Login';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import GoogleLoginSuccess from '../pages/Authentication/GoogleLoginSuccess';
import { useJwt } from 'react-jwt';

const Router = () => {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { decodedToken } = useJwt<DecodedToken>(userToken);

  const isAdmin = decodedToken?.role.toLowerCase() === 'admin';
  const isVendor = decodedToken?.role.toLowerCase() === 'vendor';
  const isBuyer = decodedToken?.role.toLowerCase() === 'buyer';

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />

      <Route
        path="/register"
        element={
          <>
            <PageTitle title="Knights Store | Register" />
            <Register />
          </>
        }
      />

      <Route
        path="/register-vendor"
        element={
          <>
            <PageTitle title="Knights Store | Register Vendor" />
            <RegisterVendor />
          </>
        }
      />

      <Route
        path="/verify-email/:token"
        element={
          <>
            <PageTitle title="Knights Store | Verify Email" />
            <VerifyEmail />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <PageTitle title="Knights Store | Login" />
            {userToken && isAdmin && <Navigate to="/admin/dashboard" />}
            {userToken && isVendor && <Navigate to="/vendor/dashboard" />}
            {userToken && isBuyer && <Navigate to="/" />}
            {!userToken && <Login />}
          </>
        }
      />
      <Route
        path="/login/success"
        element={
          <>
            <PageTitle title="Knights Store | Login" />
            {userToken && isAdmin && <Navigate to="/admin/dashboard" />}
            {userToken && isVendor && <Navigate to="/vendor/dashboard" />}
            {userToken && isBuyer && <Navigate to="/" />}
            {!userToken && <GoogleLoginSuccess />}
          </>
        }
      />
    </Routes>
  );
};

export default Router;
