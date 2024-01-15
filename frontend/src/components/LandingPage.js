import React, { useState } from 'react';
import { initializeNFTContract } from '../services/contractSetup';
import useMetamask from '../services/useMetaMask';
import Popup from './Popup';

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { accounts, provider } = useMetamask();

  const checkNFTOwnership = async () => {
    if (accounts.length > 0) {
      try {
        const nftContract = initializeNFTContract(provider);
        const nftCount = await nftContract.balanceOf(accounts[0]);
        if (nftCount.toNumber() === 0) {
          setShowPopup(true);
        } else {
          window.location.href = '/dashboard';
        }
      } catch (error) {
        console.error('Error checking NFT ownership:', error);
      }
    } else {
      alert('Please connect to MetaMask first.');
    }
  };
  return (
    <div className="<-10+ flex h-screen w-screen snap-start items-center justify-center bg-hero-page bg-cover bg-center  bg-no-repeat text-white ">
      <div className="rounded-xl bg-black/70 p-7 text-center">
        <h1 className="mb-4 font-bolda text-8xl">ILLUCI DAO</h1>
        <p className="p-1 font-roboto text-xl ">
          A community of artists, collectors, and curators exploring the
        </p>
        <p className="mb-4 p-1 font-roboto text-xl ">intersection of art and technology.</p>
        <div className="flex justify-center gap-4">
          <button
            to="/minting"
            className="rounded bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-700"
            onClick={() => {
              window.location.href = '/minting';
            }}
          >
            Mint Now
          </button>

          <button
            className=" absolute right-0 top-0 m-3 rounded bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-700"
            onClick={checkNFTOwnership}
          >
            Already a Citizen
          </button>
          {showPopup && (
            <Popup
              hrefs="/minting"
              textContent="You are not a Citizen yet. Please mint your Citizen to continue."
              setShowPopup={setShowPopup}
              buttonContent="Mint Now"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
