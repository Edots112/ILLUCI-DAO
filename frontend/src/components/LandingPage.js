import React from 'react';

const LandingPage = () => {
  return (
    <div className="<-10+ flex h-screen w-screen snap-start items-center justify-center bg-hero-page bg-cover bg-center  bg-no-repeat text-white ">
      <div className="rounded-xl bg-black/70 p-7 text-center">
        <h1 className="mb-4 font-bold text-8xl">ILLUCI DAO</h1>
        <p className="p-1 font-roboto text-xl ">
          A community of artists, collectors, and curators exploring the
        </p>
        <p className="mb-4 p-1 font-roboto text-xl ">
          intersection of art and technology.
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
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
