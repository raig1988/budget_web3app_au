import Logo from '../public/images/logo.png';
import MobileMenu from '../public/images/mobile-menu.png';
import Image from 'next/image';
import {useState, useRef} from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import SignOut from './signOut';
import styles from '../styles/layout/header.module.css';
import grid from '../styles/desktop/desktopGrid.module.css';
import desktop from '../styles/desktop/desktopCss.module.css';

export default function Header() {
    const { data: session } = useSession();

    const navRef = useRef(null);
    const [toggle, setToggle] = useState(false);
    function toggleNav() {
        if (!toggle) {
            navRef.current.style.display = 'flex';
            setToggle(true);
        } else {
            navRef.current.style.display = 'none';
            setToggle(false);
        }
    }
    return (
        <>
            <div id={grid.menuMobile}>
                <div className={styles.header}>
                    <Link href="/">
                        <Image 
                            src={Logo}
                            width={203}
                            height={55}
                            alt="website logo"
                            priority
                        />
                    </Link>
                    <Image 
                        src={MobileMenu}
                        onClick={toggleNav}
                        width={82}
                        height={82}
                        alt="menu button image"
                    />
                </div>
                <nav className={styles.nav} ref={navRef}>
                    <ul>
                    { session ?
                        <>
                            <Link href="/"><li onClick={toggleNav} className={"mobileSubheading underline"}>Home</li></Link>
                            <Link href="/profile"><li onClick={toggleNav} className={"mobileSubheading underline"}>Profile</li></Link>
                            <Link href="/expenses"><li onClick={toggleNav} className={"mobileSubheading underline"}>Monthly expenses</li></Link>
                            <Link href="/summary"><li onClick={toggleNav} className={"mobileSubheading underline"}>Year summary</li></Link>
                            <Link href="/budget"><li onClick={toggleNav} className={"mobileSubheading underline"}>Register budget</li></Link>
                            <SignOut />
                        </>
                        :
                        <>
                            <Link href="/"><li onClick={toggleNav} className={"mobileSubheading underline"}>Home</li></Link>
                            <Link href="/register"><li onClick={toggleNav} className={"mobileSubheading underline"}>Register</li></Link>
                            <Link href="/login"><li onClick={toggleNav} className={"mobileSubheading underline"}>Login</li></Link>
                        </>
                    }
                    </ul>
                </nav>
            </div>
            <div id={grid.menuDesktop} className={desktop.header}>
                <Link href="/">
                        <Image 
                            src={Logo}
                            width={203}
                            height={55}
                            alt="website logo"
                            priority
                        />
                </Link>
                <nav className={desktop.nav}>
                    <ul>
                    { session ?
                        <>
                            <Link href="/"><li className={"mobileSubheading underline"}>Home</li></Link>
                            <Link href="/profile"><li className={"mobileSubheading underline"}>Profile</li></Link>
                            <Link href="/expenses"><li className={"mobileSubheading underline"}>Monthly expenses</li></Link>
                            <Link href="/summary"><li className={"mobileSubheading underline"}>Year summary</li></Link>
                            <Link href="/budget"><li className={"mobileSubheading underline"}>Register budget</li></Link>
                            <SignOut />
                        </>
                        :
                        <>
                            <Link href="/"><li className={"mobileSubheading underline"}>Home</li></Link>
                            <Link href="/register"><li className={"mobileSubheading underline"}>Register</li></Link>
                            <Link href="/login"><li className={"mobileSubheading underline"}>Login</li></Link>
                        </>
                    }
                    </ul>
                </nav>

            </div>
        </>
    )
}