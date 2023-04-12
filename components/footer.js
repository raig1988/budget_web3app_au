import Logo from '../public/images/logo.png';
import Image from 'next/image';
import styles from '../styles/layout/footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <Link href='https://www.buymeacoffee.com/raig1988'>
                <p className={`${styles.buyMeACoffee} mobileParagraph`}>Buy me a coffee</p>
            </Link>
            <Link href="/">
                <Image
                    src={Logo}
                    width={203}
                    height={55}
                    alt="website logo"
                    priority
                />
            </Link>
        </div>
    )
}