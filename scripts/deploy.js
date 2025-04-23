// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying with address:", deployer.address);

  const BlockVault = await hre.ethers.getContractFactory("BlockVault");

  const contract = await BlockVault.deploy(); // Deploy the contract
  console.log("Contract object:", contract);

  // Wait for the deployment transaction to be mined
  const receipt = await contract.deployTransaction.wait();
  console.log("Deployment mined in block:", receipt.blockNumber);

  console.log("Contract deployed at:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
