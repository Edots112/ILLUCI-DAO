import { ethers } from 'ethers';

let provider;

export function initEthers(providerUrl) {
  if (typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else if (providerUrl) {
    provider = new ethers.providers.JsonRpcProvider(providerUrl);
  } else {
    throw new Error('No Ethereum provider found');
  }
  return provider;
}

export function getProvider() {
  if (!provider) {
    throw new Error('Ethereum provider is not initialized');
  }
  return provider;
}
