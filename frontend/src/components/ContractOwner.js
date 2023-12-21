import React, { useState, useEffect } from 'react';
import useMetamask from '../services/useMetaMask';
import { getContract } from '../services/contractSetup';
import { getWeb3 } from '../services/web3Setup';
import web3 from 'web3';

export const ContractOwner = ({
  contractInfos,
  getContractInfo,
  setShowContractOwnerPopup,
}) => {
  const [saleActive, setSaleActive] = useState(false);
  const [price, setPrice] = useState(0);
  const [baseURI, setBaseURI] = useState('');
  const { accounts } = useMetamask();

  console.log('isSaleActive', saleActive);
  console.log('Price', price);
  console.log('contractInfo', contractInfos);

  const activeSale = async () => {
    try {
      const contract = getContract();
      const activeSale = await contract.methods.toggleSale().send({
        from: accounts[0],
      });
      console.log('Active Sale:', activeSale);
      const isSaleActive = await contract.methods.isSaleActive().call();
      setSaleActive(isSaleActive);
      console.log('Is Sale Active:', isSaleActive);
      return activeSale;
    } catch (error) {
      console.error('Error checking if user can mint:', error);
    }
  };

  const setNewPrice = async () => {
    try {
      const contract = getContract();
      const web3 = getWeb3();
      const priceInWei = web3.utils.toWei(price, 'ether');
      console.log('Price in Wei:', priceInWei);

      const setNewPrice = await contract.methods.setPrice(priceInWei).send({
        from: accounts[0],
      });
      console.log('Set New Price:', setNewPrice);
      console.log('NewPrice:', price);
      return setNewPrice;
    } catch (error) {
      console.error('Error checking if user can mint:', error);
    }
  };

  const setNewURI = async () => {
    try {
      const contract = getContract();
      const setNewURI = await contract.methods.setBaseURI().send({
        from: accounts[0],
      });
      console.log('Set New URI:', setNewURI);
      setBaseURI(setNewURI);
      return setNewURI;
    } catch (error) {
      console.error('Error checking if user can mint:', error);
    }
  };

  const handlePriceChange = event => {
    setPrice(event.target.value);
    console.log('Price:', price);
  };

  const handleURIChange = event => {
    setBaseURI(event.target.value);
    console.log('URI:', baseURI);
  };

  const withdrawFunds = async () => {
    try {
      const contract = getContract();
      const withdrawFunds = await contract.methods.withdrawFunds().send({
        from: accounts[0],
      });
      console.log('Withdraw Funds:', withdrawFunds);
      return withdrawFunds;
    } catch (error) {
      console.error('Error checking if user can mint:', error);
    }
  };

  const copyToClipboard = text => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="bg-smoke-light fixed inset-0 z-50 flex overflow-auto">
      <div className=" relative  m-auto flex max-w-xl flex-col rounded-lg bg-violet-700 p-8">
        <button
          className="absolute right-0 top-0  bg-blue-500  px-4 py-2 font-semibold text-white hover:bg-black"
          onClick={() => setShowContractOwnerPopup(false)}
        >
          X
        </button>
        <button
          onClick={getContractInfo}
          className="absolute left-0 top-0 mr-2 bg-blue-500 px-2 py-2 font-semibold text-white hover:bg-black"
        >
          Update Contract Info
        </button>
        <h1 className="my-6 text-center font-bold font-roboto text-2xl">
          Admin Panel
        </h1>

        <div className="mb-4 flex justify-center gap-4">
          {saleActive === false ? (
            <button
              onClick={activeSale}
              className="w-1/3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Active Sale
            </button>
          ) : (
            <button
              onClick={activeSale}
              className="w-1/3 rounded bg-blue-500 px-3 py-2 font-bold text-white hover:bg-blue-700"
            >
              Deactivate Sale
            </button>
          )}
          <button
            onClick={withdrawFunds}
            className=" w-1/3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            withdraw Funds
          </button>
        </div>
        <div className="text-center ">
          <input
            type="number"
            placeholder="0.03 ETH"
            value={price}
            onChange={handlePriceChange}
            className="mr-2 w-1/2 bg-blue-500 p-2 text-white outline-none"
          />
          <button
            onClick={setNewPrice}
            className="w-32 bg-blue-500 py-2 font-bold text-white hover:bg-blue-700 "
          >
            SetNewPrice
          </button>
        </div>
        <div className="mt-2 text-center">
          <input
            type="text"
            placeholder="Set New URI"
            onChange={handleURIChange}
            value={baseURI}
            className="mr-2 w-1/2 bg-blue-500 p-2  outline-none"
          />
          <button
            onClick={setNewURI}
            className="w-32 bg-blue-500 py-2 font-bold text-white hover:bg-blue-700"
          >
            Set URI
          </button>
          <div className="my-2 flex flex-col">
            <p>
              <span className="font-semibold">Current Price:</span>{' '}
              {web3.utils.fromWei(contractInfos.price, 'ether')}
              ETH
            </p>
            <button
              className="rounded bg-blue-500 px-2 py-1 font-semibold text-white hover:bg-blue-600"
              onClick={() => copyToClipboard(contractInfos.currentBaseURI)}
            >
              Copy Current URI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
