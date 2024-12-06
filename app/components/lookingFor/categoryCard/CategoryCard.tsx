import React from 'react'

import styles from './CategoryCard.module.scss'

interface CategoryCardProps {
  name: string
  imageUrl: string
  description: string
}

export default function CategoryCard(props: CategoryCardProps) {
  return (
    <div className={styles.categoryCard}>
      <h3
        className={styles.categoryCard__name}
        style={{ backgroundImage: `url(${props.imageUrl})` }}
      >
        {props.name}
      </h3>
      <p className={styles.categoryCard__description}>{props.description}</p>
      <p className={styles.categoryCard__link}>See More</p>
    </div>
  )
}
