import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import Hamburger from './hamburger';
import Footer from './footer';
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import GoToTopButton from '../components/gototopbutton';

export const siteTitle = 'Accent Coach'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/images/accent l.svg" />
        <meta
          name="description"
          content="Learn English American Accent Private Coach"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Hamburger />
      {/* <h1 className={utilStyles.heading2Xl}>[!!!測試中TEST!!!不要預約不要付款]</h1> */}
      <div className={styles.children}>{children}</div>
      <Footer />
      <GoToTopButton />
      
    
    </div>
  )
}
