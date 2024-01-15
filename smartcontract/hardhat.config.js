require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

const INFURA_API_KEY = process.env.API_KEY;
const SEPOLIA_PRIVATE_KEY = `0x${process.env.PRIVATE_KEY}`;

console.log("INFURA_API_KEY", INFURA_API_KEY);
console.log("SEPOLIA_PRIVATE_KEY", SEPOLIA_PRIVATE_KEY);

/** @type import('hardhat/config').HardhatUserConfig */
(
	module.exports = {
		solidity: "0.8.20",
		networks: {
			sepolia: {
				url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
				accounts: [SEPOLIA_PRIVATE_KEY],
			},
		},
	}
);
