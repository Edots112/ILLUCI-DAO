import React, { useState, useEffect } from 'react';
import { convertIpfsToHttps, imageUri } from '../utils/covertAndChangeUri';

const StakeNftCard = ({
  isStaked,
  counterRewards,
  unStakeNft,
  claimTokens,
  approveAndStake,
  stakedNfts,
  unstakedNfts,
}) => {
  const nftsToShow = isStaked ? stakedNfts : unstakedNfts;

  console.log('nftsToShow', nftsToShow);
  return (
    <div className="flex  flex-wrap items-center justify-center gap-10">
      {nftsToShow.map(nft => (
        <div
          key={nft.tokenId}
          className=" flex flex-col rounded-3xl border-2 border-black bg-white/60 p-3 shadow-lg"
          style={{ width: '300px' }}
        >
          <img
            className="h-64 w-full rounded-3xl object-cover"
            src={convertIpfsToHttps(nft.image)}
            alt={nft.name}
          />
          <div className="p-6">
            <h2 className="mb-2 text-xl font-bold">{nft.name}</h2>
          </div>
          <div className="border-t p-6 pt-4">
            {isStaked && <p>Tokens Earned: {(counterRewards[nft.tokenId] ?? 0).toFixed(2)}</p>}

            {isStaked ? (
              <>
                <button
                  className="mt-2 w-full rounded bg-pink-500 py-2 font-bold text-white hover:bg-pink-800"
                  onClick={() => unStakeNft(nft.tokenId)}
                >
                  Unstake
                </button>
                <button
                  className="mt-2 w-full rounded bg-green-500 py-2 font-bold text-white hover:bg-green-700"
                  onClick={() => claimTokens(nft.tokenId)}
                >
                  Claim
                </button>
              </>
            ) : (
              <button
                className="mt-2 w-full rounded bg-pink-500 py-2 font-bold text-white hover:bg-pink-800"
                onClick={() => approveAndStake(nft.tokenId)}
              >
                Stake
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default StakeNftCard;
