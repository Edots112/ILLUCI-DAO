import React, { useEffect, useState } from 'react';
import NftPicture from '../assets/image/NFT.png';
import useMetamask from '../services/useMetaMask';
import { getContract } from '../services/contractSetup';
import { getWeb3 } from '../services/web3Setup';
import web3 from 'web3';
import { ContractOwner } from '../components/ContractOwner';

const MintingPage = () => {
  const { connectMetamask, accounts } = useMetamask();
  const [isOwner, setIsOwner] = useState(false);
  const [canMint, setCanMint] = useState(true);
  const [showContractOwnerPopup, setShowContractOwnerPopup] = useState(false);
  const [contractInfo, setContractInfo] = useState({
    totalSupply: 0,
    maxSupply: 0,
    isSaleActive: false,
    price: 0,
    currentBaseURI: '',
  });

  console.log('contractInfo', contractInfo);
  console.log('canmint', canMint);

  const checkCanMint = async () => {
    try {
      const contract = getContract();
      const canMint = await contract.methods.hasMinted(accounts[0]).call();
      console.log('Can mint:', canMint);
      setCanMint(!canMint);
      return canMint;
    } catch (error) {
      console.error('Error checking if user can mint:', error);
    }
  };

  const mintNFT = async () => {
    try {
      if (!accounts.length) {
        console.log('Please connect to MetaMask first.');
        await connectMetamask();
      }

      const contract = getContract();
      const web3 = getWeb3();
      const mintTx = await contract.methods._mint(1).send({
        from: accounts[0],
        value: web3.utils.toWei('0.03', 'ether'),
      });

      console.log('Mint transaction:', mintTx);
      console.log('Mint transaction hash:', mintTx.transactionHash);
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  const getContractInfo = async () => {
    try {
      const contract = getContract();

      const promises = [
        contract.methods.totalSupply().call(),
        contract.methods.MAX_SUPPLY().call(),
        contract.methods.isSaleActive().call(),
        contract.methods.PRICE().call(),
        contract.methods.baseURI().call(),
      ];

      const results = await Promise.all(promises);

      setContractInfo({
        totalSupply: results[0],
        maxSupply: results[1],
        isSaleActive: results[2],
        price: results[3],
        currentBaseURI: results[4],
      });
      console.log('Contract info:', results);
    } catch (error) {
      console.error('Error getting contract info:', error);
    }
  };

  useEffect(() => {
    getContractInfo();
  }, [accounts]);

  const toggleAdminPanel = () => {
    setShowContractOwnerPopup(!showContractOwnerPopup);
    console.log('Show Contract Owner Popup:', showContractOwnerPopup);
  };

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      checkCanMint();
    }
  }, [accounts, contractInfo, canMint]);

  useEffect(() => {
    const checkOwner = async () => {
      try {
        const contract = getContract();
        const owner = await contract.methods.owner().call();
        console.log('Owner:', owner);
        setIsOwner(owner === accounts[0]);
      } catch (error) {
        console.error('Error checking if user is owner:', error);
      }
    };

    if (accounts && accounts.length > 0) {
      checkOwner();
    } else {
      setIsOwner(false);
    }
  }, [accounts]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-center ">
            <img
              src={NftPicture}
              alt="NFT Preview"
              className={`rounded-lg sm:h-[600px] ${
                window.innerWidth >= 768 ? 'h-[600px]' : 'h-[400px]'
              }`}
            />
          </div>

          <div className="flex h-full flex-col justify-between text-center">
            <div className="">
              <h1 className="font-bolda mb-8 text-5xl">Mint Your Citizen</h1>
              <div className="flex items-center justify-center p-8 text-justify font-bold">
                <h2 className="w-3/4 text-lg">
                  Every Citizen is unique and generated from random traits. When
                  obtaining a Citizen you grants access to the Illuci DAO Dapp.
                  Here you can be a part of the community and vote on the future
                  of the Illuci DAO. Aswell as send your Citizen to the Illuci
                  DAO Citadel to earn rewards.
                </h2>
              </div>
            </div>
            <div className="mt-4">
              <p className="mt-2 ">
                <span className="font-bold text-xl">Price</span>:{' '}
                {web3.utils.fromWei(contractInfo.price, 'ether')} ETH
              </p>
              <p>Sale {contractInfo.isSaleActive ? 'Active' : 'Paused'}</p>
            </div>
            <div className="mb-4">
              {canMint === true ? (
                <button
                  className={
                    'mt-4 rounded-lg bg-yellow-500 px-20 py-10 font-semibold text-black'
                  }
                  onClick={mintNFT}
                  disabled={canMint === false}
                >
                  Mint
                </button>
              ) : (
                <h3 className="mt-4 rounded-lg bg-red-700  py-6 text-xl font-semibold text-black">
                  Max 1 transaction per Wallet
                </h3>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-1 gap-4 text-center text-white md:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-10 shadow-lg">
              <span className="block font-bold text-3xl">
                {contractInfo.totalSupply.toString()}/
                {contractInfo.maxSupply.toString()}
              </span>
              <p className="mt-2">Fair Launch and distribution...</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-10 shadow-lg">
              <span className="block font-bold text-3xl">
                {contractInfo.maxSupply.toString()}
              </span>
              <p className="mt-2">random generated ILLUCI Citizens</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-10 shadow-lg">
              <span className="block font-bold text-3xl">100%</span>
              <p className="mt-2">Unlock all benefits when buying a Citizen </p>
            </div>
          </div>
        </div>
      </div>

      {showContractOwnerPopup && (
        <ContractOwner
          contractInfos={contractInfo}
          getContractInfo={getContractInfo}
          setShowContractOwnerPopup={setShowContractOwnerPopup}
          setIsOwner={setIsOwner}
        />
      )}

      {isOwner && (
        <button
          className="fixed bottom-5 right-5 rounded-full bg-blue-500 p-2 text-white"
          onClick={toggleAdminPanel}
        >
          Admin Panel
        </button>
      )}
    </div>
  );
};

export default MintingPage;
