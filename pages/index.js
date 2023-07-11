// LIBRARIES
import { useSession } from 'next-auth/react';
// COMPONENTS
import Head from 'next/head'
import Link from 'next/link';
// CSS
import styles from '../styles/home.module.css';
import desktop from '../styles/desktop/desktopCss.module.css';
// NFT

export default function Home() {

  const { data: session } = useSession();

  return (
    <div id={desktop.home}>
      <Head>
        <title>Budget App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main>
        <h1 className={`${styles.title} "mobileHeading"`} data-testid="homeTitle">BudgetFi</h1>
        <div className={`${styles.content} "mobileParagraph"`} data-testid="homeContent">
          <p className="mobileSubheading">Welcome to your budget app.</p>
          <p>
            The goal here is to have a tool that allows you to track your expenses daily. <br></br>
            Then, make you able to see your expenses summarized by month and per year with useful graphs. <br></br>
          </p>
          In order to start, first create an account. <br></br>
          After that, set your Budget in the budget section and create your categories and enter the amount. <br></br>
          Then, go to expenses and start entering your daily expenses. <br></br>
          Once you have completed a month, you will be able to see a summarized by category data. <br></br>
          <p>
            And once you have more than 1 month of information, you will be able to see graphs portraiting information such as: <br></br>
            1. Evolution of your expenses by month. <br></br>
            2. Yearly expenses divided by each category <br></br>
          </p>
          Tracking our expenses has been a huge financial blessing for my family and i certainly hope it will be for yours.
        </div>
        {!session ?
          <div className={styles.divButtons}>
            <button type="submit" className={"mobileSubheading"} data-testid="homeRegisterBtn"><Link href="/register">Register</Link></button>
            <button type="submit" className={"mobileSubheading"} data-testid="homeLoginBtn"><Link href="/login">Login</Link></button>
          </div>
          : <></>
         }
      </main>
    </div>
  )
}


