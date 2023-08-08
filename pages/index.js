// LIBRARIES
import { useSession } from 'next-auth/react';
// COMPONENTS
import Head from 'next/head'
import Link from 'next/link';
// NFT
import PurchaseNft from '@/components/purchaseNft';
import { useAddress } from '@thirdweb-dev/react';
import { Box, Button, Flex, List, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';

export default function Home() {

  const { data: session } = useSession();
  const address = useAddress();

  return (
    <Box maxWidth={"1200px"} margin={"auto"}>
      <Head>
        <title>Budget App</title>
        <meta name="description" content="BudgetWeb3 App for tracking expenses" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main>
        <Text textAlign={"center"} margin={"20px 0px"} className={"mobileHeading"} data-testid="homeTitle">BudgetWeb3</Text>

        {
          !session ? 
            <>
              {/* HomeContentDesktop */}
              <Flex id={"homeContentDesktop"} justifyContent={"center"} margin={"50px 0px"}>
                <Box textAlign={"justify"} marginRight={"200px"}
                  className={`"mobileParagraph"`} 
                  data-testid="homeContent"
                >
                  <HomeContentText />
              </Box>
                  <PurchaseNft address={address} />
              </Flex>

              {/* HomeContentMobile */}
              <Box id={"homeContentMobile"} >
                <Box
                    textAlign={"justify"}
                    className={`"mobileParagraph"`} 
                    data-testid="homeContent"
                  >
                    <HomeContentText />
                </Box>
                  <PurchaseNft address={address} />
              </Box>
              <Flex justifyContent={"space-between"}>
                <Button width={"45%"} type="submit" className={"mobileSubheading"} data-testid="homeRegisterBtn"><Link href="/register">Register</Link></Button>
                <Button width={"45%"} type="submit" className={"mobileSubheading"} data-testid="homeLoginBtn"><Link href="/login">Login</Link></Button>
              </Flex>
            </>

          : 
            <Flex justifyContent={"center"}>
              {/* HomeContentWhenSessionIsTrue */}
              <HomeContentText />
            </Flex>
        }

      </main>
    </Box>

  )
}

function HomeContentText() {
  return (
    <Box margin={"20px 0px"}>
      <Text className="mobileSubheading">Welcome to your budget app.</Text>
      <Text>
        The goal here is to have a tool that allows you to track your expenses daily. 
        Then, make you able to see your expenses summarized by month and per year with useful graphs. <br />
      </Text>
      <Text>In order to start:</Text>
      <OrderedList>
        <ListItem>First, buy the NFT which grants you lifetime access to the web3 app.</ListItem>
        <ListItem>After that, register to set up your account with your wallet. No other info is required so your privacy is guaranteed.</ListItem>
        <ListItem>Once logged in, set your Budget in the budget section and create your categories and enter the amount. You will be able to mint 20 BGT tokens for one time.</ListItem>
        <ListItem>Then, go to expenses and start entering your daily expenses.</ListItem>
        <ListItem>Once you have completed a month, you will be able to see it summarized by category data.</ListItem>
        <ListItem>Every month you close with your expenses, you will be able to mint 10 BGT tokens.</ListItem>
      </OrderedList>
      <Text>And once you have more than 1 month of information, you will be able to see graphs portraiting information such as:</Text>
      <UnorderedList>
        <ListItem>Evolution of your expenses by month.</ListItem>
        <ListItem>Yearly expenses divided by each category </ListItem>
      </UnorderedList>
      <Text>Tracking our expenses has been a huge financial blessing for my family and i certainly hope it will be for yours.</Text>
    </Box>
  )
}

