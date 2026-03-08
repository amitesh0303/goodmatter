'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import { requestIntroduction } from './actions'
import styles from './deal.module.css'

export default function DealDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dealId = params.id as string

  const [showIntroForm, setShowIntroForm] = useState(false)
  const [introMessage, setIntroMessage] = useState('')
  const [introStatus, setIntroStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [introError, setIntroError] = useState('')

  async function handleIntroRequest(e: React.FormEvent) {
    e.preventDefault()
    setIntroStatus('loading')
    setIntroError('')

    const result = await requestIntroduction(dealId, introMessage)

    if (result.success) {
      setIntroStatus('success')
    } else {
      setIntroStatus('error')
      setIntroError(result.error || 'Request failed.')
    }
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.nav}>
          <button onClick={() => router.back()} className={styles.backBtn}>
            ← Back to Dashboard
          </button>
        </div>

        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.dealHeader}>
              <div className={styles.dealHeaderTop}>
                <Badge color="green">Active</Badge>
                <Badge color="default">Series A</Badge>
              </div>
              <h1 className={styles.dealName}>Deal Details</h1>
              <p className={styles.dealSector}>Technology</p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Executive Summary</h2>
              <p className={styles.sectionBody}>
                This deal has been curated by the GoodMatter investment team following 
                rigorous due diligence. Full deal memo, financial models, and cap table 
                information are available below.
              </p>
              <p className={styles.sectionBody}>
                Members may request a direct introduction to the founding team after 
                reviewing the materials. All introductions are facilitated by GoodMatter 
                and tracked for member protection.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Investment Thesis</h2>
              <p className={styles.sectionBody}>
                Our investment thesis centers on the company&apos;s ability to capture 
                a large and underserved market with a technically differentiated solution. 
                The founding team has demonstrated exceptional product velocity and 
                early customer traction validates product-market fit.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Key Metrics</h2>
              <div className={styles.metricsGrid}>
                {[
                  { label: 'Annual Recurring Revenue', value: '$1.2M' },
                  { label: 'Month-over-Month Growth', value: '18%' },
                  { label: 'Gross Margin', value: '74%' },
                  { label: 'Net Revenue Retention', value: '128%' },
                  { label: 'Paying Customers', value: '42' },
                  { label: 'CAC Payback Period', value: '8 months' },
                ].map(({ label, value }) => (
                  <div key={label} className={styles.metric}>
                    <span className={styles.metricValue}>{value}</span>
                    <span className={styles.metricLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Risks & Considerations</h2>
              <ul className={styles.riskList}>
                <li>Market is competitive with well-funded incumbents</li>
                <li>Revenue concentration risk — top 3 customers represent 40% of ARR</li>
                <li>Key-person dependency on founding CTO</li>
                <li>Regulatory environment is evolving in key markets</li>
              </ul>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>Deal Terms</h3>
              <div className={styles.termsList}>
                <div className={styles.term}>
                  <span className={styles.termLabel}>Round Size</span>
                  <span className={styles.termValue}>$4,000,000</span>
                </div>
                <div className={styles.term}>
                  <span className={styles.termLabel}>Pre-Money Valuation</span>
                  <span className={styles.termValue}>$16,000,000</span>
                </div>
                <div className={styles.term}>
                  <span className={styles.termLabel}>Instrument</span>
                  <span className={styles.termValue}>Preferred Equity</span>
                </div>
                <div className={styles.term}>
                  <span className={styles.termLabel}>Minimum Check</span>
                  <span className={styles.termValue}>$25,000</span>
                </div>
                <div className={styles.term}>
                  <span className={styles.termLabel}>Pro-Rata Rights</span>
                  <span className={styles.termValue}>Yes, for $50K+</span>
                </div>
                <div className={styles.term}>
                  <span className={styles.termLabel}>Closing Date</span>
                  <span className={styles.termValue}>Rolling Close</span>
                </div>
              </div>
            </div>

            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>Request Introduction</h3>
              {introStatus === 'success' ? (
                <div className={styles.introSuccess}>
                  <p>✓ Introduction requested! Our team will connect you with the founders within 48 hours.</p>
                </div>
              ) : (
                <>
                  <p className={styles.introDescription}>
                    Interested in this deal? Request a direct introduction to the founding team.
                  </p>
                  {!showIntroForm ? (
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => setShowIntroForm(true)}
                    >
                      Request Introduction
                    </Button>
                  ) : (
                    <form onSubmit={handleIntroRequest} className={styles.introForm}>
                      {introStatus === 'error' && (
                        <div className={styles.introError}>{introError}</div>
                      )}
                      <Input
                        label="Message (optional)"
                        as="textarea"
                        rows={3}
                        placeholder="Tell the founder why you're interested..."
                        value={introMessage}
                        onChange={(e) => setIntroMessage(e.target.value)}
                      />
                      <div className={styles.introActions}>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => setShowIntroForm(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          size="sm"
                          loading={introStatus === 'loading'}
                        >
                          Submit Request
                        </Button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>

            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>Documents</h3>
              <div className={styles.docList}>
                {['Investment Memo', 'Financial Model', 'Pitch Deck', 'Cap Table'].map((doc) => (
                  <button key={doc} className={styles.docItem}>
                    <span>📄</span>
                    <span>{doc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
