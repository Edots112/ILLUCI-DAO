import Web3 from 'web3';

let web3;

export function initWeb3(provider) {
  web3 = new Web3(provider || Web3.givenProvider || 'http://localhost:7545');
  console.log('web3', web3);
  return web3;
}

export function getWeb3() {
  if (!web3) {
    throw new Error('Web3 is not initialized');
  }
  return web3;
}
