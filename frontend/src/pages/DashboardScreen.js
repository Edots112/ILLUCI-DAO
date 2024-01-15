import React from 'react';
import Navbar from '../components/Navbar';
import DashboardMain from '../components/DashboardMain';
import Chat from '../components/Chat';
import ConnectMetamask from '../components/ConnectMetamask';
import useMetamask from '../services/useMetaMask';

const DashboardScreen = () => {
  const { accounts } = useMetamask();

  // TODO Add a check if you own a nft

  return accounts.length === 0 ? (
    <ConnectMetamask />
  ) : (
    <div className="max-h-screen w-full">
      <div className="flex max-h-screen">
        <div className="w-40  bg-gray-200  ">
          <Navbar sticky={true} />
        </div>
        <div className="w-full bg-gray-700">
          <DashboardMain />
        </div>
        <div className="w-2/5 bg-gray-200 p-4">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
