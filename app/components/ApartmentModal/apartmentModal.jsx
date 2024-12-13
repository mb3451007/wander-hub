import React, { useState, useEffect } from 'react'
import styles from './apartmentModal.module.scss'
import Close from '@/app/icons/Close'

export default function ApartmentModal({
  toggleModal,
  onFiltersChange,
  filters: initialFilters,
}) {
  const objets = ['Apartment', 'Villa', 'GuestHouse', 'Room', 'Hotel']
  const stays = [
    {
      key: 'apartment',
      label: 'Apartment',
    },
    { key: 'villa', label: 'Villa' },
    { key: 'guestHouse', label: 'GuestHouse' },
    { key: 'room', label: 'Room' },
    { key: 'hotel', label: 'Hotel' },
  ]

  const [filters, setFilters] = useState({
    filters: {
      stay: initialFilters,
    },
  })
  const [selectedFilters, setSelectedFilters] = useState({})

  useEffect(() => {
    const initialSelectedFilters = stays.reduce((acc, stay) => {
      acc[stay.key] = initialFilters.includes(stay.label) || false
      return acc
    }, {})

    setSelectedFilters(initialSelectedFilters)
  }, [initialFilters])
  const handleFiltersChange = (filterKey, newFilters) => {
    setFilters((prevState) => {
      return {
        filters: {
          ...prevState.filters,

          [filterKey]: newFilters,
        },
      }
    })
  }

  const handleToggle = (key) => {
    setSelectedFilters((prevState) => {
      const newState = { ...prevState, [key]: !prevState[key] }
      const selectedLabels = Object.entries(newState)
        .filter(([key, value]) => value)
        .map(([key]) => stays.find((item) => item.key === key)?.label)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      handleFiltersChange('stay', selectedLabels)

      return newState
    })
    console.log(selectedFilters, 'these are the selected labels')
  }

  useEffect(() => {
    console.log('Updated filters:desktop view', filters)
    onFiltersChange(filters)
  }, [filters])

  return (
    <div className={styles.apartmentModal}>
      <div className={styles.modalHeaderNonSticky}>
        <div className={styles.modalHeader__modalHeaderSubContainer}>
          <p>Choose Object</p>
          <div
            className={
              styles.modalHeader__modalHeaderSubContainer__closeIconContainer
            }
            onClick={toggleModal}
          >
            {Close()}
          </div>
        </div>
      </div>
      <form className={styles.sortModalSubContainer__form}>
        {stays.map((stay) => {
          return (
            <>
              <div
                key={stay.key}
                className={styles.sortModalSubContainer__form__radioContainer}
              >
                <label>
                  {stay.label}
                  <input
                    checked={selectedFilters[stay.key]}
                    onChange={() => handleToggle(stay.key)}
                    type="checkbox"
                  />
                </label>
              </div>
              <div className={styles.sortModalSubContainer__form}>
                <hr
                  className={styles.sortModalSubContainer__form__verticalLine}
                />
              </div>
            </>
          )
        })}
      </form>

      <div className={styles.confirmButtonContainer}>
        <button onClick={toggleModal}>Done</button>
      </div>
    </div>
  )
}
