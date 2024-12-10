import React, { useState, useEffect } from 'react'
import styles from './Additionally.module.scss'

// eslint-disable-next-line react/prop-types
export default function Additionally({ onChange, handleFilterClear }) {
  // Array to define the checkbox properties
  const checkboxItems = [
    { key: 'availableNow', label: 'Available Now' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'petAllowed', label: 'Pet Allowed' },
  ]

  // State to track the state of each checkbox
  const [checkedState, setCheckedState] = useState({})
  const clearFilters = () => {
    setCheckedState({})
    if (onChange) {
      onChange([])
    }
  }

  useEffect(() => {
    if (handleFilterClear) {
      clearFilters()
    }
  }, [handleFilterClear])
  const handleToggle = (key) => {
    setCheckedState((prevState) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const newState = { ...prevState, [key]: !prevState[key] }

      const selectedLabels = Object.entries(newState)
        .filter(([key, value]) => value)
        .map(([key]) => checkboxItems.find((item) => item.key === key)?.label)

      if (onChange) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onChange(selectedLabels)
      }
      return newState
    })
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterContainer__header}>Additionally</div>
      <div className={styles.filterContainer__filters}>
        {checkboxItems.map((filter) => (
          <div
            key={filter.key}
            className={styles.filterContainer__filters__filter}
          >
            <div
              className={styles.filterContainer__filters__filter__checkbox}
              onClick={() => handleToggle(filter.key)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="1.45361"
                  width="23"
                  height="23"
                  rx="3.5"
                  stroke="black"
                />
              </svg>
              {checkedState[filter.key] && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M4.16797 11.6667L6.86221 13.6873C7.21945 13.9553 7.7244 13.894 8.00718 13.5484L15.0013 5"
                    stroke="black"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
            <div className={styles.filterContainer__filters__filter__name}>
              {filter.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
