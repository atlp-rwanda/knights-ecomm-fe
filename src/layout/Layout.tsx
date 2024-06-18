import React from 'react';
import Router from '../Routes/Router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
