import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

function SignOut() {
    return (
        <>
          <button onClick={() => {
            window.location.assign('/')
            signOut()
            }}>Sign out</button>
        </>
    )
}

export default SignOut;