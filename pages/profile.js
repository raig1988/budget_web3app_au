// COMPONENTS
import SignIn from '@/components/signIn';
// LIBRARIES
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import axios from 'axios'
import { Box, Button, Text } from '@chakra-ui/react';

export default function Profile() {

    const { data: session } = useSession();

    return (
        <>
            {
                session ? 
                    <Box textAlign={"center"} margin={"0px auto"} >
                        <Text className={'mobileHeading'}>Profile</Text>
                        <Text margin={"20px 0px"} className='mobileSubheading'>Click below to delete your account.</Text>
                        <Button maxWidth={"300px"}
                            className={`mobileSubheading`}
                            onClick={() => {
                                if(confirm("Are you sure you want to delete your account? ALL YOUR DATA WILL BE LOST!")) {
                                    axios.delete('/api/profile/deleteUser/', {
                                        data: {
                                            address: session.user.address,
                                        }
                                    })
                                    .then(res => {
                                        signOut({ callbackUrl: '/'});
                                    })
                                    .catch(error => console.error(error));
                                }
                            }}
                        >Delete account!
                        </Button>
                    </Box>
                :
                <SignIn />
            }
        </>
    )
}
