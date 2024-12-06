import React from 'react'
import { StaticImageData } from 'next/image'
import styles from './PopularLocation.module.scss'

interface PopularLocationProps {
  name: string
  imgUrl: StaticImageData
  availableListings: number
}

export default function PopularLocation(props: PopularLocationProps) {
  return (
    <div
      className={styles.popularLocation}
      style={{ backgroundImage: `url(${props.imgUrl.src})` }}
    >
      <h3 className={styles.popularLocation__locationName}>{props.name}</h3>
      <p className={styles.popularLocation__availableListings}>
        {props.availableListings} options
      </p>
    </div>
  )
}
