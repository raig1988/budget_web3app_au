// NEXTAUTH
import { Button, Text, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function SignIn() {
    const router = useRouter()
    return (
        <Flex flexDirection={"column"} margin={"auto"}>
            <Text className="mobileHeading">Not signed in</Text>
            <Button onClick={() => router.push("/login")}>Sign in</Button>
        </Flex>
    )
}