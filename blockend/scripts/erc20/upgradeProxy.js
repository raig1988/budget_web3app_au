// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");

const proxyDeploymentAddress = "0x64E3AD6427966402B0e1B25c8dBca8B081D43D8B" // proxy

async function main() {
  const BudgetWeb3V2 = await ethers.getContractFactory("BudgetWeb3");
  const budgetWeb3V2 = await upgrades.upgradeProxy(previousContractAddress, BudgetWeb3V2);
  console.log("BudgetNFT updated");
}

main();