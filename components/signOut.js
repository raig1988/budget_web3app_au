// NEXTAUTH
import { signOut } from 'next-auth/react';
import { Button } from '@chakra-ui/react';

function SignOut() {
    return (
        <Button 
            className='mobileParagraph' 
            onClick={() => {
                signOut({ callbackUrl: '/'})
            }}
        >Sign out
        </Button>
    )
}

export default SignOut;