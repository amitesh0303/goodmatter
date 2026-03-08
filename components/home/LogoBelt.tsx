import React from 'react'
import styles from './LogoBelt.module.css'

const logos = [
  'Andreessen Horowitz',
  'Sequoia Capital',
  'Y Combinator',
  'Bessemer Ventures',
  'Tiger Global',
  'Lightspeed',
  'GV',
  'Accel',
  'Index Ventures',
  'Greylock',
]

export default function LogoBelt() {
  return (
    <section className={styles.section}>
      <p className={styles.label}>Trusted by investors from</p>
      <div className={styles.beltWrapper} aria-hidden="true">
        <div className={styles.belt}>
          {[...logos, ...logos].map((logo, i) => (
            <span key={i} className={styles.logoItem}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
