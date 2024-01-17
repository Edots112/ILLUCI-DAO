import React, { useState } from 'react';
import useMetamask from '../services/useMetaMask';
import Popup from './Popup';

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { hasNft } = useMetamask();

  return (
    <div className="<-10+ flex h-screen w-screen snap-start items-center justify-center bg-hero-page bg-cover bg-center  bg-no-repeat text-white ">
      <div className="rounded-xl bg-black/70 p-7 text-center">
        <h1 className="mb-4 font-bolda text-8xl">ILLUCI DAO</h1>
        <p className="p-1 font-roboto text-xl ">
          Wants to create a tight small community for like minded people.
        </p>
        <p className="mb-4 p-1 font-roboto text-xl ">
          come write the future with us and collaborate with your skills
        </p>
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
            onClick={() => {
              !hasNft ? setShowPopup(true) : (window.location.href = '/dashboard');
            }}
          >
            Already a Citizen
          </button>
          {showPopup && (
            <Popup
              hrefs="/dashboard"
              textContent="Connect to MetaMask to continue"
              setShowPopup={setShowPopup}
              buttonContent="Connect MetaMask"
              bg="bg-black/50"
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-0  m-3 rounded bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-700">
        <a
          className="rounded bg-pink-500 px-4 py-2 font-semibold text-white hover:bg-pink-700"
          href="https://illuci-dao-documention.gitbook.io/illuci-dao/"
          target="_blank"
          rel="noreferrer"
        >
          Read our GitBook for more info
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
