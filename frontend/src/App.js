import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import LoadingScreen from './pages/LoadingScreen';
import './styles/index.css';
import AppRouter from './routes/AppRouter';
import { getContract } from './services/contractSetup';
import { getWeb3 } from './services/web3Setup';
import Web3 from 'web3';

function App() {
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = getWeb3();
        const accounts = await web3.eth.getAccounts();
        const contract = getContract();
        const contractOwner = await contract.methods.owner().call();
        const isOwner = contractOwner === accounts[0];
        console.log('isOwner', isOwner);
        console.log('accounts', accounts);
        console.log('contractOwner', contractOwner);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };
    init();
  }, []);

  return (
    <main className="h-[100vh]">
      {/* <LoadingScreen /> */}
      <AppRouter />
    </main>
  );
}

export default App;
