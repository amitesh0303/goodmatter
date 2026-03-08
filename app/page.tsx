import React from 'react'
import Button from '@/components/ui/Button'
import LogoBelt from '@/components/home/LogoBelt'
import ValueProposition from '@/components/home/ValueProposition'
import FeaturedDeals from '@/components/home/FeaturedDeals'
import TeamSection from '@/components/home/TeamSection'
import styles from './page.module.css'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroBadge}>Private Investment Community</span>
          <h1 className={styles.heroTitle}>
            Good Deals.<br />
            Good People.<br />
            <span className={styles.heroAccent}>Good Matter.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            GoodMatter connects accredited investors with curated, high-conviction deal flow. 
            We&apos;re not a platform — we&apos;re a community built on trust, alignment, and shared purpose.
          </p>
          <div className={styles.heroCtas}>
            <Button href="/investors" variant="primary" size="lg">
              Apply for Investor Access
            </Button>
            <Button href="/founders" variant="secondary" size="lg">
              Submit Your Company
            </Button>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>$120M+</span>
              <span className={styles.statLabel}>Capital Deployed</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>200+</span>
              <span className={styles.statLabel}>Accredited Investors</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>48</span>
              <span className={styles.statLabel}>Portfolio Companies</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>3.2x</span>
              <span className={styles.statLabel}>Avg. Return Multiple</span>
            </div>
          </div>
        </div>
        <div className={styles.heroBackground} aria-hidden="true">
          <div className={styles.heroGradient} />
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
        </div>
      </section>

      {/* Logo Belt */}
      <LogoBelt />

      {/* Value Propositions */}
      <ValueProposition />

      {/* Featured Deals */}
      <FeaturedDeals />

      {/* Team */}
      <TeamSection />

      {/* Closing CTA Band */}
      <section className={styles.ctaBand}>
        <div className="container">
          <div className={styles.ctaBandInner}>
            <div>
              <h2 className={styles.ctaBandTitle}>Ready to invest in what matters?</h2>
              <p className={styles.ctaBandSubtitle}>
                Join our community of accredited investors and get access to exclusive deal flow, 
                expert analysis, and a network of aligned co-investors.
              </p>
            </div>
            <div className={styles.ctaBandActions}>
              <Button href="/investors" variant="primary" size="lg">
                Request Investor Access
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Talk to Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
