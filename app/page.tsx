/* eslint-disable sort-imports */
import BasicSearch from './components/basicSearch/BasicSearch'
import Footer from './components/footer/Footer'
import { ListingDTO } from './models/dtos/ListingDTO'
import React from 'react'
import SearchContainer from './components/searchContainer/SearchContainer'
import image1 from '../assets/search-results-card-img.jpeg'
import image2 from '../assets/apartment-sample.jpeg'
import image3 from '../assets/apartment.jpeg'
import image4 from '../assets/bike.jpeg'
import image5 from '../assets/room.jpeg'
import styles from './page.module.scss'
import PopularListings from './components/popularListings/PopularListings'
import HowItWorks from './components/howItWorks/HowItWorks'
import LookingFor from './components/lookingFor/LookingFor'
import PopularLocations from './components/popularLocations/PopularLocations'

export default function Home() {
  const testListing: ListingDTO = {
    id: '1',
    images: [
      `${image2.src}`,
      `${image3.src}`,
      `${image4.src}`,
      `${image5.src}`,
    ],
    isFavorite: false,
    listingType: 'apartment',
    title: 'The Wave Studios',
    roomCount: 2,
    bathroomCount: 2,
    location: 'Canggu',
    description:
      'Our apartment features a sleek and modern design, with clean lines and upscale finishes that create a welcoming and elegant ambiance.',
    lowestOffer: {
      price: {
        currencyISO: 'USD',
        value: 50,
      },
      duration: 'day',
    },
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const listings: Promise<ListingDTO[]> = Promise.resolve(
    [1, 2, 3, 4, 5, 6].map((i) => {
      return {
        ...testListing,
        id: `${i}`,
      }
    })
  )

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__container}>
        <SearchContainer searchForm={<BasicSearch />} />
        <PopularListings
          page="home"
          listings={listings}
        />
        <LookingFor />
        <HowItWorks />
        <PopularLocations />
        <Footer />
      </div>
    </div>
  )
}
