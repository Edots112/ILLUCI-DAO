import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  initializeNFTContract,
  initializeStakeContract,
  initializeTokenContract,
} from '../services/contractSetup';

function useMetamask() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [provider, setProvider] = useState(null);
  const [nftContract, setNftContract] = useState(null);
  const [stakeContract, setStakeContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkMetamaskInstallation = () => {
    const installed = typeof window.ethereum !== 'undefined';
    setIsMetamaskInstalled(installed);
    return installed;
  };

  const connectMetamask = async () => {
    setIsLoading(true);
    if (checkMetamaskInstallation()) {
      try {
        const existingAccounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (existingAccounts.length > 0) {
          setAccounts(existingAccounts);
        } else {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(accounts);
        }
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newProvider);

        const newNftContract = initializeNFTContract(newProvider);
        const newStakeContract = initializeStakeContract(newProvider);
        const newTokenContract = initializeTokenContract(newProvider);

        setNftContract(newNftContract);
        setStakeContract(newStakeContract);
        setTokenContract(newTokenContract);

        console.log('Welcome to Illuci DAO');
        console.log('Your account:', accounts[0]);
      } catch (error) {
        console.error('User denied account connection:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn('MetaMask not installed');
    }
  };

  useEffect(() => {
    checkMetamaskInstallation();
    connectMetamask();
  }, [setAccounts]);

  useEffect(() => {
    const handleAccountsChanged = accs => {
      if (accs.length > 0) {
        setAccounts(accs);
      }
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    const handleAccountsChanged = accs => {
      if (accs.length === 0) {
        setAccounts([]);
        console.log('Please connect to MetaMask.');
      } else {
        setAccounts(accs);
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return {
    isMetamaskInstalled,
    accounts,
    provider,
    nftContract,
    stakeContract,
    tokenContract,
    connectMetamask,
    isLoading,
    setIsLoading,
  };
}

export default useMetamask;
