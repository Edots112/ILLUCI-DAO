export const convertIpfsToHttps = uri => {
  const httpUri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
  return httpUri;
};

export const imageUri = uri => {
  const parts = uri.split('/');
  const ipfsAdress = parts[2];
  const filename = parts[parts.length - 1];
  return `https://${ipfsAdress}.ipfs.nftstorage.link/${filename}`;
};
