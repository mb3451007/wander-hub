import React from 'react'
import styles from './Card.module.scss'

interface CardProps {
  sequence: number
  title: string
  content: string
  icon: JSX.Element
}

const format = Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 })

export default function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.card__sequenceAndIcon}>
        <h3 className={styles.card__sequenceAndIcon__sequence}>
          {format.format(props.sequence)}
        </h3>
        <div className={styles.card__sequenceAndIcon__icon}>{props.icon}</div>
      </span>

      <h2 className={styles.card__title}>{props.title}</h2>
      <p className={styles.card__content}>{props.content}</p>
    </div>
  )
}
