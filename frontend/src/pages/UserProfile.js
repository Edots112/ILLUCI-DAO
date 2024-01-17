import React from 'react';
import useMetamask from '../services/useMetaMask';
import DAOLOGO from '../assets/image/DAOLOGO.png';
import Popup from '../components/Popup';

const UserProfile = () => {
  const { accounts, hasNft } = useMetamask();

  const hasPosts = false;

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
    <div className="container mx-auto flex max-w-xl items-center p-4">
      <div className="overflow-hidden rounded-lg bg-pink-500 shadow-md">
        <div className="p-4 text-center">
          <img className="mx-auto h-24 w-24 " src={DAOLOGO} alt="Profile" />
          <h1 className="mt-4 text-3xl font-bold text-white">Connected Account</h1>
          <p className="mt-2 text-lg text-white">{accounts[0]}</p>
        </div>

        <div className="bg-white p-4">
          <h2 className="text-xl font-semibold">Profile Details</h2>
          <div className="mt-4">
            <div className="font-medium">
              Alias: <span className="font-normal">YourAlias</span>
            </div>
            <div className="mt-2 font-medium">
              Bio: <span className="font-normal">Your short bio goes here.</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4">
          <h2 className="text-xl font-semibold">Your Posts</h2>
          {hasPosts ? (
            <div className="mt-4">{/* Posts will be listed here */}</div>
          ) : (
            <p className="mt-4 text-gray-600">
              You haven't posted anything yet. Start sharing your thoughts!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
