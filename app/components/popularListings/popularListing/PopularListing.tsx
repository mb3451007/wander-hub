import Bed from '@/app/icons/Bed'
import Image from 'next/image'
import { ListingDTO } from '@/app/models/dtos/ListingDTO'
import Location from '@/app/icons/Location'
import React, {useEffect} from 'react'
import Shower from '@/app/icons/Shower'
import styles from './PopularListing.module.scss'

interface PopularListingProps {
  listing: ListingDTO
}

const titleCase = (s: string) => `${s[0].toUpperCase()}${s.substring(1)}`

const baseCurrencyFormat: Intl.NumberFormatOptions = {
  currency: 'USD',
  style: 'currency',
  currencySign: 'accounting',
  currencyDisplay: 'symbol',
  minimumFractionDigits: 0,
}

const currencyFormaters = {
  USD: Intl.NumberFormat('en-US', {
    ...baseCurrencyFormat,
    currency: 'USD',
  }),
  IDR: Intl.NumberFormat('en-US', {
    ...baseCurrencyFormat,
    currency: 'USD',
  }),
}

export default function PopularListing(props: PopularListingProps) {
  
  return (
    <div className={styles.popularListing}>
      <Image
        className={styles.popularListing__image}
        width={390}
        height={358}
        alt={props.listing.title}
        src={props.listing.imageURL}
      />
      <h4 className={styles.popularListing__title}>
        {`${props.listing.title} - ${titleCase(props.listing.listingType)}`}
      </h4>

      <div className={styles.popularListing__details}>
        <div className={styles.popularListing__details__detail}>
          {Bed()}
          <p>{props.listing.roomCount} rooms</p>
        </div>

        <div className={styles.popularListing__details__detail}>
          {Shower()}
          <p>{props.listing.bathroomCount} bathrooms</p>
        </div>

        <div className={styles.popularListing__details__detail}>
          {Location()}
          <p>{props.listing.location}</p>
        </div>

        <div className={styles.popularListing__details__lowestOffer}>
          From{' '}
          {currencyFormaters[
            props.listing.lowestOffer.price.currencyISO
          ].format(props.listing.lowestOffer.price.value)}
          /{props.listing.lowestOffer.duration}
        </div>
      </div>
    </div>
  )
}
