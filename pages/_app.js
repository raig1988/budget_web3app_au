// CSS
import '@/styles/globals.css';
// COMPONENT
import Layout from '../components/layout';
// NEXTAUTH
import { SessionProvider } from 'next-auth/react';

export default function App({ 
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
  )
}
