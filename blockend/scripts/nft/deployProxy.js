// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const BudgetNFT = await ethers.getContractFactory("BudgetNFT");
  const Proxy = await upgrades.deployProxy(BudgetNFT);
  await Proxy.waitForDeployment();
  console.log("Proxy deployed to:", await Proxy.getAddress());
}

main();

// BudgetNFT 0x5fbdb2315678afecb367f032d93f642f64180aa3
// Proxy : 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512