import React, { useState, useEffect } from 'react'
import styles from './sortModal.module.scss'
import Close from '@/app/icons/Close'

interface sortModalProps {
  filters: any
  onFiltersChange: (filters: any) => void
  toggleModal: () => void
  show: boolean
}
export default function SortModal({
  toggleModal,
  filters: initialFilters,
  onFiltersChange,
  show,
}: sortModalProps) {
  const [filters, setFilters] = useState({
    sortBy: initialFilters || '',
  })

  const handleFiltersChange = (filterKey: any, newFilters: any) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        sortBy: newFilters,
      }
    })
    setTimeout(() => {
      console.log('toggleModal called after 1 second delay!')
      toggleModal()
    }, 100)
  }

  const handleDateChange = (event: any) => {
    const selectedValue = event.target.value
    handleFiltersChange('sortBy', selectedValue)
  }
  useEffect(() => {
    console.log('Updated filters:desktop view', filters)
    onFiltersChange({ sortBy: filters.sortBy })
  }, [filters])

  return (
    <div className={`${styles.sortModal} ${show ? styles.open : ''}`}>
      <div className={styles.sortModalSubContainer__innerContainer}>
        <hr
          className={
            styles.sortModalSubContainer__innerContainer__quarterVerticalLine
          }
        />
      </div>
      <div
        className={styles.sortModalSubContainer__closeButtonContainer}
        onClick={toggleModal}
      >
        <div> {Close()}</div>
      </div>
      <div className={styles.sortModalSubContainer__headingContainer}>
        <p>Sort By</p>
      </div>

      <form className={styles.sortModalSubContainer__form}>
        <div className={styles.sortModalSubContainer__form__radioContainer}>
          <label>
            Date (Old to New)
            <input
              type="radio"
              name="sortOption"
              value="dateOldToNew"
              checked={filters.sortBy === 'dateOldToNew'}
              onChange={handleDateChange}
            />
          </label>
        </div>
        <div className={styles.sortModalSubContainer__form}>
          <hr className={styles.sortModalSubContainer__form__verticalLine} />
        </div>
        <div className={styles.sortModalSubContainer__form__radioContainer}>
          <label>
            Date (New to Old)
            <input
              type="radio"
              name="sortOption"
              value="dateNewToOld"
              checked={filters.sortBy === 'dateNewToOld'}
              onChange={handleDateChange}
            />
          </label>
        </div>
        <div className={styles.sortModalSubContainer__form}>
          <hr className={styles.sortModalSubContainer__form__verticalLine} />
        </div>
        <div className={styles.sortModalSubContainer__form__radioContainer}>
          <label>
            Price (Highest)
            <input
              type="radio"
              name="sortOption"
              value="priceHighToLow"
              checked={filters.sortBy === 'priceHighToLow'}
              onChange={handleDateChange}
            />
          </label>
        </div>
        <div className={styles.sortModalSubContainer__form}>
          <hr className={styles.sortModalSubContainer__form__verticalLine} />
        </div>
        <div className={styles.sortModalSubContainer__form__radioContainer}>
          <label>
            Price (Lowest)
            <input
              type="radio"
              name="sortOption"
              value="priceLowToHigh"
              checked={filters.sortBy === 'priceLowToHigh'}
              onChange={handleDateChange}
            />
          </label>
        </div>
        <div className={styles.sortModalSubContainer__form}>
          <hr className={styles.sortModalSubContainer__form__verticalLine} />
        </div>
      </form>
    </div>
  )
}
