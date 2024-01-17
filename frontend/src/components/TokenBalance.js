import React, { useState } from 'react';

const TokenBalance = () => {
  const [balance, setBalance] = useState(0);

  return <div className="text-center">Your ILU Tokens: {balance}</div>;
};

export default TokenBalance;
