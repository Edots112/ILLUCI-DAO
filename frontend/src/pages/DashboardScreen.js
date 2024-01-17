import React from 'react';
import Navbar from '../components/Navbar';
import DashboardMain from '../components/DashboardMain';
import Chat from '../components/Chat';
import ConnectMetamask from '../components/ConnectMetamask';
import useMetamask from '../services/useMetaMask';
import Popup from '../components/Popup';
import Loader from '../components/Loader';

const DashboardScreen = () => {
  const { accounts, hasNft, isLoading } = useMetamask();

  if (isLoading) {
    return <Loader />;
  }

  if (accounts.length === 0) {
    return <ConnectMetamask />;
  }

  if (!hasNft) {
    return (
      <Popup
        hrefs="/minting"
        textContent="You are not a Citizen yet. Please mint your Citizen to continue."
        buttonContent="Mint Now"
      />
    );
  }
  return (
    <div className="max-h-screen w-full">
      <div className="flex max-h-screen">
        <div className="w-40 bg-gray-200">
          <Navbar sticky={true} />
        </div>
        <div className=" w-full bg-gray-700">
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
