'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import styles from './Header.module.css'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/investors', label: 'Private Access for Investors' },
  { href: '/founders', label: 'Impact Studio for Founders' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <img src="/goodmatter-logo.svg" alt="GoodMatter" className={styles.logoImg} />
          <span className={styles.logoText}><span className={styles.logoAccent}>Good</span>Matter</span>
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${pathname === href ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button href="/investors" variant="secondary" size="sm">
            Investor Login
          </Button>
          <Button href="/founders" variant="primary" size="sm">
            Apply as Founder
          </Button>
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Mobile navigation">
          <nav className={styles.mobileNav}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.mobileNavLink} ${pathname === href ? styles.active : ''}`}
              >
                {label}
              </Link>
            ))}
            <div className={styles.mobileActions}>
              <Button href="/investors" variant="secondary" fullWidth>
                Investor Login
              </Button>
              <Button href="/founders" variant="primary" fullWidth>
                Apply as Founder
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
