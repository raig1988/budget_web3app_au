// CSS
import styles from "../styles/forms/registerLogin.module.css";
import desktop from "../styles/desktop/desktopCss.module.css";
import stylesButton from '../styles/home.module.css';
// LIBRARIES
import { useSession, getProviders, signIn, getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import axios from "axios";
// REACT
import { useState } from "react";
// WEB3
import { useAddress, useAuth, ConnectWallet, useSDK } from "@thirdweb-dev/react";
// COMPONENTS
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
// NFT
import { checkNft } from "@/lib/checkNft";
import PurchaseNft from "@/components/purchaseNft";

export default function Register() {

  // NFT
  const address = useAddress();
  const auth = useAuth();;

  const router = useRouter()


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

  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  return (
    <>
      <div id={desktop.registerForm}>
        <p className={`${styles.title} mobileHeading`}>Register your account</p>
        {
          !address && !session ? 
          (
            <>
              <p>Please, connect your wallet first</p>
              <ConnectWallet />
            </>
          ) :
          (
            <>
              <p>{address}</p>
              <button onClick={registerWallet}>Register account</button>
            </>
          )
        }
        {message ? 
          <>
            <p className="mobileSubheading">{message}</p> 
          </>
          : null
        }
        <PurchaseNft address={address} />
      </div>
    </>
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
