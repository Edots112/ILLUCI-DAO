import React, { useState, useEffect } from 'react';
import CitizensCard from './CitizensCard';
import { initializeNFTContract, initializeStakeContract } from '../services/contractSetup';
import { convertIpfsToHttps, imageUri } from '../utils/covertAndChangeUri';
import Loader from './Loader';
import News from './News';
import useMetamask from '../services/useMetaMask';

const DashboardMain = () => {
  const { isLoading, setIsLoading, accounts, provider } = useMetamask();
  const [nfts, setNfts] = useState([]);

  const fetchNfts = async () => {
    try {
      setIsLoading(true);
      const nftContract = initializeNFTContract(provider);
      const stakeContract = initializeStakeContract(provider);
      const uris = await nftContract.fetchAllUris();

      const nftData = [];
      for (let i = 0; i < uris.length; i++) {
        const tokenId = i + 1;
        const stakeStatus = await stakeContract.stakes(tokenId);
        const isStaked = stakeStatus.isStaked;
        const owner = isStaked ? stakeStatus.owner : await nftContract.ownerOf(tokenId);

        if (owner.toLowerCase() === accounts[0].toLowerCase()) {
          const metadataUri = convertIpfsToHttps(uris[i]);
          const metadataResponse = await fetch(metadataUri);
          const metadata = await metadataResponse.json();
          const imageUrl = imageUri(metadata.image);

          nftData.push({
            ...metadata,
            image: imageUrl,
            tokenId: tokenId,
            attributes: metadata.attributes,
            isStaked: isStaked,
          });
        }
      }

      setNfts(nftData);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAccounts = async () => {
      if (accounts.length > 0) {
        await fetchNfts();
      }
    };
    checkAccounts();
  }, [accounts]);

  return (
    <div className="flex max-h-screen flex-col items-center justify-center">
      <h1 className=" p-3 font-bolda text-5xl">DASHBOARD</h1>
      <h2 className=" p-3 font-bolda text-3xl">Your Citizens</h2>
      <div className=" w-full">
        <div className=" mx-4 flex items-center justify-around gap-2">
          {isLoading ? (
            <Loader />
          ) : (
            nfts.map(nft => <CitizensCard key={nft.tokenId} metadata={nft} />)
          )}
        </div>
      </div>
      <div className="m-3 text-center">
        <h2 className=" p-3 font-bolda text-3xl">Latest ILLUCI News</h2>
        <News />
      </div>
    </div>
  );
};

export default DashboardMain;
