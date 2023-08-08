import Logo from '../public/images/logo.png';
import Image from 'next/image';
import {useState, useRef} from 'react';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
// COMPONENTS
import SignOut from './signOut';
// helper function
import { toggleNav } from '@/lib/helperFunctions';
import { ConnectWallet } from '@thirdweb-dev/react';
// CHAKRA
import { useColorMode, Button, Link, Flex, MenuButton, IconButton, Menu, Card } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import NextLink from "next/link"



export default function Header() {
    // CHAKRA
    const { colorMode, toggleColorMode } = useColorMode()
    // NFT
    const { data: session } = useSession();
    const navRef = useRef(null);
    const [toggle, setToggle] = useState(false);

    return (
        <>
            {/* MOBILE */}
            <nav id={"menuMobile"}>
                <Flex justifyContent={"space-around"} alignItems={"center"} margin={"20px"} >
                    <Link as={NextLink} href="/">
                        <Image 
                            src={Logo}
                            width={203}
                            height={55}
                            alt="website logo"
                            priority
                        />
                    </Link>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                            onClick={() => toggleNav(toggle, setToggle, navRef)}
                            alt="menu button image"
                            boxSize={"4em"}
                        />
                    </Menu>
                </Flex>
                <Card  ref={navRef} direction={"column"} padding={"10px 0px"} alignItems={"center"}>
                    { 
                        session ?
                        <>
                            <Link as={NextLink} href="/" onClick={() => toggleNav(toggle, setToggle, navRef)} className={"mobileSubheading"}>Home</Link>
                            <Link as={NextLink} href="/profile" onClick={() => toggleNav(toggle, setToggle, navRef)} className={"mobileSubheading"}>Profile</Link>
                            <Link as={NextLink} href="/budget" onClick={() => toggleNav(toggle, setToggle, navRef)} className={"mobileSubheading"}>Register budget</Link>
                            <Link as={NextLink} href="/expenses" onClick={() => toggleNav(toggle, setToggle, navRef)} className={"mobileSubheading"}>Monthly expenses</Link>
                            <Link as={NextLink} href="/summary" onClick={() => toggleNav(toggle, setToggle, navRef)} className={"mobileSubheading"}>Year summary</Link>
                            <Button onClick={toggleColorMode}> Toggle {colorMode === 'light' ? 'Dark' : 'Light'} </Button>
                            <SignOut />
                        </>
                        :
                        <>
                            <Link as={NextLink} href="/" onClick={() => toggleNav(toggle, setToggle, navRef)} className={"mobileSubheading"}>Home</Link>
                            <Link as={NextLink} href="/register" onClick={() => toggleNav(toggle, setToggle, navRef)} className={"mobileSubheading"}>Register</Link>
                            <Link as={NextLink} href="/login" onClick={() => toggleNav(toggle, setToggle, navRef)} className={"mobileSubheading"}>Login</Link>
                            <Button onClick={toggleColorMode}> Toggle {colorMode === 'light' ? 'Dark' : 'Light'} </Button>
                            <ConnectWallet />
                        </>
                    }
                </Card>
            </nav>

            {/* DESKTOP */}
            <nav id={"menuDesktop"} >
                <Flex justifyContent={"space-evenly"} alignContent={"center"} margin={"20px 0px"}>
                    <Link as={NextLink} href="/">
                        <Image 
                            src={Logo}
                            width={203}
                            height={55}
                            alt="website logo"
                            priority
                        />
                    </Link>
                    <Flex gap={"20px"} alignItems={"center"}>
                    {
                        session ?
                        <>
                            <Link as={NextLink} href="/" className='mobileSubheading'>Home</Link>
                            <Link as={NextLink} href="/profile" className={"mobileSubheading"}>Profile</Link>
                            <Link as={NextLink} href="/budget" className={"mobileSubheading"}>Register budget</Link>
                            <Link as={NextLink} href="/expenses" className={"mobileSubheading"}>Monthly expenses</Link>
                            <Link as={NextLink} href="/summary" className={"mobileSubheading"}>Year summary</Link>
                            <Button onClick={toggleColorMode}> Toggle {colorMode === 'light' ? 'Dark' : 'Light'} </Button>
                            <SignOut /> 
                        </>
                        :
                        <>
                            <Link as={NextLink} href="/" className={"mobileSubheading"}>Home</Link>
                            <Link as={NextLink} href="/register" className={"mobileSubheading"}>Register</Link>
                            <Link as={NextLink} href="/login" className={"mobileSubheading"}>Login</Link>
                            <Button onClick={toggleColorMode}> Toggle {colorMode === 'light' ? 'Dark' : 'Light'} </Button>
                            <ConnectWallet />
                        </>
                    }
                    </Flex>
                </Flex>
            </nav>
        </>
    )
}