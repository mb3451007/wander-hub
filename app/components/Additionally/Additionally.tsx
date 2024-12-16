import React, { useState, useEffect } from 'react'
import styles from './Additionally.module.scss'
import Checkbox from '@/app/icons/Checkbox'
interface additionallyFiltersProps {
  onChange: (filters: any) => void
  handleFilterClear: boolean
}
// eslint-disable-next-line react/prop-types
export default function Additionally({
  onChange,
  handleFilterClear,
}: additionallyFiltersProps) {
  // Array to define the checkbox properties
  const checkboxItems = [
    { key: 'availableNow', label: 'Available Now' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'petAllowed', label: 'Pet Allowed' },
  ]

  // State to track the state of each checkbox

  const [checkedState, setCheckedState] = useState<{
    [key: string]: boolean
  }>({})
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
  const handleToggle = (key: any) => {
    setCheckedState((prevState: any) => {
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
              {Checkbox(false)}
              {checkedState[filter.key] && Checkbox(true)}
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
