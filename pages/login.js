
// LIBRARIES
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
// NFT
import { ConnectWallet, useAddress, useAuth } from "@thirdweb-dev/react";
import { useState } from "react";
import { checkNft } from "@/lib/checkNft";
import { useRouter } from "next/router";
import axios from "axios";
import PurchaseNft from "@/components/purchaseNft";
import { Box, Button, Flex, Text } from "@chakra-ui/react";


export default function Login() {

  const address = useAddress()
  const auth = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState();
  

  const loginWithWallet = async () => {
      try {
        const nft = await checkNft(address);
        if (nft == false) {
          throw Error("You need to purchase an NFT");
        }
        // check if user is registered or not
        const response = await axios.post("/api/getUser/", {
          address: address,
        })
        if (!response.data) {
          setMessage("You need to register first... redirecting");
          setTimeout(() => {
            router.push("/register");
          }, 5000);
        } else {
          // Get the sign-in with ethereum login payload
          const payload = await auth?.login();
          // Use the payload to sign-in via our wallet based credentials provider
          await signIn("credentials", {
            payload: JSON.stringify(payload),
            redirect: true,
          });
        }
      } catch(e) {
        console.error(e);
        setMessage(e.message);
      }
  };


  return (
    <Box margin={"0px auto"} textAlign={"center"}>
      <Text className="mobileHeading">Log In</Text>
      <Flex direction={"column"} gap={"20px"} margin={"20px"}>
        {/* Check if wallet is connected */}
        {
          address ? (
            <>
              <Text className="mobileSubheading">Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}</Text>
              <Text className="mobileSubheading">Please, log in clicking below.</Text>
              <Button className="mobileSubheading" onClick={loginWithWallet}>Log In</Button>
            </>
          ) : (
            <>
              <Text className="mobileSubheading">Please connect your wallet to continue.</Text>
              <ConnectWallet />
            </>
          )
        }
      </Flex>
      {/* Displays error message */}
      {
        message ?
        <Box textAlign={"center"}>
          <Text as="u" color={"red"} className="mobileSubheading">{message}</Text> 
          <PurchaseNft address={address} />
        </Box>
        : null
      }
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/" } };
  }
  return {
    props: {
    },
  };
}
