import React, { useState, useEffect } from 'react';
import StakeNftCard from '../components/StakeNftCard';
import useMetamask from '../services/useMetaMask';
import ConnectMetamask from '../components/ConnectMetamask';
import Loader from '../components/Loader';
import { calculateStakeRewards } from '../utils/calculateStakeRewards';
import { convertIpfsToHttps, imageUri } from '../utils/covertAndChangeUri';
import Popup from '../components/Popup';

const CitadelScreen = () => {
  const {
    accounts,
    provider,
    isLoading,
    setIsLoading,
    hasNft,
    initNftContract,
    initStakeContract,
    initTokenContract,
  } = useMetamask();

  const [isStaked, setIsStaked] = useState(false);
  const [unstakedNfts, setUnstakedNfts] = useState([]);
  const [stakedNfts, setStaked] = useState([]);
  const [startTimes, setStartTimes] = useState({});
  const [counterRewards, setCounterRewards] = useState({ tokenId: null, rewards: 0 });
  const [balance, setBalance] = useState(0);

  const userAddress = accounts[0];

  const fetchNfts = async () => {
    setIsLoading(true);
    try {
      const nftContract = initNftContract;
      const stakeContract = initStakeContract;
      const uris = await nftContract.fetchAllUris();
      const totalSupply = await nftContract.totalSupply();

      const nftData = [];
      for (let tokenId = 1; tokenId <= totalSupply; tokenId++) {
        if (uris[tokenId - 1]) {
          const metadataUri = convertIpfsToHttps(uris[tokenId - 1]);
          const metadataResponse = await fetch(metadataUri);
          const metadata = await metadataResponse.json();

          const imageUrl = imageUri(metadata.image);
          const stakeStatus = await stakeContract.stakes(tokenId);
          const isStaked = stakeStatus.isStaked;
          const owner = isStaked ? stakeStatus.owner : await nftContract.ownerOf(tokenId);

          if (owner.toLowerCase() === userAddress.toLowerCase()) {
            nftData.push({
              ...metadata,
              image: imageUrl,
              staked: isStaked,
              tokenId: tokenId,
              startTime: stakeStatus.startTime.toNumber(),
            });
          }
        }
      }

      const stakedNfts = nftData.filter(nft => nft.staked);
      const unstakedNfts = nftData.filter(nft => !nft.staked);

      setStaked(stakedNfts);
      setUnstakedNfts(unstakedNfts);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const approveAndStake = async tokenId => {
    setIsLoading(true);
    try {
      const nftContract = initNftContract;
      const stakeContract = initStakeContract;

      const approveTx = await nftContract.approve(stakeContract.address, tokenId);
      await approveTx.wait();

      const stakeTx = await stakeContract.stake(tokenId);
      await stakeTx.wait();
    } catch (error) {
      console.error('Error staking NFT:', error);
    } finally {
      fetchNfts();
      setIsLoading(false);
    }
  };

  const unStakeNft = async tokenId => {
    setIsLoading(true);
    try {
      const stakeContract = initStakeContract;
      await stakeContract.unstake(tokenId).then(tx => tx.wait());
    } catch (error) {
      console.error('Error unstaking NFT:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const claimTokens = async tokenId => {
    setIsLoading(true);
    try {
      const stakeContract = initStakeContract;
      await stakeContract.claim(tokenId).then(tx => tx.wait());

      setCounterRewards(prevRewards => ({
        ...prevRewards,
        [tokenId]: 0,
        setStartTimes,
      }));
    } catch (error) {
      console.error('Error claiming tokens:', error);
    } finally {
      fetchNfts();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initNftContract) fetchNfts();
  }, [initNftContract]);

  useEffect(() => {
    fetchTokenBalance();
  }, [accounts, setBalance]);

  useEffect(() => {
    if (initStakeContract) {
      const handleUnstaked = () => {
        fetchNfts();
        setIsLoading(false);
      };

      const handleClaimed = () => {
        if (initTokenContract) {
          fetchTokenBalance();
        }
      };

      initStakeContract.on('Unstaked', handleUnstaked);
      initStakeContract.on('Claimed', handleClaimed);

      return () => {
        initStakeContract.off('Unstaked', handleUnstaked);
        initStakeContract.off('Claimed', handleClaimed);
      };
    }
  }, [initStakeContract, userAddress]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTokenRewards = { ...counterRewards };

      stakedNfts.forEach(nft => {
        if (nft.staked) {
          newTokenRewards[nft.tokenId] = calculateStakeRewards(nft.startTime);
        }
      });

      setCounterRewards(newTokenRewards);
    }, 1000);

    return () => clearInterval(interval);
  }, [stakedNfts, counterRewards]);

  const fetchTokenBalance = async () => {
    if (accounts.length > 0) {
      try {
        const tokenContract = initTokenContract;
        const balance = await tokenContract.balanceOf(accounts[0]);
        setBalance(balance.toString());
      } catch (error) {
        console.error('Error fetching token balance:', error);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (accounts.length === 0) {
    return <ConnectMetamask />;
  }

  if (!hasNft) {
    return (
      <Popup
        hrefs="/minting"
        textContent="You are not a Citizen yet. Please mint your Citizen to continue."
        buttonContent="Mint Now"
      />
    );
  }

  return (
    <div className="flex h-full flex-col justify-around bg-citadel-background bg-cover bg-center ">
      <div>
        <h1 className="text-center font-bolda text-7xl text-pink-500">ILLUCI Citadel</h1>
        <h2 className="text-center font-bolda text-3xl text-gray-700">
          Stake your Citizens to earn rewards
        </h2>
        <div className="text-center font-bolda text-xl text-pink-500">
          Your ILU Tokens: {balance}
        </div>
        ;
      </div>
      <div className="flex justify-center gap-4 p-2">
        <button
          className={`rounded px-4 py-2 font-bold text-white hover:bg-pink-800  ${
            isStaked ? 'bg-gray-500' : 'bg-pink-500'
          }`}
          onClick={() => setIsStaked(false)}
        >
          View Unstaked
        </button>
        <button
          className={`rounded px-4 py-2 font-bold text-white hover:bg-pink-800 ${
            isStaked ? 'bg-pink-500' : 'bg-gray-500'
          }`}
          onClick={() => setIsStaked(true)}
        >
          View Staked
        </button>
      </div>
      <StakeNftCard
        isStaked={isStaked}
        stakedNfts={stakedNfts}
        unstakedNfts={unstakedNfts}
        counterRewards={counterRewards}
        unStakeNft={unStakeNft}
        claimTokens={claimTokens}
        approveAndStake={approveAndStake}
      />
      {isLoading && <Loader />}
    </div>
  );
};

export default CitadelScreen;
