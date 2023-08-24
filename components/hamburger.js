import hamburgerStyles from './hamburger.module.css';
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { l } from 'gray-matter';

export default function () {
    return (

        // <div className={hamburgerStyles.header}>
            <div className={hamburgerStyles.nav}>
                <span className={hamburgerStyles.logoicon}>
                    <img src="/images/accent l.svg"
                        className={hamburgerStyles.logoimg} />
                    <Link href="/"> Accent Coach</Link>
                </span>

                <input id="hamburger-toggle" className={hamburgerStyles.hamburgertoggle} type="checkbox" />
                <label className={hamburgerStyles.hamburger} for="hamburger-toggle">
                    <div className={hamburgerStyles.bar}></div>
                </label>

                <ul className={hamburgerStyles.menubar}>
                    <li> <Link key="canonical" href="/">首頁</Link></li>
                    <li> <Link href="/booking">預約</Link></li>
                    <li> <Link href="/new">測驗</Link></li>
                    <li> <Link href="/search">查詢預約</Link></li>
                
                </ul>

            </div>
        // </div>
    )
}