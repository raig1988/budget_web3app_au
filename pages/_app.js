// CSS
import '@/styles/globals.css';
// COMPONENT
import Layout from '../components/layout';
// NEXTAUTH
import { SessionProvider } from 'next-auth/react';
// NFT GATED
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Sepolia, Localhost, Goerli } from "@thirdweb-dev/chains";
// CHAKRA
import { ChakraProvider } from '@chakra-ui/react';


const localHost = {
  ...Localhost,
  name: "Hardhat-localhost",
  chainId: 31337,
  rpc: ["http://127.0.0.1:8545/"],
}

// SEPOLIA NOT WORKING
const sepolia = {
  ...Sepolia,
  rpc: ["https://rpc.sepolia.org"],
}

const customSepolia = {
  chainId: 11155111,
  rpc: ["https://sepolia.infura.io/v3/"],
  nativeCurrency: {
    decimals: 18,
    name: "SepoliaETH",
    symbol: "ETH",
  },
  shortName: "Sepolia",
  slug: "Sepolia",
  testnet: true,
  chain: "ETH",
  name: "Sepolia test network",
}

export default function App({ 
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ChakraProvider>
        <SessionProvider session={session}>
          <ThirdwebProvider
            activeChain={
              Goerli
            }
            authConfig={{
              domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
            }}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThirdwebProvider>
        </SessionProvider>
    </ChakraProvider>
  )
}
