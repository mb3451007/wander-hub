import React, { useState, useEffect } from 'react'
import styles from './bathroomFilters.module.scss'
import Checkbox from '@/app/icons/Checkbox'
interface bathroomFiltersProps {
  onChange: (filters: any) => void
  handleFilterClear: boolean
}
// eslint-disable-next-line react/prop-types
export default function BathroomFilters({
  onChange,
  handleFilterClear,
}: bathroomFiltersProps) {
  // Filters data
  const filtersData = [
    { key: 'any', label: 'Any' },
    { key: 'oneBathroom', label: '1 Bathroom' },
    { key: 'twoBathrooms', label: '2 Bathrooms' },
    { key: 'threeBathrooms', label: '3 Bathrooms' },
    { key: 'fourPlusBathrooms', label: '4 and more' },
  ]

  // State to track which checkboxes are selected
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean
  }>({})

  const clearFilters = () => {
    setSelectedFilters({})
    if (onChange) {
      onChange([])
    }
  }

  useEffect(() => {
    if (handleFilterClear) {
      clearFilters()
    }
  }, [handleFilterClear])
  // Handle toggle function
  // const handleToggle = (key: any) => {
  //   setSelectedFilters((prevState: any) => {
  //     const newState = { ...prevState, [key]: !prevState[key] }
  //     const selectedLabels = Object.entries(newState)
  //       .filter(([key, value]) => value)
  //       .map(([key]) => filtersData.find((item) => item.key === key)?.label)

  //     if (onChange) {
  //       onChange(selectedLabels)
  //     }
  //     return newState
  //   })
  // }
  const handleToggle = (key: string) => {
    setSelectedFilters((prevState: any) => {
      let newState: { [key: string]: boolean } = { ...prevState }

      if (key === 'any') {
        newState = { any: !prevState['any'] }
      } else {
        newState['any'] = false
        newState[key] = !prevState[key]
      }

      const selectedLabels = Object.entries(newState)
        .filter(([_, value]) => value)
        .map(([key]) => filtersData.find((item) => item.key === key)?.key)

      if (onChange) {
        onChange(selectedLabels)
      }

      return newState
    })
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterContainer__header}>Bathrooms</div>
      <div className={styles.filterContainer__filters}>
        {filtersData.map((filter) => (
          <div
            key={filter.key}
            className={styles.filterContainer__filters__filter}
          >
            <div
              className={styles.filterContainer__filters__filter__checkbox}
              onClick={() => handleToggle(filter.key)}
            >
              {/* Unchecked box */}
              {Checkbox(false)}
              {/* Checked box */}
              {selectedFilters[filter.key] && Checkbox(true)}
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
