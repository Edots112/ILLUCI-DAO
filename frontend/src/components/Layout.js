import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav className="fixed left-0 top-0 flex h-screen w-16 flex-col items-center justify-center bg-gray-800">
        <ul>
          <li>
            <Link
              to="/"
              className="flex h-10  w-16 items-center justify-center  bg-pink-500 text-white transition-colors duration-200 hover:bg-pink-600"
            >
              <span>Home</span>
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
