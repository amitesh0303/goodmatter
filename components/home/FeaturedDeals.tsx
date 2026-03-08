import React from 'react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import styles from './FeaturedDeals.module.css'

const deals = [
  {
    name: 'NovaTech AI',
    sector: 'Artificial Intelligence',
    stage: 'Series A',
    raise: '$4M',
    description: 'Enterprise AI platform automating complex financial workflows with 98% accuracy.',
    metrics: [
      { label: 'ARR', value: '$1.2M' },
      { label: 'MoM Growth', value: '18%' },
      { label: 'Customers', value: '42' },
    ],
    tag: 'green' as const,
    tagLabel: 'Active',
  },
  {
    name: 'GreenShift Logistics',
    sector: 'Climate Tech',
    stage: 'Seed',
    raise: '$2.5M',
    description: 'Zero-emission last-mile delivery network operating in 12 African markets.',
    metrics: [
      { label: 'Revenue', value: '$380K' },
      { label: 'Markets', value: '12' },
      { label: 'Deliveries', value: '50K+' },
    ],
    tag: 'blue' as const,
    tagLabel: 'Closing Soon',
  },
  {
    name: 'HealthBridge',
    sector: 'HealthTech',
    stage: 'Pre-Seed',
    raise: '$1.5M',
    description: 'Remote patient monitoring platform connecting underserved communities to specialist care.',
    metrics: [
      { label: 'Patients', value: '8,400' },
      { label: 'Retention', value: '94%' },
      { label: 'Raised', value: '$500K' },
    ],
    tag: 'accent' as const,
    tagLabel: 'New',
  },
]

export default function FeaturedDeals() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          title="Featured Deals"
          subtitle="A curated snapshot of active opportunities on the platform. Full deal memos available to verified members."
          accent="Featured"
        />
        <div className={styles.grid}>
          {deals.map((deal) => (
            <Card key={deal.name} variant="default" hoverable>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <Badge color={deal.tag}>{deal.tagLabel}</Badge>
                  <Badge color="default">{deal.stage}</Badge>
                </div>
                <h3 className={styles.dealName}>{deal.name}</h3>
                <p className={styles.sector}>{deal.sector}</p>
                <p className={styles.description}>{deal.description}</p>
                <div className={styles.metrics}>
                  {deal.metrics.map(({ label, value }) => (
                    <div key={label} className={styles.metric}>
                      <span className={styles.metricValue}>{value}</span>
                      <span className={styles.metricLabel}>{label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.raise}>Raising {deal.raise}</span>
                  <Button href="/investors" variant="ghost" size="sm">
                    View Deal →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className={styles.cta}>
          <p className={styles.ctaText}>Verified investors access full deal memos, financials, and founder introductions.</p>
          <Button href="/investors" variant="primary" size="lg">
            Access All Deals
          </Button>
        </div>
      </div>
    </section>
  )
}
