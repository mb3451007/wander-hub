import Additionally  from '../Additionally/Additionally'
import Amenities  from '../Amenities/Amenities'
import BathroomFilters  from '../bathroomFilters/bathroomFilters'
import BedroomFilters  from '../bedroomFilters/bedroomFilters'
import Card  from './card/card'
import CardsPagination  from './cardsPagination/cardsPagination'
import PopularListings from '../popularListings/PopularListings'
import listingSampleImage from '../../../assets/apartment-sample.jpeg'

// eslint-disable-next-line sort-imports
import React, { useEffect, useState } from 'react'
import styles from './resultCard.module.scss'


interface ResultCardProps {
  numberOfResults: number;
  onFiltersChange: (filters: any) => void;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function resultCard({ numberOfResults, onFiltersChange }: ResultCardProps ) {
  const [filters, setFilters] = useState({
    filters: {
      bedroom: [],
      bathroom: [],
      amenities: [],
      additionally: [],
    },
  });

  // Update filters when a filter changes
  const handleFiltersChange = (filterKey: string, newFilters: any) => {
    setFilters((prevState) => {
      return {
        filters: {
          ...prevState.filters, // Retain previous filter values
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          [filterKey]: newFilters, // Update the specific filter key
        },
      };
    });

  };

  useEffect(() => {
    console.log('Updated filters:', filters);
    onFiltersChange(filters)
  }, [filters]);

  // Handle changes for each specific filter
  const bedroomFilters = (newFilters: any) => {
    // console.log('Bedroom filters:', newFilters);
    handleFiltersChange('bedroom', newFilters);
  };

  const bathroomFilters = (newFilters: any) => {
    // console.log('Bathroom filters:', newFilters);
    handleFiltersChange('bathroom', newFilters);
  };

  const AmenitiesFilters = (newFilters: any) => {
    // console.log('Amenities filters:', newFilters);
    handleFiltersChange('amenities', newFilters);
  };

  const additionallyFilters = (newFilters: any) => {
    // console.log('Additionally filters:', newFilters);
    handleFiltersChange('additionally', newFilters);
  };

  const testListing: ListingDTO = {
    id: '1',
    imageURL: listingSampleImage.src,
    isFavorite: false,
    listingType: 'apartment',
    title: 'The Wave Studios',
    roomCount: 2,
    bathroomCount: 2,
    location: 'Canggu',
    lowestOffer: {
      price: {
        currencyISO: 'USD',
        value: 50,
      },
      duration: 'day',
    },
  }

  const listings: Promise<ListingDTO[]> = Promise.resolve(
    [1, 2, 3, 4, 5, 6].map((i) => {
      return {
        ...testListing,
        id: `${i}`,
      }
    })
  )
  
  return (
    <div className={styles.background}>
      <p className={styles.background__resultsNumber}>{numberOfResults} Results Found</p>
      <div className={styles.background__cardsAndFilter}>
        <div className={styles.background__filterContainer}>
          <div className={styles.background__filterContainer__filter}>

            <BedroomFilters onChange={bedroomFilters}/>

            <BathroomFilters onChange={bathroomFilters}/>

            <Amenities onChange={AmenitiesFilters}/>

            <Additionally onChange={additionallyFilters}/>

          </div>
        </div>
        <div className={styles.background__cards}>
          <PopularListings listings={listings} />
        </div>
      </div>

      <CardsPagination />
    </div>
  )
}
