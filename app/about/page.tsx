import React from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import styles from './about.module.css'

const principles = [
  {
    number: '01',
    title: 'Conviction Over Consensus',
    description: 'We invest where we have deep conviction, not where it is popular. Our thesis is shaped by research, pattern recognition, and direct founder relationships.',
  },
  {
    number: '02',
    title: 'Alignment of Interests',
    description: 'We co-invest alongside our members in every deal. Our incentives are fully aligned with yours — we only succeed when you succeed.',
  },
  {
    number: '03',
    title: 'Impact as Alpha',
    description: 'We believe companies solving meaningful problems create lasting competitive advantages. Impact is not a constraint — it is our edge.',
  },
  {
    number: '04',
    title: 'Transparency First',
    description: 'No hidden fees. No opaque structures. Members receive the same information our team uses to make investment decisions.',
  },
]

const methodology = [
  {
    phase: 'Source',
    title: 'Proprietary Deal Flow',
    description: 'We source deals through our founder network, accelerator partnerships, and proprietary research. 90% of our best deals have never been listed on a platform.',
  },
  {
    phase: 'Evaluate',
    title: 'Rigorous Due Diligence',
    description: 'Every deal goes through a 30-point evaluation framework covering team, market, product, traction, financials, and legal structure before being presented to members.',
  },
  {
    phase: 'Structure',
    title: 'Member-Friendly Terms',
    description: 'We negotiate pro-rata rights, information rights, and favorable valuations. We leverage our collective capital to access terms typically reserved for institutional investors.',
  },
  {
    phase: 'Support',
    title: 'Active Portfolio Management',
    description: 'We do not disappear after the check clears. Our team provides ongoing support, introductions, and strategic guidance to portfolio companies.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>About GoodMatter</span>
            <h1 className={styles.heroTitle}>
              We built the community<br />
              <span className={styles.accent}>we always wanted.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              GoodMatter was founded by a group of investors frustrated with opaque deal flow, 
              misaligned incentives, and the disconnect between capital and impact. 
              We set out to build something different.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.missionLayout}>
            <div>
              <SectionHeading
                title="Our Mission"
                subtitle="To democratize access to institutional-quality private market investments, while channeling capital toward companies that matter."
                align="left"
                accent="Mission"
              />
            </div>
            <div className={styles.missionBody}>
              <p>
                The private markets have historically been the exclusive domain of institutional investors 
                and ultra-high-net-worth individuals. The best deals — the ones generating 10x, 20x, even 100x returns 
                — never reach the retail investor.
              </p>
              <p>
                We believe this is a structural problem, not an inevitable one. With the right network, 
                rigorous processes, and genuine alignment of interests, accredited investors can access 
                the same opportunities that have driven generational wealth for institutions.
              </p>
              <p>
                GoodMatter is our answer. A curated, trusted, members-only community where good deals 
                meet good people — and where the companies we back are building something that genuinely matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <SectionHeading
            title="Our Philosophy"
            subtitle="Four principles guide everything we do — from which deals we take on to how we structure our community."
          />
          <div className={styles.principlesGrid}>
            {principles.map((p) => (
              <Card key={p.number} variant="default" padding="lg">
                <div className={styles.principle}>
                  <span className={styles.principleNumber}>{p.number}</span>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p className={styles.principleDescription}>{p.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className={styles.section}>
        <div className="container">
          <SectionHeading
            title="Our Methodology"
            subtitle="A structured, repeatable process for sourcing, evaluating, and supporting investments."
          />
          <div className={styles.methodologyList}>
            {methodology.map((m, i) => (
              <div key={m.phase} className={styles.methodStep}>
                <div className={styles.methodPhase}>
                  <span className={styles.methodPhaseLabel}>{m.phase}</span>
                  <span className={styles.methodStepNumber}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className={styles.methodContent}>
                  <h3 className={styles.methodTitle}>{m.title}</h3>
                  <p className={styles.methodDescription}>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Join the Community</h2>
            <p className={styles.ctaSubtitle}>
              We&apos;re selectively accepting new members. Apply for investor access or submit your company for consideration.
            </p>
            <div className={styles.ctaActions}>
              <Button href="/investors" variant="primary" size="lg">Apply for Access</Button>
              <Button href="/contact" variant="secondary" size="lg">Get in Touch</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
