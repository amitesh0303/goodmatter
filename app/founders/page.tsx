'use client'
import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { submitFounderApplication, signUpStartup } from './actions'
import styles from './founders.module.css'

const services = [
  { title: 'Financial Modeling', desc: 'Three-statement models, unit economics, scenario analysis, and investor-ready outputs.' },
  { title: 'Investor Relations', desc: 'Deck reviews, pitch coaching, investor targeting, and introduction facilitation.' },
  { title: 'Capital Strategy', desc: 'Round structuring, term sheet review, dilution modeling, and cap table management.' },
  { title: 'Board Reporting', desc: 'Board deck templates, KPI dashboards, and monthly reporting packages.' },
  { title: 'Strategic Advisory', desc: 'Go-to-market strategy, pricing models, competitive positioning, and growth playbooks.' },
  { title: 'Due Diligence Prep', desc: 'Data room setup, virtual data room management, and due diligence readiness reviews.' },
]

const steps = [
  { number: '01', title: 'Apply', desc: 'Submit your company via our application form. We review every application within 5 business days.' },
  { number: '02', title: 'Screen', desc: 'Our investment team conducts an initial screening call to understand your business and capital needs.' },
  { number: '03', title: 'Diligence', desc: 'For companies that pass screening, we conduct thorough due diligence over 2-3 weeks.' },
  { number: '04', title: 'Present', desc: 'Approved companies are presented to our investor network with a full investment memo.' },
]

const cfoPlans = [
  { tier: 'Starter', price: '$1,500/mo', best: false, features: ['Monthly financial close', 'Basic reporting package', 'Cap table management', '2 advisory calls/month'] },
  { tier: 'Growth', price: '$3,500/mo', best: true, features: ['Weekly financial close', 'Investor-ready reporting', 'Board deck preparation', '4 advisory calls/month', 'Investor relations support', 'Fundraising preparation'] },
  { tier: 'Scale', price: '$6,500/mo', best: false, features: ['Daily reconciliation', 'Full CFO partnership', 'Unlimited advisory access', 'Full board support', 'M&A preparation', 'Custom integrations'] },
  { tier: 'Enterprise', price: 'Custom', best: false, features: ['Dedicated fractional CFO', 'Full finance function', 'Embedded team member', 'Strategic planning', 'Exit preparation', 'IPO readiness'] },
]

const sectorOptions = [
  { value: 'ai_ml', label: 'AI / Machine Learning' },
  { value: 'fintech', label: 'FinTech' },
  { value: 'healthtech', label: 'HealthTech' },
  { value: 'climatetech', label: 'Climate Tech' },
  { value: 'edtech', label: 'EdTech' },
  { value: 'saas', label: 'SaaS / Enterprise Software' },
  { value: 'consumer', label: 'Consumer' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'deeptech', label: 'Deep Tech' },
  { value: 'other', label: 'Other' },
]

const stageOptions = [
  { value: 'pre_idea', label: 'Pre-Idea / Concept' },
  { value: 'pre_seed', label: 'Pre-Seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series_a', label: 'Series A' },
  { value: 'series_b', label: 'Series B+' },
]

