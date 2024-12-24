import React, { useEffect, useState } from 'react'
import SortFields from './sortFields/sortFields'
import styles from './sortAndFilter.module.scss'
import SortIcon from '@/app/icons/SortIcon'
import Filter from '@/app/icons/Filter'
interface sortAndFilterProps {
  clearedFilter: { filterType: string; filterKey: string } | null
  onChange: (filters: any) => void
  toggleModal: () => void
  toggleSortModal: () => void
  count: number
}
export default function sortAndFilter(props: sortAndFilterProps) {
  const [filters, setFilters] = useState({
    filters: {
      location: [],
      stay: [],
      price: { from: '', to: '' },
    },

    sortBy: '',
  })

  const handleFiltersChange = (filterKey: any, newFilters: any) => {
    setFilters((prevState) => {
      if (filterKey === 'sortBy') {
        return {
          ...prevState,
          sortBy: newFilters,
        }
      } else {
        return {
          filters: {
            ...prevState.filters,
            [filterKey]: newFilters,
          },
          sortBy: prevState.sortBy,
        }
      }
    })
  }

  useEffect(() => {
    console.log('Updated filters:desktop view', filters)
    props.onChange({ filters: filters.filters, sortBy: filters.sortBy })
  }, [filters])

  // useEffect(() => {
  //   console.log('Updated filters:desktop view', filters)
  //   onChange(filters)
  // }, [filters])
  // const sortFieldsObj = (sortObj) => {
  //   onChange(sortObj)
  // }
  useEffect(() => {
    if (props.clearedFilter) {
      console.log('Cleared Filterss-------------- :', props.clearedFilter)
    }
  }, [props.clearedFilter])
  const locationsFilter = (newFilters: any) => {
    handleFiltersChange('location', newFilters)
  }
  const stayFilters = (newFilters: any) => {
    handleFiltersChange('stay', newFilters)
  }

  const priceChange = (newFilters: any) => {
    handleFiltersChange('price', newFilters)
  }

  const sortByChange = (newFilters: any) => {
    handleFiltersChange('sortBy', newFilters)
  }

  return (
    <div className={styles.parentCont}>
      <SortFields
        clearedFilter={props.clearedFilter}
        onChange={props.onChange}
        onLocationChange={locationsFilter}
        onStayChange={stayFilters}
        onPriceChange={priceChange}
        onSortByChange={sortByChange}
      />
      <div className={styles.container}>
        <div
          className={styles.container__sort}
          onClick={props.toggleSortModal}
        >
          <div className={styles.container__sort__icon}>{SortIcon()}</div>
          <div className={styles.container__sort__name}>Sort By</div>
        </div>
        <div
          className={styles.container__filter}
          onClick={props.toggleModal}
        >
          <div className={styles.container__filter__icon}>
            {Filter()}
            {props.count > 0 && (
              <div>
                <p>{props.count}</p>
              </div>
            )}
          </div>

          <div className={styles.container__filter__name}>Filter</div>
        </div>
      </div>
    </div>
  )
}
