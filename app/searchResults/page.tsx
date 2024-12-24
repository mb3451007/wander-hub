'use client'

import React, { useEffect, useState } from 'react'
import Bike from '../icons/Bike'
import BikeBasicSearch, {
  BikeSearchParameters,
} from '../components/basicSearch/bikeBasicSearch/BikeBasicSearch'
import FilterBox from '../components/filterBox/filterBox'
import Footer from '../components/footer/Footer'
import Header from '../components/header/Header'
import HousingBasicSearch, {
  HousingSearchParameters,
} from '../components/basicSearch/housingBasicSearch/HousingBasicSearch'
import ResultCard from '../components/resultCard/resultCard'
import SortAndFilter from '../components/sortAndFilter/sortAndFilter'
import FilterModal from '../components/FilterModal/filterModal'
import SortModal from '../components/SortModal/sortModal'
import ApartmentModal from '../components/ApartmentModal/apartmentModal'
import Stay from '../icons/Stay'
import Tabbed from '../components/tabbed/Tabbed'
import styles from './searchResults.module.scss'
import { ListingDTO } from '../models/dtos/ListingDTO'
import image1 from '../../assets/search-results-card-img.jpeg'
import image2 from '../../assets/apartment-sample.jpeg'
import image3 from '../../assets/apartment.jpeg'
import image4 from '../../assets/bike.jpeg'
import image5 from '../../assets/room.jpeg'
import Close from '../icons/Close'
import Pound from '../icons/Pound'
import CustomDropdown from '../components/customDropdown/customDropdown'

