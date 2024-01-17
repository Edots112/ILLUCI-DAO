import { ethers } from 'ethers';
import {
  CONTRACT_ADDRESS_NFT,
  CONTRACT_ADDRESS_STAKE,
  CONTRACT_ADDRESS_TOKEN,
  CONTRACT_ABI_NFT,
  CONTRACT_ABI_STAKE,
  CONTRACT_ABI_TOKEN,
} from '../config';

export function initializeNFTContract(provider, account) {
  return initializeContract(CONTRACT_ADDRESS_NFT, CONTRACT_ABI_NFT, provider, account);
}

export function initializeStakeContract(provider, account) {
  return initializeContract(CONTRACT_ADDRESS_STAKE, CONTRACT_ABI_STAKE, provider, account);
}

export function initializeTokenContract(provider, account) {
  return initializeContract(CONTRACT_ADDRESS_TOKEN, CONTRACT_ABI_TOKEN, provider, account);
}

function initializeContract(address, abi, provider, account) {
  if (provider && account) {
    const signer = provider.getSigner(account);
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
  } else {
    console.error('Provider or account not found');
    return null;
  }
}
