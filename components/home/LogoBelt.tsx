import React from 'react'
import styles from './LogoBelt.module.css'

const logos = [
  { name: 'Andreessen Horowitz', abbr: 'a16z', color: '#6B7CFF' },
  { name: 'Sequoia Capital', abbr: 'SEQ', color: '#FF6B35' },
  { name: 'Y Combinator', abbr: 'YC', color: '#FB651E' },
  { name: 'Bessemer Ventures', abbr: 'BVP', color: '#1A73E8' },
  { name: 'Tiger Global', abbr: 'TG', color: '#0A0A0A' },
  { name: 'Lightspeed', abbr: 'LSV', color: '#7B2EFF' },
  { name: 'Google Ventures', abbr: 'GV', color: '#34A853' },
  { name: 'Accel', abbr: 'ACC', color: '#2B5CE6' },
  { name: 'Index Ventures', abbr: 'IDX', color: '#E63946' },
  { name: 'Greylock', abbr: 'GRL', color: '#1B4FCC' },
]

export default function LogoBelt() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>Trusted by investors from</p>
      <div className={styles.beltWrapper} aria-hidden="true">
        <div className={styles.belt}>
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className={styles.logoItem}>
              <span
                className={styles.logoMark}
                style={{ backgroundColor: logo.color }}
              >
                {logo.abbr}
              </span>
              <span className={styles.logoName}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
