import React, { useEffect, useState } from 'react';
import './styles/index.css';
import AppRouter from './routes/AppRouter';
import { initializeNFTContract } from './services/contractSetup';
import { initEthers } from './services/web3Setup';
import useMetamask from './services/useMetaMask';

function App() {
  const { accounts, provider, connectMetamask } = useMetamask();

  useEffect(() => {
    if (accounts.length > 0) {
      const init = async () => {
        try {
          const provider = initEthers();
          const signer = provider.getSigner();
          const contract = initializeNFTContract();
          const contractOwner = await contract.owner();
          const isOwner = contractOwner === accounts[0];

          console.log('isOwner', isOwner);
          console.log('contractOwner', contractOwner);
        } catch (error) {
          console.error('Error initializing app:', error);
        }
      };

      init();
    }
  }, []);

  console.log('accounts', accounts);

  return (
    <main className="h-[100vh]">
      <AppRouter />
    </main>
  );
}

export default App;
