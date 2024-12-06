import Additionally from '../Additionally/Additionally'
import Amenities from '../Amenities/Amenities'
import BathroomFilters from '../bathroomFilters/bathroomFilters'
import BedroomFilters from '../bedroomFilters/bedroomFilters'
import Card from './card/card'
import CardsPagination from './cardsPagination/cardsPagination'
import PopularListings from '../popularListings/PopularListings'
import listingSampleImage from '../../../assets/apartment-sample.jpeg'

// eslint-disable-next-line sort-imports
import React, { useEffect, useState } from 'react'
import styles from './resultCard.module.scss'
import { ListingDTO } from '@/app/models/dtos/ListingDTO'
import PopularListing from '../popularListings/popularListing/PopularListing'

interface ResultCardProps {
  numberOfResults: number
  onFiltersChange: (filters: any) => void
  listings: Promise<ListingDTO[]>
  page: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function resultCard(props: ResultCardProps) {
  const [filters, setFilters] = useState({
    filters: {
      bedroom: [],
      bathroom: [],
      amenities: [],
      additionally: [],
    },
  })

  const [listingsData, setListingsData] = useState<ListingDTO[]>([])

  // Fetch listings data from the Promise
  useEffect(() => {
    void props.listings.then(setListingsData)
  }, [])

  // Update filters when a filter changes
  const handleFiltersChange = (filterKey: string, newFilters: any) => {
    setFilters((prevState) => {
      return {
        filters: {
          ...prevState.filters, // Retain previous filter values
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          [filterKey]: newFilters, // Update the specific filter key
        },
      }
    })
  }

  useEffect(() => {
    console.log('Updated filters:', filters)
    props.onFiltersChange(filters)
  }, [filters])

  // Handle changes for each specific filter
  const bedroomFilters = (newFilters: any) => {
    // console.log('Bedroom filters:', newFilters);
    handleFiltersChange('bedroom', newFilters)
  }

  const bathroomFilters = (newFilters: any) => {
    // console.log('Bathroom filters:', newFilters);
    handleFiltersChange('bathroom', newFilters)
  }

  const AmenitiesFilters = (newFilters: any) => {
    // console.log('Amenities filters:', newFilters);
    handleFiltersChange('amenities', newFilters)
  }

  const additionallyFilters = (newFilters: any) => {
    // console.log('Additionally filters:', newFilters);
    handleFiltersChange('additionally', newFilters)
  }

  return (
    <div className={styles.background}>
      <p className={styles.background__resultsNumber}>
        {props.numberOfResults} Results Found
      </p>
      <div className={styles.background__cardsAndFilter}>
        <div className={styles.background__filterContainer}>
          <div className={styles.background__filterContainer__filter}>
            <BedroomFilters onChange={bedroomFilters} />

            <BathroomFilters onChange={bathroomFilters} />

            <Amenities onChange={AmenitiesFilters} />

            <Additionally onChange={additionallyFilters} />
          </div>
        </div>
        <div className={styles.background__cards}>
          {listingsData.map((l) => (
            <PopularListing
              page="none"
              key={l.id}
              listing={l}
            />
          ))}
        </div>
      </div>

      <CardsPagination />
    </div>
  )
}
