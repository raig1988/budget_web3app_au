// LIBRARIES
import { useSession } from 'next-auth/react';
// COMPONENTS
import Head from 'next/head'
import Link from 'next/link';
// CSS
import styles from '../styles/home.module.css';
import desktop from '../styles/desktop/desktopCss.module.css';
import home from '../styles/desktop/desktopGrid.module.css';
// NFT
import PurchaseNft from '@/components/purchaseNft';
import { useAddress } from '@thirdweb-dev/react';

export default function Home() {

  const { data: session } = useSession();
  const address = useAddress();

  return (
    <div id={desktop.home}>
      <Head>
        <title>Budget App</title>
        <meta name="description" content="BudgetWeb3 App for tracking expenses" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main>
        <h1 className={`${styles.title} "mobileHeading"`} data-testid="homeTitle">BudgetWeb3</h1>

        {
          !session ? 
            <>
              {/* HomeContetDesktop */}
              <div id={home.homeContentDesktop}>
                <div style={
                    {
                      display: "flex", 
                      justifyContent: "center", 
                      margin: "50px 0px"
                    }
                }>
                  <div 
                    className={`${styles.content} "mobileParagraph"`} 
                    data-testid="homeContent"
                    style={
                      {
                        marginRight: "200px",
                      }
                    }
                  >
                    <HomeContentText />
                </div>
                    <PurchaseNft address={address} />
                </div>
              </div>
        
              {/* HomeContentMobile */}
              <div id={home.homeContentMobile} >
                <div 
                    className={`${styles.content} "mobileParagraph"`} 
                    data-testid="homeContent"
                  >
                    <HomeContentText />
                </div>
                  <PurchaseNft address={address} />
              </div>

              <div className={styles.divButtons}>
                <button type="submit" className={"mobileSubheading"} data-testid="homeRegisterBtn"><Link href="/register">Register</Link></button>
                <button type="submit" className={"mobileSubheading"} data-testid="homeLoginBtn"><Link href="/login">Login</Link></button>
              </div>
            </>

          : 
            <div style={
              {
                display: "flex",
                justifyContent: "center",
              }
            }>
              {/* HomeContentWhenSessionIsTrue */}
              <div 
                  className={`${styles.content} "mobileParagraph"`} 
                  style={
                    {
                      maxWidth: "700px",
                    }
                  }
                  
                >
                  <HomeContentText />
              </div>
            </div>
        }

      </main>
    </div>

  )
}

function HomeContentText() {
  return (
    <>
      <p className="mobileSubheading">Welcome to your budget app.</p>
      <p>
        The goal here is to have a tool that allows you to track your expenses daily. 
        Then, make you able to see your expenses summarized by month and per year with useful graphs. <br></br>
      </p>
      <p>In order to start:</p>
      <ol>
        <li>First, buy the NFT which grants you lifetime access to the web3 app.</li>
        <li>After that, register to set up your account with your wallet. No other info is required so your privacy is guaranteed.</li>
        <li>Once logged in, set your Budget in the budget section and create your categories and enter the amount. You will be able to mint 20 BGT tokens for one time.</li>
        <li>Then, go to expenses and start entering your daily expenses.</li>
        <li>Once you have completed a month, you will be able to see it summarized by category data.</li>
        <li>Every month you close with your expenses, you will be able to mint 10 BGT tokens.</li>
      </ol>
      <p>And once you have more than 1 month of information, you will be able to see graphs portraiting information such as:</p>
      <ul>
        <li>Evolution of your expenses by month.</li>
        <li>Yearly expenses divided by each category </li>
      </ul>
      <p>Tracking our expenses has been a huge financial blessing for my family and i certainly hope it will be for yours.</p>
    </>
  )
}

