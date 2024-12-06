/* eslint-disable sort-imports */
import React from 'react'
import styles from './LabeledInput.module.scss'
import idFromString from '@/app/utils/idFromString'

interface LabeledInputProps {
  label: string
  inputField: JSX.Element
}

export default function LabeledInput(props: LabeledInputProps) {
  return (
    <div className={styles.labeledInput}>
      <label
        className={styles.labeledInput__label}
        htmlFor={`${idFromString(props.label)}-input`}
      >
        {props.label}
      </label>
      {props.inputField}
    </div>
  )
}
