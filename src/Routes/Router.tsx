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
import DashboardProducts from '../components/Products/DashboardProducts/DashboardProducts';
import DashboardNewProducts from '../components/Products/DashboardNewProducts/DashboardNewProducts';
import DashboarInnerLayout from '../layout/DashboarInnerLayout';
import MainLayout from '../layout/MainLayout';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardSingleProduct from '../components/Products/DashboardSingleProduct/DashboardSingleProduct';

const Router: React.FC = () => {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const { decodedToken } = useJwt<DecodedToken>(userToken);
  const isAdmin = decodedToken?.userType.toLowerCase() === 'admin';
  const isVendor = decodedToken?.userType.toLowerCase() === 'vendor';
  const isBuyer = decodedToken?.userType.toLowerCase() === 'buyer';

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <WelcomePage />
          </MainLayout>
        }
      />
      <Route
        path="/register"
        element={
          <MainLayout>
            <PageTitle title="Knights Store | Register" />
            <Register />
          </MainLayout>
        }
      />
      <Route
        path="/register-vendor"
        element={
          <MainLayout>
            <PageTitle title="Knights Store | Register Vendor" />
            <RegisterVendor />
          </MainLayout>
        }
      />
      <Route
        path="/verify-email/:token"
        element={
          <MainLayout>
            <PageTitle title="Knights Store | Verify Email" />
            <VerifyEmail />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <MainLayout>
            <PageTitle title="Knights Store | Login" />
            {userToken && isAdmin && <Navigate to="/admin/dashboard" />}
            {userToken && isVendor && <Navigate to="/vendor/dashboard" />}
            {userToken && isBuyer && <Navigate to="/" />}
            {!userToken && <Login />}
          </MainLayout>
        }
      />
      <Route
        path="/login/success"
        element={
          <MainLayout>
            <PageTitle title="Knights Store | Login" />
            {userToken && isAdmin && <Navigate to="/admin/dashboard" />}
            {userToken && isVendor && <Navigate to="/vendor/dashboard" />}
            {userToken && isBuyer && <Navigate to="/" />}
            {!userToken && <GoogleLoginSuccess />}
          </MainLayout>
        }
      />
      <Route path="/vendor/dashboard" element={<DashboardLayout />}>
        <Route path="products" element={<DashboarInnerLayout />}>
          <Route path="" element={<DashboardProducts />} />
          <Route path=":id" element={<DashboardSingleProduct />} />
          <Route path="new" element={<DashboardNewProducts />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
