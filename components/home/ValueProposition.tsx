import React from 'react'
import { Shield, TrendingUp, Users, Zap } from 'lucide-react'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import styles from './ValueProposition.module.css'

const propositions = [
  {
    icon: Shield,
    title: 'Curated Deal Flow',
    description: 'Every deal on our platform is thoroughly vetted by our investment team. We evaluate fundamentals, team quality, and market opportunity before sharing with members.',
  },
  {
    icon: TrendingUp,
    title: 'Co-Investment Access',
    description: 'Access exclusive co-investment opportunities alongside seasoned institutional investors. We negotiate favorable terms so you can participate from day one.',
  },
  {
    icon: Users,
    title: 'Private Community',
    description: 'Join a network of aligned investors who share insights, due diligence, and deal flow. Our community is built on trust and mutual benefit.',
  },
  {
    icon: Zap,
    title: 'Impact-Driven Returns',
    description: 'We believe the best returns come from companies solving real problems. Our thesis focuses on impact-driven founders building the future.',
  },
]

export default function ValueProposition() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          title="Why GoodMatter?"
          subtitle="We created the investment community we always wanted to be part of — curated, trusted, and aligned with what matters."
          accent="GoodMatter"
        />
        <div className={styles.grid}>
          {propositions.map(({ icon: Icon, title, description }) => (
            <Card key={title} variant="default" hoverable>
              <div className={styles.card}>
                <div className={styles.iconWrap}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
