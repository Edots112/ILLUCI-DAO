import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav className="border-2">
        <ul className="flex flex-row border-2 border-red-200">
          <li className=" border-2">
            <Link to="/" className="font-pixel">
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
