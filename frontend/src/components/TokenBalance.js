import React, { useState, useEffect } from 'react';
import { initializeTokenContract } from '../services/contractSetup';
import useMetamask from '../services/useMetaMask';

const TokenBalance = () => {
  const { accounts, provider } = useMetamask();
  const [balance, setBalance] = useState(0);

  console.log('accounts', accounts);
  console.log('provider', provider);
  console.log('balance', balance);

  return <div className="text-center">Your ILU Tokens: {balance}</div>;
};

export default TokenBalance;
