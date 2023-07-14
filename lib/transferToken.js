import { contractErc20AddressGoerli, abiToken } from "./web3details";
import { ethers } from "ethers";

const provider = new ethers.providers.AlchemyProvider("goerli", process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API)
const wallet = new ethers.Wallet( process.env.NEXT_PUBLIC_PRIVATE_KEY, provider)
const contract = new ethers.Contract( contractErc20AddressGoerli , abiToken , provider)

const expensesMint = ethers.utils.parseEther("10");
const expensesMintBudget = ethers.utils.parseEther("20");


export async function transferToken(address) {
    const tx = await contract.connect(wallet).transfer(address, expensesMint);
    return tx;
}

export async function transferTokenBudget(address) {
    const tx = await contract.connect(wallet).transfer(address, expensesMintBudget);
    return tx;
}
