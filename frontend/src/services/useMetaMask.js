import { useState, useEffect } from 'react';
import { initWeb3 } from '../services/web3Setup';
import { initializeContract } from '../services/contractSetup';

function useMetamask() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);

  const checkMetamaskInstallation = () => {
    if (typeof window.ethereum !== 'undefined') {
      setIsMetamaskInstalled(true);
      return true;
    } else {
      setIsMetamaskInstalled(false);
      return false;
    }
  };

  const initWeb3AndContract = provider => {
    const web3Instance = initWeb3(provider);
    setWeb3(web3Instance);
    initializeContract();
  };

  const connectMetamask = async () => {
    if (checkMetamaskInstallation()) {
      try {
        const requestedAccounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccounts(requestedAccounts);
        initWeb3AndContract(window.ethereum);
        console.log('Welcome to Illuci DAO');
        console.log('Your account:', requestedAccounts[0]);
      } catch (error) {
        console.error('User denied account connection:', error);
      }
    } else {
      console.warn('MetaMask not installed');
    }
  };

  useEffect(() => {
    checkMetamaskInstallation();

    const handleAccountsChanged = accs => {
      setAccounts(accs);
      if (accs.length > 0) {
        initWeb3AndContract(window.ethereum);
      }
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
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
