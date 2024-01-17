import { ethers } from 'ethers';
import {
  CONTRACT_ADDRESS_NFT,
  CONTRACT_ADDRESS_STAKE,
  CONTRACT_ADDRESS_TOKEN,
  CONTRACT_ABI_NFT,
  CONTRACT_ABI_STAKE,
  CONTRACT_ABI_TOKEN,
} from '../config';

export function initializeNFTContract() {
  return initializeContract(CONTRACT_ADDRESS_NFT, CONTRACT_ABI_NFT);
}

export function initializeStakeContract() {
  return initializeContract(CONTRACT_ADDRESS_STAKE, CONTRACT_ABI_STAKE);
}

export function initializeTokenContract() {
  return initializeContract(CONTRACT_ADDRESS_TOKEN, CONTRACT_ABI_TOKEN);
}

function initializeContract(address, abi, account) {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(account);
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
  } else {
    console.error('Ethereum provider not found');
    return null;
  }
}
