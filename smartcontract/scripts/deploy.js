// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
	const Mint = await hre.ethers.deployContract("ILLUCI");
	await Mint.waitForDeployment();
	console.log("Miniting contract deployed to:", Mint.target);

	const owner = "0xDFeC87012cce2b48C6b50F389FC5fd91fE64ae66";

	const Token = await hre.ethers.deployContract("ILLUCITOKEN", [owner]);
	await Token.waitForDeployment();
	console.log("Token contract deployed to:", Token.target);

	const Stake = await hre.ethers.deployContract("StakeNft", [
		Mint.target,
		Token.target,
	]);
	await Stake.waitForDeployment();
	console.log("Stake contract deployed to:", Stake.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
