import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { initializeNFTContract } from './contractSetup';

function useMetamask() {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNft, setHasNft] = useState(false);

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
    if (!provider) {
      console.error('Provider is not set');
      return;
    }
    if (!account) {
      console.error('Account is not available');
      return;
    }

    try {
      const nftContract = initializeNFTContract(provider, accounts[0]);
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
    if (accounts.length > 0 && provider) {
      checkNFTOwnership(accounts[0]);
    }
  }, [accounts, provider]);

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
  };
}

export default useMetamask;
