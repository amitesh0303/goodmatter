'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { signIn } from './actions'
import styles from './investors.module.css'

export default function InvestorsLoginPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)

    if (result.success) {
      router.push('/investors/dashboard')
      router.refresh()
    } else {
      setStatus('error')
      setErrorMsg(result.error || 'Login failed. Please try again.')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <div className={styles.leftBrand}>
            <span className={styles.logoAccent}>Good</span>Matter
          </div>
          <h2 className={styles.leftTitle}>
            Private access<br />for accredited investors.
          </h2>
          <p className={styles.leftSubtitle}>
            Log in to access exclusive deal flow, member-only analysis, 
            and co-investment opportunities.
          </p>
          <div className={styles.leftFeatures}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Curated deal memos and financial models</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Direct founder introduction requests</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Portfolio performance tracking</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Community forums and co-investor network</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.formCard}>
          <h1 className={styles.formTitle}>Investor Login</h1>
          <p className={styles.formSubtitle}>
            Don&apos;t have an account?{' '}
            <a href="/contact" className={styles.link}>Apply for access</a>
          </p>

          {status === 'error' && (
            <div className={styles.errorBanner} role="alert">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@company.com"
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
            <div className={styles.forgot}>
              <a href="#" className={styles.link}>Forgot password?</a>
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={status === 'loading'}
            >
              Sign In
            </Button>
          </form>

          <p className={styles.disclaimer}>
            Access is restricted to verified accredited investors. 
            Unauthorized access attempts are logged and reported.
          </p>
        </div>
      </div>
    </div>
  )
}
