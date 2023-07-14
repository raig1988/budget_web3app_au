// proxy contract

const { ethers } = require("hardhat")

// const proxyContract = "0xb2D7515B8b6a130a02d143009841Daeb4B75D273";

const deployerAddress = "0x97f4400174C26a91deD0141230eE43A80aFEC3Af";
const proxyContractTest = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

async function main() {

    const Proxy = await ethers.getContractFactory("BudgetNFT");

    const proxy = Proxy.attach(proxyContractTest);

    const tx = await proxy.getBalance();

    console.log(tx);

}

main()