// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");

const proxyDeploymentAddress = "0x976Ba8c20B886EC96548752930404d2C6B00a835" // proxy
// implementation 0xcC6eF84D3A40D2A69D70E61fa8De36D29ce8874A

async function main() {
  const BudgetNFTV2 = await ethers.getContractFactory("BudgetNFTV2");
  const budgetNFT = await upgrades.upgradeProxy(previousContractAddress, BudgetNFTV2);
  console.log("BudgetNFT updated");
}

main();