import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import WelcomePage from '../pages/welcomePage';
import Register from '../pages/Authentication/Register';
import RegisterVendor from '../pages/Authentication/RegisterVendor';
import VerifyEmail from '../pages/Authentication/VerifyEmail';

const Router = () => {
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
    </Routes>
  );
};

export default Router;
