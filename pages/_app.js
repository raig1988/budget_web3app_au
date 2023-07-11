// CSS
import '@/styles/globals.css';
// COMPONENT
import Layout from '../components/layout';
// NEXTAUTH
import { SessionProvider } from 'next-auth/react';
// NFT GATED
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';

const activeChainId = ChainId.Mainnet;

export default function App({ 
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
      <SessionProvider session={session}>
        <ThirdwebProvider
          desiredChainId={activeChainId}
          authConfig={{
            domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThirdwebProvider>
      </SessionProvider>
  )
}
