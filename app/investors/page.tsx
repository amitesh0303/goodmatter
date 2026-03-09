'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { signIn, signUp } from './actions'
import styles from './investors.module.css'

export default function InvestorsPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)
    if (result.success) {
      router.push('/investors/dashboard')
      router.refresh()
    } else {
      setStatus('error')
      setMessage(result.error || 'Login failed. Please try again.')
    }
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    const formData = new FormData(e.currentTarget)
    const result = await signUp(formData)
    if (result.success) {
      setStatus('success')
      setMessage(result.message || 'Account created! Check your email to confirm.')
    } else {
      setStatus('error')
      setMessage(result.error || 'Sign up failed. Please try again.')
    }
  }

  function switchTab(next: 'login' | 'signup') {
    setTab(next)
    setStatus('idle')
    setMessage('')
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
            Join our community to access exclusive deal flow, member-only analysis,
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
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === 'login' ? styles.tabActive : ''}`}
              onClick={() => switchTab('login')}
              type="button"
            >
              Sign In
            </button>
            <button
              className={`${styles.tab} ${tab === 'signup' ? styles.tabActive : ''}`}
              onClick={() => switchTab('signup')}
              type="button"
            >
              Sign Up
            </button>
          </div>

          {status === 'success' ? (
            <div className={styles.successBanner} role="status">
              <div className={styles.successIcon}>✓</div>
              <p>{message}</p>
              <Button variant="secondary" size="sm" onClick={() => switchTab('login')}>
                Back to Sign In
              </Button>
            </div>
          ) : (
            <>
              {status === 'error' && (
                <div className={styles.errorBanner} role="alert">{message}</div>
              )}

              {tab === 'login' ? (
                <>
                  <p className={styles.formSubtitle}>
                    New here?{' '}
                    <button type="button" className={styles.linkBtn} onClick={() => switchTab('signup')}>
                      Create an account
                    </button>
                  </p>
                  <form onSubmit={handleLogin} className={styles.form} noValidate>
                    <Input label="Email Address" name="email" type="email" placeholder="you@company.com" required />
                    <Input label="Password" name="password" type="password" placeholder="••••••••" required />
                    <div className={styles.forgot}>
                      <a href="#" className={styles.link}>Forgot password?</a>
                    </div>
                    <Button type="submit" variant="primary" size="lg" fullWidth loading={status === 'loading'}>
                      Sign In
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <p className={styles.formSubtitle}>
                    Already have an account?{' '}
                    <button type="button" className={styles.linkBtn} onClick={() => switchTab('login')}>
                      Sign in
                    </button>
                  </p>
                  <form onSubmit={handleSignup} className={styles.form} noValidate>
                    <Input label="Full Name" name="full_name" placeholder="Jane Smith" required />
                    <Input label="Email Address" name="email" type="email" placeholder="you@company.com" required />
                    <Input label="Password" name="password" type="password" placeholder="Min. 8 characters" required />
                    <Button type="submit" variant="primary" size="lg" fullWidth loading={status === 'loading'}>
                      Create Account
                    </Button>
                  </form>
                </>
              )}
            </>
          )}

          <p className={styles.disclaimer}>
            Access is restricted to verified accredited investors.
            Unauthorized access attempts are logged and reported.
          </p>
        </div>
      </div>
    </div>
  )
}
