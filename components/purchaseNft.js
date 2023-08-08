import { Web3Button } from '@thirdweb-dev/react';
import { MediaRenderer } from "@thirdweb-dev/react";
import { abiNFT, contractAddressSepolia, contractAddressGoerli, contractAddressLocalhost } from '@/lib/web3details';
import { ethers } from 'ethers';
import { Card, CardBody, CardFooter, CardHeader, Center, Heading, Text } from '@chakra-ui/react';

const amountToMint = ethers.utils.parseEther("0.005342708004979404");


export default function PurchaseNft({ address }) {

    return (
        <Card margin={"20px 0px"}>
            {/* Header */}
            <CardHeader textAlign={"center"}>
                <Text className='mobileSubheading' >Access BudgetWeb3 buying this NFT</Text> 
            </CardHeader>
            {/* Body */}
            <CardBody padding={"0"} margin={"0 auto"}>
                <MediaRenderer 
                    src='ipfs://QmYisnr8oHsgjt5PSR9o8m6HxbPJKFNUG6oPiUrGDXgeTQ' 
                    alt='Nft to access Web3Budget'
                    // style={{
                    //     objectFit: "cover"
                    // }}
                />
            </CardBody>
            {/* Footer */}
            <CardFooter justifyContent={"center"}>
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
            </CardFooter>
        </Card>
    )
}

// style={
//     {
//         display: "flex", 
//         flexDirection: "column", 
//         alignItems: "center", 
//         gap: "20px",
//         border: "1px solid black",
//         borderRadius: "20px",
//         paddingBottom: "20px",
//         textAlign: "center",
//         margin: "20px 0px",
//         maxWidth: "300px",
//     }
// }