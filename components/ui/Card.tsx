import React from 'react'
import styles from './Card.module.css'

type CardVariant = 'default' | 'glass' | 'outlined'
type CardPadding = 'sm' | 'md' | 'lg'

interface CardProps {
  variant?: CardVariant
  padding?: CardPadding
  hoverable?: boolean
  children: React.ReactNode
  className?: string
}

export default function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  children,
  className,
}: CardProps) {
  const classes = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    hoverable ? styles.hoverable : '',
    className || '',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {children}
    </div>
  )
}
