'use client'
import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { submitContactForm } from './actions'
import styles from './contact.module.css'

const inquiryOptions = [
  { value: 'investor_inquiry', label: 'Investor Inquiry' },
  { value: 'founder_application', label: 'Founder Application' },
  { value: 'impact_studio', label: 'Impact Studio Services' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'general', label: 'General Inquiry' },
]

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    const result = await submitContactForm(formData)

    if (result.success) {
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } else {
      setStatus('error')
      setErrorMsg(result.error || 'Something went wrong.')
    }
  }

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>Get in Touch</span>
            <h1 className={styles.title}>Contact GoodMatter</h1>
            <p className={styles.subtitle}>
              Whether you&apos;re an investor exploring membership, a founder looking to raise, 
              or a potential partner — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.info}>
              <h2 className={styles.infoTitle}>How can we help?</h2>
              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <span className={styles.infoItemTitle}>Investor Inquiries</span>
                  <p className={styles.infoItemText}>
                    Learn about membership, current deal flow, and how to join our investment community.
                  </p>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoItemTitle}>Founder Applications</span>
                  <p className={styles.infoItemText}>
                    Submit your company for consideration. We review all applications and respond within 5 business days.
                  </p>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoItemTitle}>Impact Studio Services</span>
                  <p className={styles.infoItemText}>
                    Virtual CFO, financial modeling, investor relations, and strategic advisory services.
                  </p>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoItemTitle}>Partnerships</span>
                  <p className={styles.infoItemText}>
                    We collaborate with accelerators, family offices, and strategic partners. Let&apos;s talk.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.formCard}>
              {status === 'success' ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>Message Received</h3>
                  <p>Thank you for reaching out. Our team will respond within 2 business days.</p>
                  <Button variant="secondary" size="sm" onClick={() => setStatus('idle')}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form} noValidate>
                  <h2 className={styles.formTitle}>Send a Message</h2>

                  {status === 'error' && (
                    <div className={styles.errorBanner} role="alert">
                      {errorMsg}
                    </div>
                  )}

                  <div className={styles.row}>
                    <Input
                      label="Full Name"
                      name="name"
                      placeholder="Jane Smith"
                      required
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="jane@company.com"
                      required
                    />
                  </div>

                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />

                  <Input
                    label="Inquiry Type"
                    name="inquiry_type"
                    as="select"
                    options={inquiryOptions}
                    required
                  />

                  <Input
                    label="Message"
                    name="message"
                    as="textarea"
                    placeholder="Tell us what's on your mind..."
                    required
                    rows={5}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={status === 'loading'}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className={styles.contactInfoSection}>
        <div className="container">
          <div className={styles.contactInfoGrid}>
            <div className={styles.contactInfoBlock}>
              <h3 className={styles.contactInfoTitle}>Contact</h3>
              <p className={styles.contactInfoText}>For institutional partnerships and inquiries:</p>
              <a href="mailto:goodmatter05@gmail.com" className={styles.contactEmail}>goodmatter05@gmail.com</a>
            </div>
            <div className={styles.disclaimerBlock}>
              <h3 className={styles.contactInfoTitle}>Disclaimer</h3>
              <div className={styles.disclaimerText}>
                <p>GoodMatter is a private platform for curated deal visibility.</p>
                <p>All information is provided for informational purposes only and does not constitute investment advice, solicitation, or an offer to buy or sell securities.</p>
                <p>Users are responsible for conducting their own due diligence.</p>
                <p>Access may be restricted to accredited or qualified investors in applicable jurisdictions.</p>
                <p>GoodMatter does not guarantee the accuracy or completeness of submitted information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
