// PUBLIC
import { Flex, Link, Text } from '@chakra-ui/react';
import Logo from '../public/images/logo.png';
// NEXTJS COMPONENTS
import Image from 'next/image';
import NextLink from "next/link";

export default function Footer() {
    return (
        <Flex direction={"column"} alignItems={"center"} margin={"20px"}>
            <a href='https://www.buymeacoffee.com/raig1988' target='_blank'>
                <Text margin={"10px 0px"}  className={`buyMeACoffee mobileParagraph`}>Buy me a coffee</Text>
            </a>
            <Link as={NextLink} href="/">
                <Image
                    src={Logo}
                    width={203}
                    height={55}
                    alt="website logo"
                    priority
                />
            </Link>
        </Flex>
    )
}