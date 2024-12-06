'use client'

import { useEffect, useState } from 'react'
import { ListingDTO } from '@/app/models/dtos/ListingDTO'

import PopularListing from './popularListing/PopularListing'
import React from 'react'
import styles from './PopularListings.module.scss'

interface PopularListingsProps {
  listings: Promise<ListingDTO[]>
  page: string
}

export default function PopularListings(props: PopularListingsProps) {
  const [listings, setListings] = useState<ListingDTO[]>([])

  useEffect(() => {
    void props.listings.then(setListings)
  }, [])

  return (
    <div className={styles.popularListings}>
      <h2 className={styles.popularListings__title}>Popular stays</h2>
      <div className={styles.popularListings__listings}>
        {listings.map((l) => (
          <PopularListing
            page="home"
            key={l.id}
            listing={l}
          />
        ))}
      </div>
    </div>
  )
}
