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
  clearedFilter: { filterType: string; filterKey: string } | null
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
  const [currentPage, setCurrentPage] = useState(1)
  const [listingsPerPage] = useState(10)

  useEffect(() => {
    if (props.clearedFilter) {
      console.log('Filter cleared:--------', props.clearedFilter)

      // Handle cleared filter logic here
      clearFilter(props.clearedFilter.filterKey)
    }
  }, [props.clearedFilter])
  const [clearedFilters, setClearedFilters] = useState({
    bedroom: false,
    bathroom: false,
    additionally: false,
    amenities: false,
  })

  const clearFilter = (filterType: any) => {
    setClearedFilters((prev: any) => ({
      ...prev,
      [filterType]: !prev[filterType], // Toggle the filterType to trigger useEffect
    }))
  }
  // Fetch listings data from the Promise
  useEffect(() => {
    void props.listings.then(setListingsData)
  }, [])

  // Update filters when a filter changes
  const handleFiltersChange = (filterKey: string, newFilters: any) => {
    setFilters((prevState) => {
      return {
        filters: {
          ...prevState.filters,

          [filterKey]: newFilters,
        },
      }
    })
  }

  useEffect(() => {
    console.log('Updated filters:desktop view', filters)
    props.onFiltersChange(filters)
  }, [filters])

  // Handle changes for each specific filter
  const bedroomFilters = (newFilters: any) => {
    // console.log('Bedroom filters:', newFilters);
    if (clearedFilters.bedroom) {
      clearFilter('bedroom')
    }
    handleFiltersChange('bedroom', newFilters)
  }

  const bathroomFilters = (newFilters: any) => {
    // console.log('Bathroom filters:', newFilters);
    if (clearedFilters.bathroom) {
      clearFilter('bathroom')
    }
    handleFiltersChange('bathroom', newFilters)
  }

  const AmenitiesFilters = (newFilters: any) => {
    // console.log('Amenities filters:', newFilters);
    if (clearedFilters.amenities) {
      clearFilter('amenities')
    }
    handleFiltersChange('amenities', newFilters)
  }

  const additionallyFilters = (newFilters: any) => {
    // console.log('Additionally filters:', newFilters);
    if (clearedFilters.additionally) {
      clearFilter('additionally')
    }
    handleFiltersChange('additionally', newFilters)
  }

  // Pagination logic
  const indexOfLastListing = currentPage * listingsPerPage
  const indexOfFirstListing = indexOfLastListing - listingsPerPage
  const currentListings = listingsData.slice(
    indexOfFirstListing,
    indexOfLastListing
  )

  const totalPages = Math.ceil(listingsData.length / listingsPerPage)

  // Change page handler
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className={styles.background}>
      <p className={styles.background__resultsNumber}>
        {props.numberOfResults} Results Found
      </p>
      <div className={styles.background__cardsAndFilter}>
        <div className={styles.background__filterContainer}>
          <div className={styles.background__filterContainer__filter}>
            <BedroomFilters
              handleFilterClear={clearedFilters.bedroom}
              onChange={bedroomFilters}
            />

            <BathroomFilters
              handleFilterClear={clearedFilters.bathroom}
              onChange={bathroomFilters}
            />

            <Amenities
              handleFilterClear={clearedFilters.amenities}
              onChange={AmenitiesFilters}
            />

            <Additionally
              handleFilterClear={clearedFilters.additionally}
              onChange={additionallyFilters}
            />
          </div>
        </div>
        <div className={styles.background__cards}>
          {currentListings.map((l) => (
            <PopularListing
              page="none"
              key={l.id}
              listing={l}
            />
          ))}
        </div>
      </div>
      <CardsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
