// NEXTAUTH
import NextAuth from "next-auth";
// NFT
import { ThirdwebAuthProvider, authSession } from "@thirdweb-dev/auth/next-auth";

export const authOptions = ({
    providers: [
        // NFT
        ThirdwebAuthProvider({
          domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
        }),
    ],
    callbacks: {
      session: authSession,
    },
    // pages: {
    //   signIn: '/login',
    //   error: '/login'
    // },
})

export default NextAuth(authOptions);