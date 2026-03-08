import React from 'react'
import styles from './Badge.module.css'

type BadgeColor = 'default' | 'accent' | 'green' | 'blue' | 'red' | 'orange'

interface BadgeProps {
  color?: BadgeColor
  children: React.ReactNode
  className?: string
}

export default function Badge({ color = 'default', children, className }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[color]} ${className || ''}`}>
      {children}
    </span>
  )
}
