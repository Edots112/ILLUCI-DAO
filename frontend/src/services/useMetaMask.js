import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  initializeNFTContract,
  initializeStakeContract,
  initializeTokenContract,
} from './contractSetup';

function useMetamask() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNft, setHasNft] = useState(false);
  const [initNftContract, setInitNftContract] = useState(null);
  const [initTokenContract, setInitTokenContract] = useState(null);
  const [initStakeContract, setInitStakeContract] = useState(null);

  console.log('has nft', hasNft);
  console.log('accounts', accounts);

  const checkMetamaskInstallation = () => {
    const installed = typeof window.ethereum !== 'undefined';
    setIsMetamaskInstalled(installed);
    return installed;
  };

  const connectMetamask = async () => {
    console.log('Connecting to MetaMask');
    setIsLoading(true);

    if (!window.ethereum) {
      console.warn('MetaMask is not installed');
      setIsLoading(false);
      return;
    }

    try {
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(newProvider);

      newProvider.on('network', (newNetwork, oldNetwork) => {
        console.log('Network changed from', oldNetwork, 'to', newNetwork);
      });

      const accounts = await newProvider.send('eth_requestAccounts', []);
      setAccounts(accounts);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkNFTOwnership = async account => {
    if (!initNftContract) {
      console.log('no init nft contract');
      return;
    }

    try {
      const nftContract = initNftContract;
      const nftCount = await nftContract.balanceOf(account);
      setHasNft(nftCount.toNumber() > 0);
      console.log('NFT count:', nftCount.toNumber());
    } catch (error) {
      console.error('Error checking NFT ownership:', error);
    }
  };

  useEffect(() => {
    checkMetamaskInstallation();
    connectMetamask();
  }, []);

  useEffect(() => {
    if (provider && accounts.length > 0) {
      setInitNftContract(initializeNFTContract(provider, accounts[0]));
      setInitStakeContract(initializeStakeContract(provider, accounts[0]));
      setInitTokenContract(initializeTokenContract(provider, accounts[0]));
      console.log('init contracts');
    }
  }, [provider, accounts]);

  useEffect(() => {
    if (initNftContract) {
      checkNFTOwnership(accounts[0]);
    }
  }, [initNftContract]);

  useEffect(() => {
    const handleAccountsChanged = accounts => {
      if (accounts.length === 0) {
        console.warn('Please connect to MetaMask.');
      } else {
        setAccounts(accounts);
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    const handleAccountsChanged = accs => {
      if (accs.length === 0) {
        setAccounts([]);
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
    connectMetamask,
    isLoading,
    setIsLoading,
    hasNft,
    initNftContract,
    initStakeContract,
    initTokenContract,
  };
}

export default useMetamask;
