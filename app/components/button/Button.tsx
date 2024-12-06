import React from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  text: string
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export default function Button(props: ButtonProps) {
  return (
    <button
      className={styles.button}
      title={props.text}
      {...props}
    >
      {props.text}
    </button>
  )
}
