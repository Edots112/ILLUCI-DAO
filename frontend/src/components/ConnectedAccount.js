import React from 'react';
import useMetamask from '../services/useMetaMask';

const ConnectedAccount = () => {
  const { accounts } = useMetamask();
  const formatAddress = address => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="absolute right-0 m-2 flex flex-col items-center rounded-2xl bg-pink-500 p-2">
      {accounts.length > 0 ? (
        <>
          <div className="pr-2 font-bolda text-white">Connected Account</div>
          <div className=" text-white">{formatAddress(accounts[0])}</div>
        </>
      ) : (
        <div className="text-white">Not connected</div>
      )}
    </div>
  );
};

export default ConnectedAccount;
