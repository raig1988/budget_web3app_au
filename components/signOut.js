// NEXTAUTH
import { signOut } from 'next-auth/react';

function SignOut() {
    return (
        <>
          <button className='mobileParagraph' onClick={() => {
            signOut({ callbackUrl: '/'})
            }}>Sign out</button>
        </>
    )
}

export default SignOut;