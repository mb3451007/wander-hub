import Card from './card/Card'
import Confetti from '@/app/icons/Confetti'
import ContactUser from '@/app/icons/ContactUser'
import React from 'react'
import Stay from '@/app/icons/Stay'
import styles from './HowItWorks.module.scss'

export default function HowItWorks() {
  return (
    <div className={styles.howItWorks}>
      <h2 className={styles.howItWorks__title}>How it works</h2>
      <div className={styles.howItWorks__cards}>
        <Card
          sequence={1}
          title={'we collect listings'}
          icon={<Stay />}
          content={
            'Find the best rentals from multiple trusted sources, all in one place'
          }
        />

        <Card
          sequence={2}
          title={'Find Your Perfect Match'}
          icon={<ContactUser />}
          content={
            'Use our filters to quickly discover the property that suits your needs'
          }
        />

        <Card
          sequence={3}
          title={'Match with Owners'}
          icon={<Confetti />}
          content={
            'Easily connect with property owners to finalize your booking'
          }
        />
      </div>
    </div>
  )
}
