import { contractAddressGoerli } from "./web3details";
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API, // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

export const alchemy = new Alchemy(settings);


export async function checkNft(address) {
    const nft = await alchemy.nft.verifyNftOwnership(address, contractAddressGoerli);
    return nft;
  }