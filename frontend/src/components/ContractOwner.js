import React, { useState } from 'react';
import { initializeNFTContract, initializeTokenContract } from '../services/contractSetup';
import { ethers, utils } from 'ethers';
import useMetamask from '../services/useMetaMask';

export const ContractOwner = ({ contractInfos, setShowContractOwnerPopup, getContractInfo }) => {
  const { provider } = useMetamask();
  const [saleActive, setSaleActive] = useState(false);
  const [price, setPrice] = useState(0);
  const [baseURI, setBaseURI] = useState('');

  const activeSale = async () => {
    try {
      const contract = initializeNFTContract(provider);
      const transaction = await contract.toggleSale();
      await transaction.wait();
      const isSaleActive = await contract.isSaleActive();
      setSaleActive(isSaleActive);
      getContractInfo();
    } catch (error) {
      console.error('Error in activeSale:', error);
    }
  };

  const setNewPrice = async () => {
    try {
      const contract = initializeNFTContract(provider);
      const transaction = await contract.setPrice(utils.parseEther(price.toString()));
      console.log('transaction', transaction);
      await transaction.wait();
      getContractInfo();
    } catch (error) {
      console.error('Error setting new price:', error);
    }
  };

  const setNewURI = async () => {
    try {
      const contract = initializeNFTContract(provider);
      const transaction = await contract.setBaseURI(baseURI);
      await transaction.wait();
      getContractInfo();
    } catch (error) {
      console.error('Error setting new URI:', error);
    }
  };

  const handlePriceChange = event => setPrice(event.target.value);
  const handleURIChange = event => setBaseURI(event.target.value);

  const withdrawFunds = async () => {
    try {
      const contract = initializeNFTContract(provider);
      const transaction = await contract.withdrawFunds();
      await transaction.wait();
    } catch (error) {
      console.error('Error withdrawing funds:', error);
    }
  };

  const approveSpender = async (approveAddress, amount) => {
    try {
      const tokenContract = initializeTokenContract(provider);
      const approveTx = await tokenContract.approve(
        approveAddress,
        ethers.utils.parseUnits(amount, 18)
      );
      await approveTx.wait();
    } catch (error) {
      console.error('Error approving spender:', error);
    }
  };

  const transferFrom = async (fromAddress, toAddress, amount) => {
    try {
      const tokenContract = initializeTokenContract(provider);
      const transferFromTx = await tokenContract.transferFrom(
        fromAddress,
        toAddress,
        ethers.utils.parseUnits(amount, 18)
      );
      await transferFromTx.wait();
    } catch (error) {
      console.error('Error transferring from:', error);
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
    <div className="bg-smoke-light fixed inset-0 z-50 flex overflow-auto ">
      <div className=" relative  m-auto flex w-1/2 flex-col rounded-lg bg-violet-700 p-10">
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
        <h1 className="my-6 text-center font-roboto text-2xl font-bold">Admin Panel</h1>

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
              {utils.formatEther(contractInfos.price)}
              ETH
            </p>
            <button
              className="rounded bg-blue-500 px-2 py-1 font-semibold text-white hover:bg-blue-600"
              onClick={() => copyToClipboard(contractInfos.currentBaseURI)}
            >
              Copy Current URI
            </button>
            <div className="mt-5 flex w-full justify-around">
              <div className="flex flex-col items-center">
                <h3 className="font-bold">Approve spender</h3>
                <div className="flex flex-col">
                  <label htmlFor="spender" className="text-white">
                    Spender Address
                  </label>
                  <input
                    type="text"
                    id="spender"
                    className="mb-2 bg-blue-500 p-2 text-white outline-none"
                  />
                  <label htmlFor="amount" className="text-white">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="mb-4 bg-blue-500 p-2 text-white outline-none"
                  />
                  <button
                    onClick={() =>
                      approveSpender(
                        document.getElementById('spender').value,
                        document.getElementById('amount').value
                      )
                    }
                    className="w-32 bg-blue-500 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Approve
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <h3>TransferFrom</h3>
                <div className="flex flex-col">
                  <label htmlFor="fromAddress" className="text-white">
                    From Address
                  </label>
                  <input
                    type="text"
                    id="fromAddress"
                    className="mb-2 bg-blue-500 p-2 text-white outline-none"
                  />
                  <label htmlFor="toAddress" className="text-white">
                    To Address
                  </label>
                  <input
                    type="text"
                    id="toAddress"
                    className="mb-2 bg-blue-500 p-2 text-white outline-none"
                  />
                  <label htmlFor="transferAmount" className="text-white">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="transferAmount"
                    className="mb-4 bg-blue-500 p-2 text-white outline-none"
                  />
                  <button
                    onClick={() =>
                      transferFrom(
                        document.getElementById('fromAddress').value,
                        document.getElementById('toAddress').value,
                        document.getElementById('transferAmount').value
                      )
                    }
                    className="w-32 bg-blue-500 py-2 font-bold text-white hover:bg-blue-700"
                  >
                    Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
