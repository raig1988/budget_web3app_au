// CSS
import styles from "../styles/forms/registerLogin.module.css";
import desktop from "../styles/desktop/desktopCss.module.css";
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


function Login() {

  const address = useAddress()
  const auth = useAuth();
  const router = useRouter()


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
          setMessage("You need to register first");
          router.push("/register");
        }
        // Get the sign-in with ethereum login payload
        const payload = await auth?.login();
        // Use the payload to sign-in via our wallet based credentials provider
        await signIn("credentials", {
          payload: JSON.stringify(payload),
          redirect: true,
        });
      } catch(e) {
        console.error(e);
        setMessage(e.message);
      }
  };


  return (
          <div id={desktop.loginForm}>
          {
            address ? (
              <>
                <p className="mobileHeading">Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}</p>
                <button onClick={loginWithWallet}>Log In</button>
              </>
          ) : (
            <>
              <p>Please connect your wallet to continue.</p>
              <ConnectWallet accentColor="#F213A4" />
            </>
          )
          }
          {
            message ?
            <p>{message}</p> 
            : null
          }
          </div>
  );
}

export default Login;


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
