import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import ConnectedAccount from './ConnectedAccount';

const Layout = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return <Outlet />;
  }
  if (location.pathname === '/minting') {
    return (
      <>
        <ConnectedAccount />
        <Outlet />
      </>
    );
  }

  return (
    <>
      <ConnectedAccount />
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
