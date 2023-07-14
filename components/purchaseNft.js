import { Web3Button } from '@thirdweb-dev/react';
import { MediaRenderer } from "@thirdweb-dev/react";
import { abiNFT, contractAddressSepolia, contractAddressGoerli, contractAddressLocalhost } from '@/lib/web3details';
import { ethers } from 'ethers';

const amountToMint = ethers.utils.parseEther("0.005342708004979404");


export default function PurchaseNft({ address }) {

    return (
        <>
            <div style={
                {
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    gap: "20px",
                    border: "1px solid black",
                    borderRadius: "20px",
                    paddingBottom: "20px",
                    textAlign: "center",
                    margin: "20px 0px",
                    maxWidth: "300px",
                }
            }>
                <p className='mobileSubheading'>Access BudgetWeb3 buying this NFT</p>
                <MediaRenderer 
                    src='ipfs://QmYisnr8oHsgjt5PSR9o8m6HxbPJKFNUG6oPiUrGDXgeTQ' 
                    alt='Nft to access Web3Budget'
                />
                <Web3Button
                    contractAddress={contractAddressGoerli}
                    action={async (contract) => {
                        contract.call("safeMint", [address], 
                            { 
                                value: amountToMint,
                            }
                        );
                    }}
                    contractAbi={abiNFT}
                    theme="light"
                >
                    Buy
                </Web3Button>
            </div>
        </>
    )
}