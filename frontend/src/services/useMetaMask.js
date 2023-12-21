// useMetamask.js
import { useState, useEffect } from 'react';
import { initWeb3 } from '../services/web3Setup';
import { initializeContract } from '../services/contractSetup';

function useMetamask() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);

  const connectMetamask = async () => {
    if (isMetamaskInstalled) {
      try {
        const requestedAccounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccounts(requestedAccounts);
        console.log('Welcome to Illuci DAO');
      } catch (error) {
        console.error('User denied account connection');
      }
    } else {
      console.warn('MetaMask not installed');
    }
  };

  useEffect(() => {
    async function initMetamask() {
      if (typeof window.ethereum !== 'undefined') {
        setIsMetamaskInstalled(true);

        const web3Instance = initWeb3(window.ethereum);
        setWeb3(web3Instance);

        const accs = await web3Instance.eth.getAccounts();
        setAccounts(accs);

        if (accs.length === 0) {
          try {
            const requestedAccounts = await window.ethereum.request({
              method: 'eth_requestAccounts',
            });
            setAccounts(requestedAccounts);
            initializeContract();
          } catch (error) {
            console.error('User denied account connection');
          }
        } else {
          initializeContract();
        }
      } else {
        setIsMetamaskInstalled(false);
      }
    }

    function handleAccountsChanged(accs) {
      setAccounts(accs);
    }

    initMetamask();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
      }
    };
  }, []);

  return {
    isMetamaskInstalled,
    accounts,
    web3,
    connectMetamask,
  };
}

export default useMetamask;
