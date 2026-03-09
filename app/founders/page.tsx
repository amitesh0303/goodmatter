'use client'
import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { submitFounderApplication, signUpStartup, submitIntroductionRequest } from './actions'

const INVESTOR_COUNT = '40,000+'
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
  { value: 'pre_revenue', label: 'Pre-Revenue' },
  { value: 'pre_seed', label: 'Pre-Seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series_a', label: 'Series A' },
  { value: 'series_b', label: 'Series B+' },
  { value: 'growth', label: 'Growth Stage' },
]

const geographyOptions = [
  { value: 'india', label: 'India' },
  { value: 'sea', label: 'Southeast Asia' },
  { value: 'mena', label: 'MENA' },
  { value: 'usa', label: 'USA' },
  { value: 'europe', label: 'Europe' },
  { value: 'global', label: 'Global' },
  { value: 'other', label: 'Other' },
]

export default function FoundersPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  const [dealType, setDealType] = useState('')
  const [priorityTier, setPriorityTier] = useState('')
  const [signupStatus, setSignupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [signupMessage, setSignupMessage] = useState('')
  const [introStatus, setIntroStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [introError, setIntroError] = useState('')

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

  async function handleIntroSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIntroStatus('loading')
    setIntroError('')
    const formData = new FormData(e.currentTarget)
    const result = await submitIntroductionRequest(formData)
    if (result.success) {
      setIntroStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } else {
      setIntroStatus('error')
      setIntroError(result.error || 'Something went wrong.')
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
              GoodMatter&apos;s Impact Studio provides founders with capital access,
              financial infrastructure, and strategic support to go from vision to venture-backed reality.
            </p>
            <div className={styles.heroCtas}>
              <Button href="#deal-form" variant="primary" size="lg">Submit Your Deal</Button>
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
              { icon: '🎯', title: 'Curated Investor Access', desc: `Direct access to ${INVESTOR_COUNT} investors actively deploying capital in your sector.` },
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
            subtitle="Fractional CFO services tailored to your stage. Get compliance handled while you focus on growth."
            accent="Virtual CFO"
          />
          <div className={styles.plansGrid}>
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <h3 className={styles.planTier}>Plan 1 — Starter</h3>
                <div className={styles.planPrice}>₹10,000 – ₹25,000<span>/month</span></div>
                <div className={styles.planStage}>Pre-Revenue to Very Early Stage (0–25 Lakh ARR)</div>
              </div>
              <p className={styles.planTagline}>Just starting out? We keep you legal and your books clean.</p>
              <ul className={styles.planFeatures}>
                {[
                  'GST registration + monthly GSTR-1 & GSTR-3B filing',
                  'TDS deduction, payment & quarterly returns (Form 26Q)',
                  'PF & ESIC monthly payments + ECR filing',
                  'Monthly bookkeeping (Tally / Zoho Books)',
                  'Bank reconciliation (up to 2 accounts)',
                  'Basic MIS report — P&L and cash position, every month',
                  'ITR filing (once a year)',
                  'LLP / ROC annual compliance filings',
                  'GST-compliant invoice templates',
                ].map(f => (
                  <li key={f} className={styles.planFeature}><span className={styles.planCheck}>✓</span>{f}</li>
                ))}
              </ul>
              <Button href="/contact" variant="secondary" fullWidth>Get Started</Button>
            </div>

            <div className={`${styles.planCard} ${styles.planBest}`}>
              <span className={styles.planBestBadge}>Most Popular</span>
              <div className={styles.planHeader}>
                <h3 className={styles.planTier}>Plan 2 — Growth</h3>
                <div className={styles.planPrice}>₹25,000 – ₹50,000<span>/month</span></div>
                <div className={styles.planStage}>Early Stage (25 Lakh – 5 Crore ARR)</div>
              </div>
              <p className={styles.planTagline}>You&apos;re generating revenue. Now you need real finance, not just compliance.</p>
              <ul className={styles.planFeatures}>
                {[
                  'Everything in Starter, plus:',
                  'Accounts payable — vendor invoice checking and payment batching',
                  'Working capital tracking and monthly cash flow statement',
                  'Advance tax computation + payment (quarterly)',
                  'Detailed MIS report with department-level P&L, KPIs, and commentary',
                  'Quarterly financial statements (P&L, Balance Sheet, Cash Flow)',
                  'Annual financial statements (ready for your auditor)',
                  'Fixed asset register maintenance',
                  'Accounting policy document',
                  'Accounting software setup and configuration',
                ].map(f => (
                  <li key={f} className={styles.planFeature}><span className={styles.planCheck}>✓</span>{f}</li>
                ))}
              </ul>
              <Button href="/contact" variant="primary" fullWidth>Get Started</Button>
            </div>

            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <h3 className={styles.planTier}>Plan 3 — CFO Partner</h3>
                <div className={styles.planPrice}>₹50,000 – ₹1,00,000<span>/month</span></div>
                <div className={styles.planStage}>Growth Stage (5 Crore+)</div>
              </div>
              <p className={styles.planTagline}>You&apos;re scaling fast and need financial intelligence, not just reporting.</p>
              <ul className={styles.planFeatures}>
                {[
                  'Everything in Growth, plus:',
                  'Monthly budget vs. actuals comparison',
                  'Rolling 12-month financial forecast, updated every month',
                  'Scenario planning — what happens if revenue drops 20%?',
                  'Unit economics: CAC, LTV, contribution margin, payback period',
                  'Pricing and discount analysis for new products or deals',
                  'Manpower & utilisation tracking',
                  'Revenue leakage audit — find billing gaps and fix them',
                  'Fundraising prep — investor-ready financial model and data room support',
                  'Board report preparation',
                ].map(f => (
                  <li key={f} className={styles.planFeature}><span className={styles.planCheck}>✓</span>{f}</li>
                ))}
              </ul>
              <Button href="/contact" variant="secondary" fullWidth>Get Started</Button>
            </div>

            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <h3 className={styles.planTier}>Plan 4 — Fundraising CFO</h3>
                <div className={styles.planPrice}>₹75,000+<span>/month</span></div>
                <div className={styles.planStage}>Pre-Series A / Series A / High-Growth Stage</div>
              </div>
              <p className={styles.planTagline}>You&apos;re raising a round or closing a large deal. We go all-in with you.</p>
              <ul className={styles.planFeatures}>
                {[
                  'Everything in CFO Partner, plus:',
                  'Investor due diligence support — answer every financial question fast',
                  'SHA, SSA, ESOP policy drafting and review',
                  'FEMA / RBI compliance filings (FC-GPR, FC-TRS for foreign investment)',
                  'Contract review — client contracts, vendor agreements, partnership deals',
                  'NDA, offer letters, IP assignment agreements — all handled',
                  'Legal notice handling and dispute support',
                  'MSA and SOW drafting for enterprise client deals',
                ].map(f => (
                  <li key={f} className={styles.planFeature}><span className={styles.planCheck}>✓</span>{f}</li>
                ))}
              </ul>
              <Button href="/contact" variant="secondary" fullWidth>Get Started</Button>
            </div>
          </div>

          {/* One-time & Add-on Services */}
          <div className={styles.oneTimeSection}>
            <h3 className={styles.oneTimeSectionTitle}>One-Time Setup &amp; Add-On Services</h3>
            <div className={styles.oneTimeGrid}>
              {[
                { title: 'Company Registration (Pvt Ltd)', price: '₹15,000', note: 'one-time', stage: 'One-Time Setup', items: ['Certificate of Incorporation', 'MOA & AOA drafting', 'CIN allotment', "Founders' agreements", 'ESOP policy draft'] },
                { title: 'LLP Registration', price: '₹8,000', note: 'one-time', stage: 'One-Time Setup', items: ['LLP agreement drafting', 'LLPIN allotment', 'Designated partner certificates'] },
                { title: 'GST Registration', price: '₹5,000', note: 'one-time', stage: 'One-Time Setup', items: ['GSTIN certificate', 'HSN/SAC code mapping for your products/services'] },
                { title: 'Fundraising Legal Docs (SHA, SSA)', price: '₹45,000', note: 'one-time', stage: 'Fundraising & Growth', items: ['Shareholders Agreement (SHA)', 'Share Subscription Agreement (SSA)', 'Term sheet review'] },
                { title: 'ESOP Policy Setup', price: '₹22,000', note: 'one-time', stage: 'Fundraising & Growth', items: ['ESOP plan document', 'Grant letters', 'Vesting schedule', 'Accounting treatment guidance'] },
                { title: 'Revenue Leakage Audit', price: '₹15,000 – ₹30,000', note: 'per engagement', stage: 'Add-On Service', items: ['Billing gap identification', 'Unbilled work analysis', 'Collection efficiency review', 'Recommendations report'] },
                { title: 'Accounting Software Setup', price: '₹12,000', note: 'one-time', stage: 'One-Time Setup', items: ['Software configuration with your company structure', 'Chart of accounts setup', 'Opening balance entry', 'Team access configuration'] },
              ].map(svc => (
                <div key={svc.title} className={styles.oneTimeCard}>
                  <div className={styles.oneTimeCardHeader}>
                    <h4 className={styles.oneTimeTitle}>{svc.title}</h4>
                    <div className={styles.oneTimePrice}>{svc.price} <span>({svc.note})</span></div>
                    <div className={styles.oneTimeStage}>{svc.stage}</div>
                  </div>
                  <ul className={styles.oneTimeItems}>
                    {svc.items.map(item => <li key={item}><span>✓</span>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className={styles.section}>
        <div className="container">
          <SectionHeading
            title="Premium Advisory Services"
            subtitle="Investor-ready deliverables crafted by financial experts and storytellers."
            accent="Premium"
          />
          <div className={styles.premiumGrid}>
            <div className={styles.premiumCard}>
              <div className={styles.premiumBadge}>Pitch Deck</div>
              <h3 className={styles.premiumTitle}>Pitch Deck Creation</h3>
              <div className={styles.premiumPrice}>₹30,000</div>
              <p className={styles.premiumNote}>After 15 slides, pricing increases depending on the number of slides.</p>
              <ul className={styles.premiumItems}>
                {[
                  'Company Overview', 'Problem Statement', 'Solution', 'Product / Service Overview',
                  'Market Opportunity (TAM, SAM, SOM)', 'Business Model', 'Revenue Streams',
                  'Financial Projection', 'Use of Funds', 'Unit Economics', 'Market Strategy',
                  'Competitive Analysis', 'Founder Introduction', 'Funding Requirement', 'Contact Details',
                ].map(item => (
                  <li key={item}><span>✓</span>{item}</li>
                ))}
              </ul>
              <Button href="/contact" variant="primary" fullWidth>Get Started</Button>
            </div>

            <div className={styles.premiumCard}>
              <div className={styles.premiumBadge}>Startup</div>
              <h3 className={styles.premiumTitle}>Financial Modelling + Valuation</h3>
              <div className={styles.premiumPrice}>₹55,000</div>
              <p className={styles.premiumNote}>Investor-Ready Financial Model &amp; Valuation for Startups</p>
              <ul className={styles.premiumItems}>
                {[
                  'Revenue & cost projections', 'Full 3-statement financial model',
                  'DCF & Comparable valuation', 'WACC calculation', 'Break-even analysis',
                  'Cap table', 'Funding requirement analysis', 'Scenario analysis', 'Summary sheet',
                ].map(item => (
                  <li key={item}><span>✓</span>{item}</li>
                ))}
              </ul>
              <Button href="/contact" variant="primary" fullWidth>Get Started</Button>
            </div>

            <div className={styles.premiumCard}>
              <div className={styles.premiumBadge}>Running Company</div>
              <h3 className={styles.premiumTitle}>Financial Modelling + Valuation</h3>
              <div className={styles.premiumPrice}>₹65,000</div>
              <p className={styles.premiumNote}>Full-depth model for revenue-generating businesses</p>
              <ul className={styles.premiumItems}>
                {[
                  'Historical Analysis', 'Assumption Sheet', 'Revenue & Cost Projections',
                  'Full 3-Statement Model (IS, BS, CF)', 'Working Capital Analysis',
                  'Capex & Depreciation', 'Comparable & Ratio Analysis', 'Unit Metrics',
                  'Break-Even Analysis', 'DCF & WACC Valuation', 'Comparable Valuation',
                  'Cap Table', 'Funding Requirement Analysis', 'Scenario Analysis', 'Summary Sheet',
                ].map(item => (
                  <li key={item}><span>✓</span>{item}</li>
                ))}
              </ul>
              <Button href="/contact" variant="primary" fullWidth>Get Started</Button>
            </div>

            <div className={`${styles.premiumCard} ${styles.premiumCombo}`}>
              <div className={styles.premiumBadge}>Combo — Startup</div>
              <h3 className={styles.premiumTitle}>Financial Model + Valuation + Pitch Deck</h3>
              <div className={styles.premiumPrice}>₹80,000</div>
              <ul className={styles.premiumItems}>
                {['Complete Financial Model', 'Valuation', 'Full Pitch Deck (Up to 15 slides)'].map(item => (
                  <li key={item}><span>✓</span>{item}</li>
                ))}
              </ul>
              <Button href="/contact" variant="primary" fullWidth>Get Started</Button>
            </div>

            <div className={`${styles.premiumCard} ${styles.premiumCombo}`}>
              <div className={styles.premiumBadge}>Combo — Running Company</div>
              <h3 className={styles.premiumTitle}>Financial Model + Valuation + Pitch Deck</h3>
              <div className={styles.premiumPrice}>₹90,000</div>
              <ul className={styles.premiumItems}>
                {['Complete Financial Model', 'Valuation', 'Full Pitch Deck (Up to 15 slides)'].map(item => (
                  <li key={item}><span>✓</span>{item}</li>
                ))}
              </ul>
              <Button href="/contact" variant="primary" fullWidth>Get Started</Button>
            </div>
          </div>
        </div>
      </section>

      {/* One-Time Events & Matchmaking */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <SectionHeading
            title="Live Sessions & Matchmaking"
            subtitle="High-signal conversations. No cold outreach. Real intent. Faster momentum."
            accent="Matchmaking"
          />
          <div className={styles.eventsGrid}>
            <div className={styles.eventCard}>
              <div className={styles.eventIcon}>🎯</div>
              <h3 className={styles.eventTitle}>One-Time Events</h3>
              <div className={styles.eventPrice}>$25 – $99</div>
              <p className={styles.eventDesc}>60-minute curated 1:1 sessions. No decks, no long pitches.</p>
              <p className={styles.eventNote}>Best for early fundraising, partnerships, or fast customer discovery.</p>
            </div>

            <div className={styles.eventCard}>
              <div className={styles.eventIcon}>🔄</div>
              <h3 className={styles.eventTitle}>Memberships</h3>
              <div className={styles.eventPrice}>$99 – $795/month</div>
              <p className={styles.eventDesc}>Ongoing access to sessions + priority matching.</p>
              <p className={styles.eventNote}>Best for active fundraising or sales momentum.</p>
            </div>

            <div className={styles.eventCard}>
              <div className={styles.eventIcon}>🏢</div>
              <h3 className={styles.eventTitle}>Private / Corporate Sessions</h3>
              <div className={styles.eventPrice}>$2,500 – $100,000 avg deal</div>
              <p className={styles.eventDesc}>Custom matchmaking sessions for B2B acquisition.</p>
              <p className={styles.eventNote}>Used by SaaS, platforms, and service companies.</p>
            </div>

            <div className={`${styles.eventCard} ${styles.eventCardHighlight}`}>
              <div className={styles.eventIcon}>💰</div>
              <h3 className={styles.eventTitle}>Founder-Led Investor Matchmaking</h3>
              <div className={styles.eventPrice}>$1,000 per founder</div>
              <p className={styles.eventDesc}>Face-time with real investors. No cold outreach. We run a curated outreach campaign on your behalf and invite thesis-aligned investors into a live matchmaking session.</p>
              <ul className={styles.eventFeatures}>
                <li>Investors choose who they meet</li>
                <li>You choose too — matches are mutual</li>
                <li>Up to 20 structured 1:1 convos in one hour</li>
                <li>Built for pre-seed &amp; seed founders actively raising</li>
              </ul>
              <p className={styles.eventDisclaimer}>No guarantees — just high-intent investor conversations.</p>
            </div>

            <div className={`${styles.eventCard} ${styles.eventCardHighlight}`}>
              <div className={styles.eventIcon}>🤝</div>
              <h3 className={styles.eventTitle}>Private Matchmaking Sessions</h3>
              <div className={styles.eventPrice}>Pilot: $2,500 | Monthly: $5,000 | Quarterly: $7,500</div>
              <p className={styles.eventDesc}>High-signal 1:1 conversations. We replace long sales cycles with curated, live sessions where the right people meet in short, structured rounds.</p>
              <ul className={styles.eventFeatures}>
                <li>Filtered by role, industry, and intent</li>
                <li>Mutual opt-in matching</li>
                <li>No pitching, no pressure</li>
                <li>20–60 curated conversations in one hour</li>
                <li>50–70% follow-up rates</li>
              </ul>
              <p className={styles.eventNote}>Use it for pipeline, partnerships, or industry positioning.</p>
            </div>
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
                    <span className={styles.blkbookValue}>{[INVESTOR_COUNT, '32', '68%', '24%'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Submission Form */}
      <section id="deal-form" className={styles.section}>
        <div className="container">
          <div className={styles.applyLayout}>
            <div>
              <SectionHeading
                title="Submit Your Deal"
                subtitle="Tell us about your company and funding requirements. We review all submissions and respond within 5 business days."
                align="left"
              />
              <div className={styles.applyBullets}>
                <div className={styles.applyBullet}>
                  <span className={styles.applyBulletIcon}>📬</span>
                  <span>Response within 5 business days</span>
                </div>
                <div className={styles.applyBullet}>
                  <span className={styles.applyBulletIcon}>👥</span>
                  <span>Access to {INVESTOR_COUNT} investors</span>
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
                  <h3>Deal Submitted!</h3>
                  <p>Thank you for submitting your deal. Our team will review and reach out within 5 business days.</p>
                  <Button variant="secondary" size="sm" onClick={() => setFormStatus('idle')}>
                    Submit Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  {formStatus === 'error' && (
                    <div className={styles.errorBanner} role="alert">{formError}</div>
                  )}

                  <div className={styles.formSectionLabel}>Company Information</div>

                  <div className={styles.row}>
                    <Input label="Company Name" id="company-name" name="startup_name" placeholder="Acme Corp" required />
                    <Input label="Contact No" id="contact-no" name="contact_no" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                  <Input
                    label="Company Description"
                    name="description"
                    as="textarea"
                    rows={3}
                    placeholder="Briefly describe your product, problem, and traction."
                    required
                  />
                  <Input label="Website" id="website" name="website" type="url" placeholder="https://yourcompany.com" />

                  <div className={styles.row}>
                    <Input label="Sector" name="sector" as="select" options={sectorOptions} required />
                    <Input label="Stage" name="stage" as="select" options={stageOptions} required />
                  </div>
                  <div className={styles.row}>
                    <Input label="Geography" name="geography" as="select" options={geographyOptions} required />
                    <Input label="Revenue (optional)" id="revenue" name="revenue" placeholder="e.g. 50L ARR" />
                  </div>
                  <div className={styles.row}>
                    <Input label="Valuation" id="valuation" name="valuation" placeholder="e.g. 10Cr" required />
                    <Input label="Capital Raising Amount" id="raise-amount" name="raise_amount" placeholder="e.g. 2Cr" required />
                  </div>

                  <div className={styles.formSectionLabel}>Deal Type <span className={styles.requiredStar}>*</span></div>
                  <div className={styles.dealTypeGrid}>
                    {['Equity', 'Debt', 'M&A', 'Private Equity', 'Others'].map(type => (
                      <label key={type} className={`${styles.dealTypeOption} ${dealType === type ? styles.dealTypeSelected : ''}`}>
                        <input
                          type="radio"
                          name="deal_type"
                          value={type}
                          checked={dealType === type}
                          onChange={() => setDealType(type)}
                          required
                          className={styles.dealTypeRadio}
                        />
                        {type}
                      </label>
                    ))}
                  </div>

                  <div className={styles.formSectionLabel}>Contact &amp; Submission</div>
                  <div className={styles.row}>
                    <Input label="Email" id="apply-email" name="email" type="email" placeholder="founder@company.com" />
                    <Input label="Partner/Scout Name (optional)" id="partner-name" name="partner_name" placeholder="Referral name" />
                  </div>

                  <div className={styles.fileUploadField}>
                    <label className={styles.fileUploadLabel}>
                      Pitch Deck <span className={styles.fileUploadNote}>(PDF, PPT, PPTX accepted)</span>
                    </label>
                    <input
                      type="file"
                      name="pitch_deck"
                      accept=".pdf,.ppt,.pptx"
                      className={styles.fileUploadInput}
                    />
                  </div>

                  <div className={styles.priorityTierBox}>
                    <div className={styles.priorityTierTitle}>🚀 Priority Tier</div>
                    <p className={styles.priorityTierDesc}>
                      Priority Tier is for founders who want <strong>active outreach to {INVESTOR_COUNT} investors</strong>, not just a listing on a platform with 100+ investor access.
                      <strong> ₹25,000/month</strong>
                    </p>
                    <div className={styles.priorityTierOptions}>
                      <label className={`${styles.priorityOption} ${priorityTier === 'subscribe' ? styles.prioritySelected : ''}`}>
                        <input
                          type="radio"
                          name="priority_tier"
                          value="subscribe"
                          checked={priorityTier === 'subscribe'}
                          onChange={() => setPriorityTier('subscribe')}
                          className={styles.dealTypeRadio}
                        />
                        ✅ I want to subscribe
                      </label>
                      <label className={`${styles.priorityOption} ${priorityTier === 'no_subscribe' ? styles.prioritySelected : ''}`}>
                        <input
                          type="radio"
                          name="priority_tier"
                          value="no_subscribe"
                          checked={priorityTier === 'no_subscribe'}
                          onChange={() => setPriorityTier('no_subscribe')}
                          className={styles.dealTypeRadio}
                        />
                        ❌ I don&apos;t want to subscribe
                      </label>
                    </div>
                  </div>

                  <Input label="Your Name" id="apply-founder-name" name="founder_name" placeholder="Jane Smith" required />

                  <Button type="submit" variant="primary" size="lg" fullWidth loading={formStatus === 'loading'}>
                    Submit Deal
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Investor Introduction Request Form */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="intro-request">
        <div className="container">
          <div className={styles.introLayout}>
            <div>
              <SectionHeading
                title="Investor Introduction Request"
                subtitle="Already connected with GoodMatter? Submit an introduction request to engage with a specific deal."
                align="left"
              />
            </div>
            <div className={styles.introForm}>
              {introStatus === 'success' ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Request Submitted!</h3>
                  <p>We will review your introduction request and get back to you shortly.</p>
                  <Button variant="secondary" size="sm" onClick={() => setIntroStatus('idle')}>
                    Submit Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleIntroSubmit} className={styles.form} noValidate>
                  {introStatus === 'error' && (
                    <div className={styles.errorBanner} role="alert">{introError}</div>
                  )}
                  <div className={styles.row}>
                    <Input label="Investor Name" id="inv-name" name="investor_name" placeholder="John Doe" required />
                    <Input label="Organization" id="inv-org" name="organization" placeholder="Acme Ventures" required />
                  </div>
                  <Input label="Email" id="inv-email" name="inv_email" type="email" placeholder="john@acmeventures.com" required />
                  <div className={styles.row}>
                    <Input label="Deal Name" id="deal-name" name="deal_name" placeholder="Company / Deal name" required />
                    <Input label="Intended Ticket Size" id="ticket-size" name="ticket_size" placeholder="e.g. 50L - 1Cr" required />
                  </div>
                  <Button type="submit" variant="primary" size="lg" fullWidth loading={introStatus === 'loading'}>
                    Submit Introduction Request
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