export default function FoundersPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  const [signupStatus, setSignupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [signupMessage, setSignupMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormStatus('loading')
    setFormError('')

    const formData = new FormData(e.currentTarget)
    const result = await submitFounderApplication(formData)

    if (result.success) {
      setFormStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } else {
      setFormStatus('error')
      setFormError(result.error || 'Something went wrong.')
    }
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSignupStatus('loading')
    setSignupMessage('')
    const formData = new FormData(e.currentTarget)
    const result = await signUpStartup(formData)
    if (result.success) {
      setSignupStatus('success')
      setSignupMessage(result.message || 'Account created!')
    } else {
      setSignupStatus('error')
      setSignupMessage(result.error || 'Sign up failed. Please try again.')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <Badge color="accent">Impact Studio for Founders</Badge>
            <h1 className={styles.heroTitle}>
              Build the company<br />
              <span className={styles.accent}>you imagined.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              GoodMatter&apos;s Impact Studio provides founders with the capital access, 
              financial infrastructure, and strategic support to go from vision to venture-backed reality.
            </p>
            <div className={styles.heroCtas}>
              <Button href="#apply" variant="primary" size="lg">Apply Now</Button>
              <Button href="#services" variant="secondary" size="lg">Explore Services</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Signup */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.signupLayout}>
            <div>
              <SectionHeading
                title="Create Your Founder Account"
                subtitle="Sign up to access the GoodMatter founder portal — track your application, connect with investors, and access resources."
                align="left"
              />
            </div>
            <div className={styles.signupForm}>
              {signupStatus === 'success' ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Account Created!</h3>
                  <p>{signupMessage}</p>
                  <Button variant="secondary" size="sm" onClick={() => { setSignupStatus('idle'); setSignupMessage('') }}>
                    Sign Up Again
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSignup} className={styles.form} noValidate>
                  {signupStatus === 'error' && (
                    <div className={styles.errorBanner} role="alert">{signupMessage}</div>
                  )}
                  <div className={styles.row}>
                    <Input label="Your Name" id="signup-full-name" name="full_name" placeholder="Jane Smith" required />
                    <Input label="Startup Name" id="signup-startup-name" name="startup_name" placeholder="Acme Corp" required />
                  </div>
                  <Input label="Email Address" id="signup-email" name="email" type="email" placeholder="jane@acme.com" required />
                  <Input label="Password" id="signup-password" name="password" type="password" placeholder="Min. 8 characters" required />
                  <Button type="submit" variant="primary" size="lg" fullWidth loading={signupStatus === 'loading'}>
                    Create Founder Account
                  </Button>
                  <p className={styles.signupNote}>
                    Already have an account?{' '}
                    <a href="/investors" className={styles.signupLink}>Sign in here</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className={styles.section}>
        <div className="container">
          <SectionHeading
            title="Why Founders Choose GoodMatter"
            subtitle="We have been operators and founders ourselves. We know what you need — and we deliver it."
          />
          <div className={styles.valueGrid}>
            {[
              { icon: '🎯', title: 'Curated Investor Access', desc: 'Direct access to 200+ accredited investors actively deploying capital in your sector.' },
              { icon: '📊', title: 'CFO-Grade Financials', desc: 'Professional financial modeling and reporting that makes investors confident and founders credible.' },
              { icon: '🤝', title: 'Strategic Guidance', desc: 'Hands-on advisory from operators who have built and scaled companies in your space.' },
              { icon: '⚡', title: 'Speed to Capital', desc: 'Our streamlined process gets qualified founders in front of investors in weeks, not months.' },
            ].map((item) => (
              <Card key={item.title} variant="default" hoverable>
                <div className={styles.valueCard}>
                  <span className={styles.valueIcon}>{item.icon}</span>
                  <h3 className={styles.valueTitle}>{item.title}</h3>
                  <p className={styles.valueDesc}>{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <SectionHeading
            title="Our Process"
            subtitle="A transparent, founder-friendly process from application to investment."
          />
          <div className={styles.processGrid}>
            {steps.map((step) => (
              <div key={step.number} className={styles.processStep}>
                <span className={styles.processNumber}>{step.number}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className={styles.section}>
        <div className="container">
          <SectionHeading
            title="Impact Studio Services"
            subtitle="Full-stack support for ambitious founders — from financial modeling to investor introductions."
            accent="Impact Studio"
          />
          <div className={styles.servicesGrid}>
            {services.map((svc) => (
              <Card key={svc.title} variant="outlined" hoverable>
                <div className={styles.serviceCard}>
                  <h3 className={styles.serviceTitle}>{svc.title}</h3>
                  <p className={styles.serviceDesc}>{svc.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CFO Plans */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <SectionHeading
            title="Virtual CFO Plans"
            subtitle="Fractional CFO services tailored to your stage. Cancel anytime."
            accent="Virtual CFO"
          />
          <div className={styles.plansGrid}>
            {cfoPlans.map((plan) => (
              <div key={plan.tier} className={`${styles.planCard} ${plan.best ? styles.planBest : ''}`}>
                {plan.best && <span className={styles.planBestBadge}>Most Popular</span>}
                <h3 className={styles.planTier}>{plan.tier}</h3>
                <div className={styles.planPrice}>{plan.price}</div>
                <ul className={styles.planFeatures}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.planFeature}>
                      <span className={styles.planCheck}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant={plan.best ? 'primary' : 'secondary'} fullWidth>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLKBOOK */}
      <section className={styles.blkbook}>
        <div className="container">
          <div className={styles.blkbookInner}>
            <div>
              <Badge color="default">BLKBOOK</Badge>
              <h2 className={styles.blkbookTitle}>Private Deal Sourcing Intelligence</h2>
              <p className={styles.blkbookDesc}>
                BLKBOOK is our proprietary deal sourcing and tracking platform. 
                Founders in our ecosystem get access to our curated database of 
                active investors, their thesis, and real-time availability signals — 
                so you pitch the right people at the right time.
              </p>
              <Button href="/contact" variant="primary" size="lg">Request BLKBOOK Access</Button>
            </div>
            <div className={styles.blkbookVisual}>
              <div className={styles.blkbookCard}>
                <div className={styles.blkbookHeader}>BLKBOOK Intelligence</div>
                {['Active Investors Tracked', 'Sectors Covered', 'Avg. Match Rate', 'Close Rate'].map((label, i) => (
                  <div key={label} className={styles.blkbookRow}>
                    <span>{label}</span>
                    <span className={styles.blkbookValue}>{['847', '32', '68%', '24%'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className={styles.section}>
        <div className="container">
          <div className={styles.applyLayout}>
            <div>
              <SectionHeading
                title="Apply Now"
                subtitle="Tell us about your company. We review all applications and respond within 5 business days."
                align="left"
              />
              <div className={styles.applyBullets}>
                <div className={styles.applyBullet}>
                  <span className={styles.applyBulletIcon}>📬</span>
                  <span>Response within 5 business days</span>
                </div>
                <div className={styles.applyBullet}>
                  <span className={styles.applyBulletIcon}>🤝</span>
                  <span>Free initial screening call</span>
                </div>
                <div className={styles.applyBullet}>
                  <span className={styles.applyBulletIcon}>🔒</span>
                  <span>100% confidential</span>
                </div>
              </div>
            </div>
            <div className={styles.applyForm}>
              {formStatus === 'success' ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Application Submitted!</h3>
                  <p>Thank you for applying. Our team will review your application and reach out within 5 business days.</p>
                  <Button variant="secondary" size="sm" onClick={() => setFormStatus('idle')}>
                    Submit Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  {formStatus === 'error' && (
                    <div className={styles.errorBanner} role="alert">{formError}</div>
                  )}
                  <div className={styles.row}>
                    <Input label="Your Name" id="apply-founder-name" name="founder_name" placeholder="Jane Smith" required />
                    <Input label="Startup Name" id="apply-startup-name" name="startup_name" placeholder="Acme Corp" required />
                  </div>
                  <Input label="Email" id="apply-email" name="email" type="email" placeholder="jane@acme.com" required />
                  <div className={styles.row}>
                    <Input label="Sector" name="sector" as="select" options={sectorOptions} />
                    <Input label="Stage" name="stage" as="select" options={stageOptions} />
                  </div>
                  <Input
                    label="What does your startup do?"
                    name="description"
                    as="textarea"
                    rows={3}
                    placeholder="Briefly describe your product, problem, and traction."
                    required
                  />
                  <Button type="submit" variant="primary" size="lg" fullWidth loading={formStatus === 'loading'}>
                    Submit Application
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
