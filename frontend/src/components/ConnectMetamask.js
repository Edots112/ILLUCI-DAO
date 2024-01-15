import React from 'react';
import useMetamask from '../services/useMetaMask';

const ConnectMeta = () => {
  const { connectMetamask } = useMetamask();
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <button className="rounded-lg bg-blue-500 p-4 text-white" onClick={connectMetamask}>
        Connect to MetaMask
      </button>
    </div>
  );
};

export default ConnectMeta;
