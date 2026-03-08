import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.col}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoAccent}>Good</span>Matter
          </Link>
          <p className={styles.tagline}>
            Good Deals. Good People. Good Matter.
          </p>
          <p className={styles.disclaimer}>
            GoodMatter is a private investment community for accredited investors only. 
            Nothing on this site constitutes financial advice or an offer to invest.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colHeading}>Platform</h4>
          <nav className={styles.linkList}>
            <Link href="/investors" className={styles.link}>Private Access for Investors</Link>
            <Link href="/founders" className={styles.link}>Impact Studio for Founders</Link>
            <Link href="/investors/dashboard" className={styles.link}>Deal Dashboard</Link>
            <Link href="/about" className={styles.link}>About GoodMatter</Link>
          </nav>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colHeading}>Company</h4>
          <nav className={styles.linkList}>
            <Link href="/contact" className={styles.link}>Contact Us</Link>
            <Link href="/about" className={styles.link}>Our Team</Link>
            <Link href="/about" className={styles.link}>Philosophy</Link>
            <Link href="/about" className={styles.link}>Methodology</Link>
          </nav>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} GoodMatter. All rights reserved.
        </p>
        <div className={styles.bottomLinks}>
          <Link href="/contact" className={styles.link}>Privacy Policy</Link>
          <Link href="/contact" className={styles.link}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
