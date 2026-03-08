import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import styles from './dashboard.module.css'
import { signOut } from '../actions'

interface Deal {
  id: string
  name: string
  sector: string
  stage: string
  raise_amount: string
  description: string
  status: string
  created_at: string
}

async function getDeals() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) return []
  return (data as Deal[]) || []
}

async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

const statusColor: Record<string, 'green' | 'blue' | 'accent' | 'orange' | 'default'> = {
  active: 'green',
  closing: 'blue',
  new: 'accent',
  funded: 'orange',
}

export default async function DashboardPage() {
  const user = await getUser()
  if (!user) redirect('/investors')

  const deals = await getDeals()

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Deal Dashboard</h1>
            <p className={styles.subtitle}>
              {deals.length > 0
                ? `${deals.length} active opportunit${deals.length === 1 ? 'y' : 'ies'} available`
                : 'Deals are updated weekly. Check back soon.'}
            </p>
          </div>
          <div className={styles.headerActions}>
            <span className={styles.userEmail}>{user.email}</span>
            <form action={signOut}>
              <Button type="submit" variant="secondary" size="sm">Sign Out</Button>
            </form>
          </div>
        </div>

        {deals.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h2>No Active Deals</h2>
            <p>New deals are added regularly. You&apos;ll be notified when new opportunities match your investment profile.</p>
            <Button href="/contact" variant="primary">
              Update My Profile
            </Button>
          </div>
        ) : (
          <div className={styles.grid}>
            {deals.map((deal) => (
              <Link href={`/investors/dashboard/${deal.id}`} key={deal.id} className={styles.dealCard}>
                <div className={styles.dealCardHeader}>
                  <Badge color={statusColor[deal.status] || 'default'}>
                    {deal.status || 'Active'}
                  </Badge>
                  <span className={styles.dealStage}>{deal.stage}</span>
                </div>
                <h3 className={styles.dealName}>{deal.name}</h3>
                <p className={styles.dealSector}>{deal.sector}</p>
                <p className={styles.dealDescription}>{deal.description}</p>
                <div className={styles.dealFooter}>
                  <span className={styles.dealRaise}>Raising {deal.raise_amount}</span>
                  <span className={styles.dealArrow}>View Deal →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
