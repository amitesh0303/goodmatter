'use client'
import React from 'react'
import styles from './Input.module.css'

interface SelectOption {
  value: string
  label: string
}

interface InputProps {
  label?: string
  error?: string
  as?: 'input' | 'textarea' | 'select'
  options?: SelectOption[]
  id?: string
  name?: string
  type?: string
  placeholder?: string
  required?: boolean
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  rows?: number
  className?: string
  disabled?: boolean
}

export default function Input({
  label,
  error,
  as = 'input',
  options = [],
  id,
  name,
  type = 'text',
  placeholder,
  required,
  value,
  defaultValue,
  onChange,
  rows = 4,
  className,
  disabled,
}: InputProps) {
  const inputId = id || name

  const inputClasses = [
    styles.input,
    error ? styles.hasError : '',
    className || '',
  ].filter(Boolean).join(' ')

  const renderInput = () => {
    if (as === 'textarea') {
      return (
        <textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          rows={rows}
          disabled={disabled}
          className={`${inputClasses} ${styles.textarea}`}
        />
      )
    }
    if (as === 'select') {
      return (
        <select
          id={inputId}
          name={name}
          required={required}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
          disabled={disabled}
          className={`${inputClasses} ${styles.select}`}
        >
          <option value="">Select an option...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )
    }
    return (
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        disabled={disabled}
        className={inputClasses}
      />
    )
  }

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}
      {renderInput()}
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  )
}
