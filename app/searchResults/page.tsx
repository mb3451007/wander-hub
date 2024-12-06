'use client'

import React, { useState } from 'react';
import Bike from '../icons/Bike';
import BikeBasicSearch, { BikeSearchParameters } from '../components/basicSearch/bikeBasicSearch/BikeBasicSearch';
import FilterBox from '../components/filterBox/filterBox';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import HousingBasicSearch, { HousingSearchParameters } from '../components/basicSearch/housingBasicSearch/HousingBasicSearch';
import ResultCard from '../components/resultCard/resultCard';
import SortAndFilter from '../components/sortAndFilter/sortAndFilter';
import Stay from '../icons/Stay';
import Tabbed from '../components/tabbed/Tabbed';
import styles from './searchResults.module.scss';

const SearchResults = () => {
  const [clearSort, setClearSort] = useState('')
  const [filters, setFilters] = useState<any>({
    filters: {
      additionally: [],
      amenities: [],
      bathroom: [],
      bedroom: [],
    },
    sort: {
      date: '',
      location: '',
      price: { from: '', to: '' },
      stay: '',
    },
  });

  const [sortDel, setSortDel] = useState(false)

  const setHousingParameters = (houseSearchParameters: HousingSearchParameters) => {
    console.log('Housing parameters', houseSearchParameters);
  };

  const setBikeParameters = (bikeSearchParameters: BikeSearchParameters) => {
    console.log('Bike search parameters', bikeSearchParameters);
  };

  const handleFiltersChange = (newFilters: any) => {
    const updatedFilters = {
      ...filters,
      filters: {
        ...filters.filters,
        ...newFilters.filters,
      },
      sort: {
        ...filters.sort,
        ...newFilters.sort,
      },
    };
    setFilters(updatedFilters);
  };

  const handleSortFields = (sortFields: any) => {
    const updatedSort = { ...filters, sort: sortFields };
    setFilters(updatedSort);
  };

  const handleFilterClear = (filterType: string, filterKey: string) => {
    const updatedFilters = { ...filters };

    if (filterType === 'filters') {
      if (Array.isArray(updatedFilters.filters[filterKey])) {
        updatedFilters.filters[filterKey] = [];
      } else {
        delete updatedFilters.filters[filterKey];
      }
    } else if (filterType === 'sort') {
      setSortDel(true)
      if (filterKey === 'price') {
        updatedFilters.sort[filterKey] = { from: '', to: '' };
        setClearSort(filterKey) // Reset price range specifically
      } else {
        updatedFilters.sort[filterKey] = '';
        setClearSort(filterKey) // Clear other sort values
      }
    }
    if (filters.sort.price.from === '' && filters.sort.price.to === '')
      console.log(1)

    console.log('updatedFilter after delete', updatedFilters);

    setFilters(updatedFilters);
  };



  return (
    <div>
      <Header />
      <div className={styles.page}>
        <div className={styles.page__homeBreadcrumb}>
          {/* Breadcrumb Navigation */}
          <div className={styles.page__homeBreadcrumb__homeLogo}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M1 11.157C1 8.86862 1 7.72441 1.5192 6.77587C2.0384 5.82734 2.98695 5.23863 4.88403 4.06125L6.88403 2.81999C8.88939 1.57541 9.8921 0.953125 11 0.953125C12.1079 0.953125 13.1106 1.57541 15.116 2.81999L17.116 4.06124C19.0131 5.23863 19.9616 5.82734 20.4808 6.77587C21 7.72441 21 8.86862 21 11.157V12.6781C21 16.5789 21 18.5294 19.8284 19.7412C18.6569 20.9531 16.7712 20.9531 13 20.9531H9C5.22876 20.9531 3.34315 20.9531 2.17157 19.7412C1 18.5294 1 16.5789 1 12.6781V11.157Z" stroke="black" strokeWidth="1.5" />
            </svg>
          </div>
          <div className={styles.page__homeBreadcrumb__home}>Home</div>
          <div className={styles.page__homeBreadcrumb__resultsOptions}>Search Options Results</div>
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

        <FilterBox />
        <SortAndFilter onChange={handleSortFields} filterKey={filterKey} />

        {/* Display Filters */}
        <div className={styles.page__filterContainer}>
          {Object.entries(filters.filters).map(([key, value]) =>
            Array.isArray(value) && value.length > 0 ? (
              <div className={styles.page__filterContainer__filterBox} key={key}>
                <div className={styles.page__filterContainer__filterBox__filterLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div className={styles.page__filterContainer__filterBox__filterResult}>
                  {value.join(', ')}
                </div>
                <div className={styles.page__filterContainer__filterBox__crossIcon} onClick={() => handleFilterClear('filters', key)}>
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
          {Object.entries(filters.sort).map(([key, value]) =>
            key !== 'price' && value ? (
              <div className={styles.page__filterContainer__filterBox} key={key}
                style={{
                  display: value ? 'flex' : 'none'
                }}>
                <div className={styles.page__filterContainer__filterBox__filterLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div className={styles.page__filterContainer__filterBox__filterResult}>
                  {typeof value === 'object'
                    ? Object.entries(value)
                      .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                      .join(', ')
                    : value}
                </div>
                <div className={styles.page__filterContainer__filterBox__crossIcon}
                  onClick={() => handleFilterClear('sort', key)}>
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

          {filters.sort.price.from !== '' && filters.sort.price.to !== '' ? (
            <div className={styles.page__filterContainer__filterBox}>
              <div className={styles.page__filterContainer__filterBox__filterLabel}>
                Price
              </div>
              <div className={styles.page__filterContainer__filterBox__filterResult}>
                {`₱${filters.sort.price.from} - ₱${filters.sort.price.to}`}
              </div>
              <div className={styles.page__filterContainer__filterBox__crossIcon} onClick={() => handleFilterClear('sort', 'price')}>
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


        </div>



        {/* ResultCard Component */}
        <ResultCard numberOfResults={3} onFiltersChange={handleFiltersChange} />
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
