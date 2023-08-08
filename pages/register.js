// LIBRARIES
import { useSession, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import axios from "axios";
// REACT
import { useState } from "react";
// WEB3
import { useAddress, useAuth, ConnectWallet } from "@thirdweb-dev/react";
// COMPONENTS
import { useRouter } from "next/router";
// NFT
import { checkNft } from "@/lib/checkNft";
import PurchaseNft from "@/components/purchaseNft";
import { Box, Text, Button } from "@chakra-ui/react";

export default function Register() {

  const address = useAddress();
  const auth = useAuth();
  const router = useRouter()
  const [message, setMessage] = useState("");
  const { data: session } = useSession();


  const loginWithWallet = async () => {
    // Get the sign-in with ethereum login payload
    const payload = await auth?.login();
    // Use the payload to sign-in via our wallet based credentials provider
    await signIn("credentials", {
      payload: JSON.stringify(payload),
      redirect: true,
    });
  };

  const registerWallet = async () => {
      // check for NFT
      const nft = await checkNft(address);
      // check first if user exists
      const response = await axios.post("/api/getUser/", {
        address: address,
      })
      if (response.data) {
        setMessage("User already exists");
        router.push("/login")
      } else {
        if (nft == true) {
          axios
            .post("/api/registerWeb3", {
              address: address,
            })
            .then(async (response) => {
              if (response.status == "200" && !session) {
                setMessage("Your account is being created.. please wait");
                await loginWithWallet();
              }
            })
            .catch((error) => {
              console.error(error);
            })
        } else {
          setMessage("You need to purchase an NFT");
        }
      }
  }

  return (
    <Box margin={"0px auto"} textAlign={"center"}>
      <Text className={`mobileHeading`}>Register your account</Text>
      {/* No address and no session */}
      {
        !address && !session ?
        (
          <Box textAlign={"center"}>
            <Text margin={"10px"} className="mobileSubheading">Please, connect your wallet first</Text>
            <ConnectWallet />
          </Box>
        ) :
        (
          <Box textAlign={"center"}>
            <Text margin={"10px"} className="mobileSubheading">Connected with wallet 0x...{address.slice(-4)}</Text>
            <Button className="mobileSubheading" onClick={registerWallet}>Register account</Button>
          </Box>
        )
      }
      {/* Check if there is an error message */}
      {
        message ? 
        <Box textAlign={"center"}>
          <Text as="u" color={"red"} className="mobileSubheading">{message}</Text> 
        </Box>
        : 
        null
      }
      <PurchaseNft address={address} />
    </Box>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { 
      redirect: { 
        destination: "/",
      } 
    };
  }
  return {
    props: {}
  }
}
