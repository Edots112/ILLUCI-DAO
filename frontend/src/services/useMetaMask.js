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
    console.log('connect metamask');
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
      } catch (error) {
        console.error('User denied account connection:', error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } else {
      console.warn('MetaMask not installed');
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
    const handleAccountsChanged = async accs => {
      if (accs.length > 0) {
        setAccounts(accs);
        if (provider) {
          await checkNFTOwnership(accs[0]);
        }
      } else {
        setAccounts([]);
        setHasNft(false);
      }
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [provider]);

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
