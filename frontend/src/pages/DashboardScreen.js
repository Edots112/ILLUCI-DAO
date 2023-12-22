import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const DashboardScreen = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="flex h-full">
        <div className="min-h-screen w-[23%] bg-gray-200  ">
          <Navbar />
        </div>
        <div className="w-full bg-gray-300 p-4">
          <Outlet />
        </div>
        <div className="w-2/4 bg-gray-200 p-4">
          <p>Community/Chat</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
