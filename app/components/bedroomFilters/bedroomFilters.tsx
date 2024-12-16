import React, { useEffect, useState } from 'react'
import styles from './bedroomFilters.module.scss'
import Checkbox from '@/app/icons/Checkbox'
interface bedroomFiltersProps {
  onChange: (filters: any) => void
  handleFilterClear: boolean
}
export default function BedroomFilters({
  onChange,
  handleFilterClear,
}: bedroomFiltersProps) {
  // Filters data
  const filtersData = [
    { key: 'any', label: 'Any' },
    { key: 'oneBedroom', label: '1 Bedroom' },
    { key: 'twoBedrooms', label: '2 Bedrooms' },
    { key: 'threeBedrooms', label: '3 Bedrooms' },
    { key: 'fourPlusBedrooms', label: '4 and more' },
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
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //       onChange(selectedLabels)
  //     }
  //     return newState
  //   })
  // }
  const handleToggle = (key: string) => {
    setSelectedFilters((prevState) => {
      const newState = { ...prevState }

      if (key === 'any') {
        if (!newState[key]) {
          filtersData.forEach((filter) => {
            newState[filter.key] = true
          })
        } else {
          filtersData.forEach((filter) => {
            newState[filter.key] = false
          })
        }
      } else {
        newState[key] = !newState[key]

        if (!newState[key]) {
          newState['any'] = false
        }
      }

      const allSelected = filtersData
        .filter((filter) => filter.key !== 'any')
        .every((filter) => newState[filter.key])

      // Update the selected labels
      const selectedLabels = Object.entries(newState)
        .filter(([_, value]) => value)
        .map(([key]) => filtersData.find((item) => item.key === key)?.label)

      if (onChange) {
        onChange(selectedLabels)
      }

      return newState
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__filterContainer}>
        <div className={styles.container__filterContainer__header}>
          Bedrooms
        </div>
        <div className={styles.container__filterContainer__filters}>
          {filtersData.map((filter) => (
            <div
              key={filter.key}
              className={styles.container__filterContainer__filters__filter}
            >
              <div
                className={
                  styles.container__filterContainer__filters__filter__checkbox
                }
                onClick={() => handleToggle(filter.key)}
              >
                {/* Unchecked box */}
                {Checkbox(false)}
                {/* Checked box */}
                {selectedFilters[filter.key] && Checkbox(true)}
              </div>
              <div
                className={
                  styles.container__filterContainer__filters__filter__name
                }
              >
                {filter.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
