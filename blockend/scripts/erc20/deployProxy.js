// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const BudgetWeb3 = await ethers.getContractFactory("BudgetWeb3");
  const Proxy = await upgrades.deployProxy(BudgetWeb3);
  await Proxy.waitForDeployment();
  console.log("Proxy deployed to:", await Proxy.getAddress());
}

main();
