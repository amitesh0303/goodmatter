'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { signInFounder, signUpStartup } from './actions'
import styles from './founders-login.module.css'

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function FoundersLoginPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  function validateLoginForm(formData: FormData): Record<string, string> {
    const errors: Record<string, string> = {}
    const email = (formData.get('email') as string) || ''
    const password = (formData.get('password') as string) || ''
    if (!email.trim()) errors.email = 'Email is required.'
    else if (!validateEmail(email)) errors.email = 'Please enter a valid email address.'
    if (!password) errors.password = 'Password is required.'
    return errors
  }

  function validateSignupForm(formData: FormData): Record<string, string> {
    const errors: Record<string, string> = {}
    const fullName = (formData.get('full_name') as string) || ''
    const startupName = (formData.get('startup_name') as string) || ''
    const email = (formData.get('email') as string) || ''
    const password = (formData.get('password') as string) || ''
    if (!fullName.trim() || fullName.trim().length < 2) errors.full_name = 'Please enter your full name (at least 2 characters).'
    if (!startupName.trim()) errors.startup_name = 'Please enter your startup name.'
    if (!email.trim()) errors.email = 'Email is required.'
    else if (!validateEmail(email)) errors.email = 'Please enter a valid email address.'
    if (!password) errors.password = 'Password is required.'
    else if (password.length < 8) errors.password = 'Password must be at least 8 characters.'
    return errors
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage('')
    const formData = new FormData(e.currentTarget)
    const errors = validateLoginForm(formData)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatus('error')
      setMessage('Please fix the errors below.')
      return
    }
    setFieldErrors({})
    setStatus('loading')
    const result = await signInFounder(formData)
    if (result.success) {
      router.push('/founders')
      router.refresh()
    } else {
      setStatus('error')
      setMessage(result.error || 'Login failed. Please try again.')
    }
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage('')
    const formData = new FormData(e.currentTarget)
    const errors = validateSignupForm(formData)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatus('error')
      setMessage('Please fix the errors below.')
      return
    }
    setFieldErrors({})
    setStatus('loading')
    const result = await signUpStartup(formData)
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
    setFieldErrors({})
  }

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <div className={styles.leftBrand}>
            <span className={styles.logoAccent}>Good</span>Matter
          </div>
          <h2 className={styles.leftTitle}>
            Founder portal.<br />Build your future.
          </h2>
          <p className={styles.leftSubtitle}>
            Access GoodMatter&apos;s Impact Studio — submit your deal, request
            investor introductions, and track your application.
          </p>
          <div className={styles.leftFeatures}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Submit your deal to 40,000+ investors</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Request personalised investor introductions</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Track your application status</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Access CFO-grade financial tools</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.formCard}>
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
              {status === 'error' && message && (
                <div className={styles.errorBanner} role="alert">{message}</div>
              )}

              {tab === 'login' ? (
                <>
                  <p className={styles.formSubtitle}>
                    New here?{' '}
                    <button type="button" className={styles.linkBtn} onClick={() => switchTab('signup')}>
                      Create a founder account
                    </button>
                  </p>
                  <form onSubmit={handleLogin} className={styles.form} noValidate>
                    <div>
                      <Input label="Email Address" name="email" type="email" placeholder="jane@startup.com" required />
                      {fieldErrors.email && <p className={styles.fieldError} role="alert">{fieldErrors.email}</p>}
                    </div>
                    <div>
                      <Input label="Password" name="password" type="password" placeholder="••••••••" required />
                      {fieldErrors.password && <p className={styles.fieldError} role="alert">{fieldErrors.password}</p>}
                    </div>
                    <Button type="submit" variant="primary" size="lg" fullWidth loading={status === 'loading'}>
                      Sign In as Founder
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
                    <div className={styles.row}>
                      <div>
                        <Input label="Your Name" name="full_name" placeholder="Jane Smith" required />
                        {fieldErrors.full_name && <p className={styles.fieldError} role="alert">{fieldErrors.full_name}</p>}
                      </div>
                      <div>
                        <Input label="Startup Name" name="startup_name" placeholder="Acme Corp" required />
                        {fieldErrors.startup_name && <p className={styles.fieldError} role="alert">{fieldErrors.startup_name}</p>}
                      </div>
                    </div>
                    <div>
                      <Input label="Email Address" name="email" type="email" placeholder="jane@startup.com" required />
                      {fieldErrors.email && <p className={styles.fieldError} role="alert">{fieldErrors.email}</p>}
                    </div>
                    <div>
                      <Input label="Password" name="password" type="password" placeholder="Min. 8 characters" required />
                      {fieldErrors.password && <p className={styles.fieldError} role="alert">{fieldErrors.password}</p>}
                    </div>
                    <Button type="submit" variant="primary" size="lg" fullWidth loading={status === 'loading'}>
                      Create Founder Account
                    </Button>
                  </form>
                </>
              )}
            </>
          )}

          <p className={styles.disclaimer}>
            Are you an investor?{' '}
            <a href="/investors" className={styles.linkBtn}>Investor login →</a>
          </p>
        </div>
      </div>
    </div>
  )
}
