import React from 'react'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  accent?: string
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  accent,
  className,
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!accent) return title
    const parts = title.split(accent)
    return parts.map((part, i) => (
      <React.Fragment key={i}>
        {part}
        {i < parts.length - 1 && <span className={styles.accent}>{accent}</span>}
      </React.Fragment>
    ))
  }

  return (
    <div className={`${styles.wrapper} ${styles[align]} ${className || ''}`}>
      <h2 className={styles.title}>{renderTitle()}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}
