// proxy contract

const { ethers } = require("hardhat")
// const { abi } = require("../artifacts/contracts/BudgetNFT.sol/BudgetNFT.json");

const proxyContract = "0x976Ba8c20B886EC96548752930404d2C6B00a835";
const deployerAddress = "0x97f4400174C26a91deD0141230eE43A80aFEC3Af";
const proxyContractTest = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const mintValue = "5342708004979404";

async function main() {

    const Proxy = await ethers.getContractFactory("BudgetNFT");

    const proxy = Proxy.attach(proxyContract);

    const tx = await proxy.safeMint(deployerAddress, { value: mintValue });

    const response = await tx.wait();

    console.log(response);

}

main()