// proxy contract

const { getProxyFactory } = require("@openzeppelin/hardhat-upgrades/dist/utils");
const { ethers } = require("hardhat")
// const { abi } = require("../artifacts/contracts/BudgetNFT.sol/BudgetNFT.json");

const proxyContract = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
const deployerAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
// const proxyContractTest = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const mintValue = BigInt(700000000 * 10 ** 18);
const maxSupply = (1,000,000,000 * 10 ** 18)

1,199,999,999.99999996174794752

async function main() {

    const Proxy = await ethers.getContractFactory("BudgetWeb3");

    const proxy = Proxy.attach(proxyContract);

    // const tx = await proxy.safeMint(deployerAddress, { value: mintValue });

    const totalSupply = await proxy.totalSupply();

    console.log(`Initial owner balance: ${ethers.formatEther(totalSupply)}`);

    // console.log(mintValue);
    const mintTx = await proxy.mint(mintValue);

    await mintTx.wait();

    const newTotalSupply = await proxy.totalSupply();

    console.log(`New total supply: ${ethers.formatEther(newTotalSupply)}`)

}

main()