// CSS
import styles from "../styles/forms/registerLogin.module.css";
import desktop from "../styles/desktop/desktopCss.module.css";
// LIBRARIES
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";



// NFT
import { ConnectWallet, detectFeatures, useAddress, useAuth, useCompilerMetadata, useContract, useContractRead, useSDK } from "@thirdweb-dev/react";
import { useState } from "react";
import { contractAddress } from "@/lib/web3details";
import checkNft from "@/lib/checkNft";


function Login() {

  const address = useAddress()
  const auth = useAuth();
  const sdk = useSDK();

  const [message, setMessage] = useState();

  const loginWithWallet = async () => {
      try {
        const nft = await checkNft(sdk, address);
        if (nft == false) {
          throw Error("You need to purchase an NFT");
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

// const errors = {
  //   Signin: "Try signing with a different account.",
  //   OAuthSignin: "Try signing with a different account.",
  //   OAuthCallback: "Try signing with a different account.",
  //   OAuthCreateAccount: "Try signing with a different account.",
  //   EmailCreateAccount: "Try signing with a different account.",
  //   Callback: "Try signing with a different account.",
  //   OAuthAccountNotLinked:
  //     "To confirm your identity, sign in with the same account you used originally.",
  //   EmailSignin: "Check your email address.",
  //   CredentialsSignin:
  //     "Sign in failed. Check the details you provided are correct.",
  //   default: "Unable to sign in.",
  // };
  
  // const SignInError = ({ error }) => {
  //   const errorMessage = error && (errors[error] ?? errors.default);
  //   return <div className={styles.error}>{errorMessage}</div>;
  // };