const SearchResults = () => {
  const [clearSort, setClearSort] = useState('')
  const [sortClicked, setSortClicked] = useState(false)
  const [isFilterModalOpen, setFilterIsModalOpen] = useState(false)
  const [isApartmentModalOpen, setApartmentModalOpen] = useState(false)

  const [isSortModalOpen, setSortModalOpen] = useState(false)

  const toggleModal = () => {
    setFilterIsModalOpen((prev) => !prev)
  }

  const toggleSortModal = () => {
    setSortModalOpen((prev) => !prev)
  }

  const toggleApartmentsModal = () => {
    setApartmentModalOpen((prev) => !prev)
  }

  const [clearedFilter, setClearedFilter] = useState<{
    filterType: string
    filterKey: string
  } | null>(null)
  const [filters, setFilters] = useState<any>({
    filters: {
      additionally: [],
      amenities: [],
      bathroom: [],
      bedroom: [],
      location: [],
      stay: [],
      price: { from: '', to: '' },
    },
    sortBy: '',
    sort: {
      date: '',
      location: '',
      price: { from: '', to: '' },
    },
  })

  const handleFiltersChange = (newFilters: any) => {
    // if (newFilters === 'clear') {
    //   // Clear all filters by resetting to their default values
    //   const resetFilters = {
    //     filters: {
    //       additionally: [],
    //       amenities: [],
    //       bathroom: [],
    //       bedroom: [],
    //     },
    //     sort: {
    //       date: '',
    //       location: '',
    //       price: { from: '', to: '' },
    //       stay: '',
    //     },
    //   }

    //   setFilters(resetFilters)
    //   return
    // }
    const updatedFilters = {
      ...filters,
      filters: {
        ...filters.filters,
        ...newFilters.filters,
      },
      sortBy: newFilters.sortBy || filters.sortBy,
      sort: {
        ...filters.sort,
        ...newFilters.sort,
      },
    }

    setFilters(updatedFilters)
  }

  useEffect(() => {
    console.log(filters, '-------------new filters')
  }, [filters])

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
    description:
      'Our apartment features a sleek and modern design, with clean lines and upscale finishes that create a welcoming and elegant ambiance.',
    location: 'Canggu',
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
    [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22,
    ].map((i) => {
      return {
        ...testListing,
        id: `${i}`,
      }
    })
  )

  const [sortDel, setSortDel] = useState(false)

  const setHousingParameters = (
    houseSearchParameters: HousingSearchParameters
  ) => {
    console.log('Housing parameters', houseSearchParameters)
  }

  const setBikeParameters = (bikeSearchParameters: BikeSearchParameters) => {
    console.log('Bike search parameters', bikeSearchParameters)
  }

  const handleSortFields = (sortFields: any) => {
    const updatedSort = { ...filters, sort: sortFields }
    setFilters(updatedSort)
  }

  const handleFilterClear = (filterType: string, filterKey: string) => {
    const updatedFilters = { ...filters }
    console.log('key', filterKey)
    console.log('key', filterType)

    if (filterType === 'filters') {
      console.log(filterKey)
      if (Array.isArray(updatedFilters.filters[filterKey])) {
        updatedFilters.filters[filterKey] = []
      } else if (filterKey === 'sortBy' || filterKey === 'clearAll') {
        updatedFilters.sortBy = ''
      } else {
        delete updatedFilters.filters[filterKey]
      }
    } else if (filterType === 'sort') {
      setSortDel(true)
      if (filterKey === 'price') {
        setClearSort(filterKey)
        updatedFilters.sort[filterKey] = { from: '', to: '' }
      } else {
        setClearSort(filterKey)
        updatedFilters.sort[filterKey] = ''
      }
    }

    console.log('updatedFilters after delete', updatedFilters)

    setFilters(updatedFilters)

    setClearedFilter({ filterType, filterKey })
  }

  //count total filters selected
  const calculateTotalSelected = () => {
    const filterValues = filters.filters // Assuming this contains the data
    let totalSelected = 0

    const keysToCount = ['bathroom', 'bedroom', 'additionally', 'amenities']

    keysToCount.forEach((key) => {
      if (filterValues[key] && Array.isArray(filterValues[key])) {
        totalSelected += filterValues[key].length
      }
    })

    if (
      filterValues.price &&
      (filterValues.price.from !== '' || filterValues.price.to !== '')
    ) {
      totalSelected += 1
    }

    return totalSelected
  }
  const isAnyFilterFilled = () => {
    const allFilters = filters.filters

    // Check if any of the filter fields are not empty
    return (
      allFilters.additionally.length > 0 ||
      allFilters.amenities.length > 0 ||
      allFilters.bathroom.length > 0 ||
      allFilters.bedroom.length > 0 ||
      allFilters.location.length > 0 ||
      allFilters.stay.length > 0 ||
      allFilters.price.from !== '' ||
      allFilters.price.to !== '' ||
      filters.sortBy !== ''
    )
  }

  // useEffect(() => {
  //   if (clearSort) {
  //     // Perform any required actions here if needed
  //     console.log(`clearSort updated: ${clearSort}`);
  //     setTimeout(() => setClearSort(null), 0); // Reset clearSort after render
  //   }
  // }, [clearSort]);

  return (
    <>
      <div
        style={{
          display: isFilterModalOpen || isApartmentModalOpen ? 'none' : 'block',
        }}
      >
        <Header />
        <div className={styles.page}>
          <div className={styles.page__homeBreadcrumb}>
            {/* Breadcrumb Navigation */}
            <div className={styles.page__homeBreadcrumb__homeLogo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M1 11.157C1 8.86862 1 7.72441 1.5192 6.77587C2.0384 5.82734 2.98695 5.23863 4.88403 4.06125L6.88403 2.81999C8.88939 1.57541 9.8921 0.953125 11 0.953125C12.1079 0.953125 13.1106 1.57541 15.116 2.81999L17.116 4.06124C19.0131 5.23863 19.9616 5.82734 20.4808 6.77587C21 7.72441 21 8.86862 21 11.157V12.6781C21 16.5789 21 18.5294 19.8284 19.7412C18.6569 20.9531 16.7712 20.9531 13 20.9531H9C5.22876 20.9531 3.34315 20.9531 2.17157 19.7412C1 18.5294 1 16.5789 1 12.6781V11.157Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className={styles.page__homeBreadcrumb__home}>Home</div>
            <div className={styles.page__homeBreadcrumb__resultsOptions}>
              Search Options Results
            </div>
          </div>

          <Tabbed
            tabs={[
              {
                name: 'Stay',
                icon: <Stay />,
                tab: (
                  <HousingBasicSearch
                    onChange={setHousingParameters}
                    key={'stay'}
                  />
                ),
              },
              {
                name: 'Bike',
                icon: <Bike />,
                tab: (
                  <BikeBasicSearch
                    onChange={setBikeParameters}
                    key={'bike'}
                  />
                ),
              },
            ]}
          />

          <FilterBox
            filters={filters}
            toggleModal={toggleApartmentsModal}
          />
          <SortAndFilter
            count={calculateTotalSelected()}
            toggleSortModal={toggleSortModal}
            toggleModal={toggleModal}
            clearedFilter={clearedFilter}
            onChange={(updatedFilters: any) =>
              handleFiltersChange(updatedFilters)
            }
          />

          {/* Display Filters */}
          <div className={styles.page__filterContainer}>
            {Object.entries(filters.filters).map(([key, value]) =>
              Array.isArray(value) && value.length > 0 ? (
                <div
                  className={styles.page__filterContainer__filterBox}
                  key={key}
                >
                  <div
                    className={
                      styles.page__filterContainer__filterBox__filterLabel
                    }
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div
                    className={
                      styles.page__filterContainer__filterBox__filterResult
                    }
                  >
                    {value.join(', ')}
                  </div>
                  <div
                    className={
                      styles.page__filterContainer__filterBox__crossIcon
                    }
                    onClick={() => handleFilterClear('filters', key)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M9.37456 1.11788C9.17931 0.922619 8.86271 0.922619 8.66746 1.11788L5.02026 4.76508L1.37309 1.11788C1.17783 0.922619 0.86124 0.922619 0.66598 1.11788C0.470715 1.31314 0.470715 1.62973 0.66598 1.82499L4.31316 5.47218L0.66599 9.11933C0.470725 9.31463 0.470725 9.63118 0.66599 9.82648C0.86125 10.0217 1.17784 10.0217 1.3731 9.82648L5.02026 6.17928L8.66746 9.82648C8.86271 10.0217 9.17931 10.0217 9.37456 9.82648C9.56981 9.63118 9.56981 9.31463 9.37456 9.11938L5.72736 5.47218L9.37456 1.82499C9.56981 1.62973 9.56981 1.31314 9.37456 1.11788Z"
                        fill="black"
                        fillOpacity="0.3"
                      />
                    </svg>
                  </div>
                </div>
              ) : null
            )}
            {/* {Object.entries(filters.sort).map(([key, value]) =>
              value && key !== 'price' ? ( // Add a check for key !== 'price'
                <div
                  className={styles.page__filterContainer__filterBox}
                  key={key}
                  style={{
                    display: value ? 'flex' : 'none',
                  }}
                >
                  <div
                    className={
                      styles.page__filterContainer__filterBox__filterLabel
                    }
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div
                    className={
                      styles.page__filterContainer__filterBox__filterResult
                    }
                  >
                    {typeof value === 'object'
                      ? Object.entries(value)
                          .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                          .join(', ')
                      : value}
                  </div>
                  <div
                    className={
                      styles.page__filterContainer__filterBox__crossIcon
                    }
                    onClick={() => {
                      handleFilterClear('sort', key)
                      setSortClicked((prev) => !prev)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M9.37456 1.11788C9.17931 0.922619 8.86271 0.922619 8.66746 1.11788L5.02026 4.76508L1.37309 1.11788C1.17783 0.922619 0.86124 0.922619 0.66598 1.11788C0.470715 1.31314 0.470715 1.62973 0.66598 1.82499L4.31316 5.47218L0.66599 9.11933C0.470725 9.31463 0.470725 9.63118 0.66599 9.82648C0.86125 10.0217 1.17784 10.0217 1.3731 9.82648L5.02026 6.17928L8.66746 9.82648C8.86271 10.0217 9.17931 10.0217 9.37456 9.82648C9.56981 9.63118 9.56981 9.31463 9.37456 9.11938L5.72736 5.47218L9.37456 1.82499C9.56981 1.62973 9.56981 1.31314 9.37456 1.11788Z"
                        fill="black"
                        fillOpacity="0.3"
                      />
                    </svg>
                  </div>
                </div>
              ) : null
            )} */}
            {filters.sortBy !== '' && (
              <div className={styles.page__filterContainer__filterBox}>
                <div
                  className={
                    styles.page__filterContainer__filterBox__filterLabel
                  }
                >
                  Sort By
                </div>
                <div
                  className={
                    styles.page__filterContainer__filterBox__filterResult
                  }
                >
                  {filters.sortBy}
                </div>
                <div
                  className={styles.page__filterContainer__filterBox__crossIcon}
                  onClick={() => {
                    handleFilterClear('filters', 'sortBy')
                    setSortClicked((prev) => !prev)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M9.37456 1.11788C9.17931 0.922619 8.86271 0.922619 8.66746 1.11788L5.02026 4.76508L1.37309 1.11788C1.17783 0.922619 0.86124 0.922619 0.66598 1.11788C0.470715 1.31314 0.470715 1.62973 0.66598 1.82499L4.31316 5.47218L0.66599 9.11933C0.470725 9.31463 0.470725 9.63118 0.66599 9.82648C0.86125 10.0217 1.17784 10.0217 1.3731 9.82648L5.02026 6.17928L8.66746 9.82648C8.86271 10.0217 9.17931 10.0217 9.37456 9.82648C9.56981 9.63118 9.56981 9.31463 9.37456 9.11938L5.72736 5.47218L9.37456 1.82499C9.56981 1.62973 9.56981 1.31314 9.37456 1.11788Z"
                      fill="black"
                      fillOpacity="0.3"
                    />
                  </svg>
                </div>
              </div>
            )}

            {filters.filters.price?.from != '' && filters.price?.to != '' ? (
              <div className={styles.page__filterContainer__filterBox}>
                <div
                  className={
                    styles.page__filterContainer__filterBox__filterLabel
                  }
                >
                  Price
                </div>
                <div
                  className={
                    styles.page__filterContainer__filterBox__filterResult
                  }
                >
                  {`₱${filters.filters.price.from} - ₱${filters.filters.price.to}`}
                </div>
                <div
                  className={styles.page__filterContainer__filterBox__crossIcon}
                  onClick={() => {
                    handleFilterClear('filter', 'price')
                    setSortClicked((prev) => !prev)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M9.37456 1.11788C9.17931 0.922619 8.86271 0.922619 8.66746 1.11788L5.02026 4.76508L1.37309 1.11788C1.17783 0.922619 0.86124 0.922619 0.66598 1.11788C0.470715 1.31314 0.470715 1.62973 0.66598 1.82499L4.31316 5.47218L0.66599 9.11933C0.470725 9.31463 0.470725 9.63118 0.66599 9.82648C0.86125 10.0217 1.17784 10.0217 1.3731 9.82648L5.02026 6.17928L8.66746 9.82648C8.86271 10.0217 9.17931 10.0217 9.37456 9.82648C9.56981 9.63118 9.56981 9.31463 9.37456 9.11938L5.72736 5.47218L9.37456 1.82499C9.56981 1.62973 9.56981 1.31314 9.37456 1.11788Z"
                      fill="black"
                      fillOpacity="0.3"
                    />
                  </svg>
                </div>
              </div>
            ) : null}
            {isAnyFilterFilled() && (
              <div className={styles.page__filterContainer__filterBox}>
                <div
                  className={
                    styles.page__filterContainer__filterBox__filterLabel
                  }
                >
                  Clear All
                </div>

                <div
                  className={styles.page__filterContainer__filterBox__crossIcon}
                  onClick={() => {
                    handleFilterClear('filters', 'clearAll')
                    setSortClicked((prev) => !prev)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M9.37456 1.11788C9.17931 0.922619 8.86271 0.922619 8.66746 1.11788L5.02026 4.76508L1.37309 1.11788C1.17783 0.922619 0.86124 0.922619 0.66598 1.11788C0.470715 1.31314 0.470715 1.62973 0.66598 1.82499L4.31316 5.47218L0.66599 9.11933C0.470725 9.31463 0.470725 9.63118 0.66599 9.82648C0.86125 10.0217 1.17784 10.0217 1.3731 9.82648L5.02026 6.17928L8.66746 9.82648C8.86271 10.0217 9.17931 10.0217 9.37456 9.82648C9.56981 9.63118 9.56981 9.31463 9.37456 9.11938L5.72736 5.47218L9.37456 1.82499C9.56981 1.62973 9.56981 1.31314 9.37456 1.11788Z"
                      fill="black"
                      fillOpacity="0.3"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* ResultCard Component */}
          <ResultCard
            page="none"
            listings={listings}
            numberOfResults={3}
            onFiltersChange={(updatedFilters) =>
              handleFiltersChange(updatedFilters)
            }
            clearedFilter={clearedFilter}
          />
        </div>

        <Footer />
      </div>

      {isFilterModalOpen && (
        <FilterModal
          filters={filters}
          onFiltersChange={(updatedFilters: any) =>
            handleFiltersChange(updatedFilters)
          }
          toggleModal={toggleModal}
        />
      )}

      {isSortModalOpen && (
        <SortModal
          filters={filters.sortBy}
          toggleModal={toggleSortModal}
          onFiltersChange={(updatedFilters: any) =>
            handleFiltersChange(updatedFilters)
          }
        />
      )}

      {isApartmentModalOpen && (
        <ApartmentModal
          initialFilters={filters.filters.stay}
          toggleModal={toggleApartmentsModal}
          onFiltersChange={(updatedFilters: any) =>
            handleFiltersChange(updatedFilters)
          }
        />
      )}
    </>
  )
}

export default SearchResults
