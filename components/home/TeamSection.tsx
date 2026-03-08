import React from 'react'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/SectionHeading'
import styles from './TeamSection.module.css'

const team = [
  {
    name: 'Marcus A. Williams',
    role: 'Managing Partner',
    bio: 'Former VP at Goldman Sachs with 20+ years in private equity. Marcus has deployed over $500M in capital across 80+ companies.',
    initials: 'MW',
  },
  {
    name: 'Priya Nair',
    role: 'Head of Impact Investments',
    bio: 'Ex-McKinsey consultant turned investor. Priya specializes in climate tech and emerging market opportunities with a track record of 3x average returns.',
    initials: 'PN',
  },
  {
    name: 'Jordan Chen',
    role: 'Chief Technology Officer',
    bio: 'Serial entrepreneur and early Stripe engineer. Jordan evaluates technical moats and leads our AI/deep tech thesis with deep operational expertise.',
    initials: 'JC',
  },
  {
    name: 'Amara Osei',
    role: 'Head of Founder Relations',
    bio: 'Built and exited two startups before joining GoodMatter. Amara runs our Impact Studio and supports portfolio founders with hands-on guidance.',
    initials: 'AO',
  },
]

export default function TeamSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          title="The Team Behind GoodMatter"
          subtitle="Operators, investors, and builders who've been on both sides of the table."
          accent="Team"
        />
        <div className={styles.grid}>
          {team.map((member) => (
            <Card key={member.name} variant="outlined" hoverable>
              <div className={styles.card}>
                <div className={styles.avatar}>{member.initials}</div>
                <div>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                </div>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
