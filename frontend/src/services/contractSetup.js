import { getWeb3 } from './web3Setup';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config';

let contract;

console.log('CONTRACT_ADDRESS', CONTRACT_ADDRESS);
console.log('CONTRACT_ABI', CONTRACT_ABI);

export function initializeContract() {
  const web3 = getWeb3();
  contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  console.log('contract', contract);
  console.log('contact', CONTRACT_ADDRESS);
  console.log('ABI', CONTRACT_ABI);
  return contract;
}

export function getContract() {
  return contract;
}
