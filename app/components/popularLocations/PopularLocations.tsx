import PopularLocation from './popularLocation/PopularLocation'
import React from 'react'
import canggu from '@/assets/canggu.jpeg'
import styles from './PopularLocations.module.scss'

export default function PopularLocations() {
  return (
    <div className={styles.popularLocations}>
      <h2 className={styles.popularLocations__title}>Popular location</h2>
      <div className={styles.popularLocations__locations}>
        <PopularLocation
          name={'Canggu'}
          imgUrl={canggu}
          availableListings={30}
        />

        <PopularLocation
          name={'Canggu'}
          imgUrl={canggu}
          availableListings={30}
        />

        <PopularLocation
          name={'Canggu'}
          imgUrl={canggu}
          availableListings={30}
        />

        <PopularLocation
          name={'Canggu'}
          imgUrl={canggu}
          availableListings={30}
        />
      </div>
    </div>
  )
}
