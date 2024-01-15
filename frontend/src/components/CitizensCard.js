import React from 'react';

const CitizensCard = ({ metadata }) => {
  console.log('metadata', metadata);
  return (
    <div className="mb-4 flex w-72 flex-col items-center justify-center rounded-xl border">
      <img className="m-1 h-60 w-full p-2 " src={metadata.image}></img>
      <h1 className="font-bolda text-3xl">{metadata.name}</h1>
      {metadata.isStaked && (
        <h1 className="absolute  rounded bg-black/70 p-2 font-bolda text-3xl text-white">Staked</h1>
      )}
      <div className="flex w-full flex-col">
        <div className="grid grid-cols-3 grid-rows-2 items-center border-t border-gray-950 text-center ">
          {metadata.attributes.map(attr => (
            <div key={attr.trait_type}>
              <div className="">
                <h4 className="text-md font-bold">{attr.trait_type}</h4>
                <h2 className="text-sm font-bold">{attr.value}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitizensCard;
