import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/minting') {
    return <Outlet />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
