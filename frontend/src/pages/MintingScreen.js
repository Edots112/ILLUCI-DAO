import React, { useEffect, useState } from 'react';
import NftPicture from '../assets/image/NFT.png';
import useMetamask from '../services/useMetaMask';
import { initializeNFTContract } from '../services/contractSetup';
import { utils } from 'ethers';
import { ContractOwner } from '../components/ContractOwner';
import Loader from '../components/Loader';
import ConnectMetamask from '../components/ConnectMetamask';

const MintingPage = () => {
  const { accounts, provider, isLoading, setIsLoading, setAccounts } = useMetamask();
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
  const [showPopup, setShowPopup] = useState(false);

  const checkCanMint = async () => {
    try {
      const contract = initializeNFTContract();
      const canMint = await contract.hasMinted(accounts[0]);
      setCanMint(!canMint);
      return canMint;
    } catch (error) {
      console.error('Error checking if user can mint:', error);
    }
  };

  const mintNFT = async () => {
    setIsLoading(true);
    try {
      const contract = initializeNFTContract();
      const mintTx = await contract._mint(1, {
        from: accounts[0],
        value: contractInfo.price,
      });

      await mintTx.wait();
      setCanMint(false);
    } catch (error) {
    } finally {
      setIsLoading(false);
      await getContractInfo();
      setShowPopup(true);
    }
  };

  const getContractInfo = async () => {
    try {
      const contract = initializeNFTContract();

      const promises = [
        contract.totalSupply(),
        contract.MAX_SUPPLY(),
        contract.isSaleActive(),
        contract.PRICE(),
        contract.baseURI(),
      ];

      const results = await Promise.all(promises);

      setContractInfo({
        totalSupply: results[0],
        maxSupply: results[1],
        isSaleActive: results[2],
        price: results[3],
        currentBaseURI: results[4],
      });
    } catch (error) {
      console.error('Error getting contract info:', error);
    }
  };

  const toggleAdminPanel = () => {
    setShowContractOwnerPopup(!showContractOwnerPopup);
  };

  const checkOwner = async () => {
    if (provider && accounts[0]) {
      try {
        const contract = initializeNFTContract(provider);
        const owner = await contract.owner();
        const isOwner = owner.toLowerCase() === accounts[0].toLowerCase();
        setIsOwner(isOwner);
      } catch (error) {
        console.error('Error checking if user is owner:', error);
      }
    }
  };

  useEffect(() => {
    const checkAccounts = () => {
      if (accounts.length > 0 && provider) {
        checkCanMint();
        checkOwner();
        getContractInfo();
      }
    };
    checkAccounts();
  }, [accounts, provider]);

  if (isLoading) {
    return <Loader />;
  }

  if (accounts.length === 0) {
    return <ConnectMetamask />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <button
        className="m-2 rounded bg-pink-500 p-2 py-2 font-bold text-white hover:bg-pink-800"
        onClick={() => (window.location = '/')}
      >
        Home
      </button>
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
              <h1 className="mb-8 font-bolda text-5xl">Mint Your Citizen</h1>
              <div className="flex items-center justify-center p-8 text-justify font-bold">
                <h2 className="w-3/4 text-lg">
                  Every Citizen is unique and generated from random traits. When obtaining a Citizen
                  you grants access to the Illuci DAO Dapp. Here you can be a part of the community
                  and vote on the future of the Illuci DAO. Aswell as send your Citizen to the
                  Illuci DAO Citadel to earn rewards.
                </h2>
              </div>
            </div>
            <div className="mt-4">
              <p className="mt-2 ">
                <span className="text-xl font-bold">Price</span>:{' '}
                {utils.formatEther(contractInfo.price)} ETH
              </p>
              <p>Sale {contractInfo.isSaleActive ? 'Active' : 'Paused'}</p>
            </div>
            <div className="mb-4">
              {isLoading ? (
                <Loader />
              ) : canMint ? (
                contractInfo.isSaleActive ? (
                  <button
                    className={'mt-4 rounded-lg bg-yellow-500 px-20 py-10 font-semibold text-black'}
                    onClick={mintNFT}
                    disabled={canMint === false || isLoading}
                  >
                    Mint
                  </button>
                ) : (
                  <h3 className="mt-4 rounded-lg bg-red-700 py-6 text-xl font-semibold text-black">
                    Sale is currently paused
                  </h3>
                )
              ) : (
                <h3 className="mt-4 rounded-lg bg-red-700 py-6 text-xl font-semibold text-black">
                  Max 1 transaction per Wallet
                </h3>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto py-4">
          <div className="grid grid-cols-1 gap-4 text-center text-white md:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-10 shadow-lg">
              <span className="block text-3xl font-bold">
                {contractInfo.totalSupply.toString()}/{contractInfo.maxSupply.toString()}
              </span>
              <p className="mt-2">Fair Launch and distribution...</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-10 shadow-lg">
              <span className="block text-3xl font-bold">{contractInfo.maxSupply.toString()}</span>
              <p className="mt-2">random generated ILLUCI Citizens</p>
            </div>

            <div className="rounded-lg bg-gray-800 p-10 shadow-lg">
              <span className="block text-3xl font-bold">100%</span>
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
