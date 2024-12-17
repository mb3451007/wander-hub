import React, { useState, useEffect } from 'react'
import styles from './Amenities.module.scss'
import Checkbox from '@/app/icons/Checkbox'
interface amenitiesFiltersProps {
  onChange: (filters: any) => void
  handleFilterClear: boolean
}
export default function Amenities({
  onChange,
  handleFilterClear,
}: amenitiesFiltersProps) {
  // Array to manage the checked state of each checkbox
  // Adjust length to match the number of checkboxes
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean
  }>({})
  const amenities = [
    { key: 'AirConditioning', label: 'Air Conditioning' },
    { key: 'AssistedLiving', label: 'Assisted Living' },
    { key: 'DedicatedWorkspace', label: 'Dedicated Workspace' },
    { key: 'DisabilityAccess', label: 'Disability Access' },
    { key: 'Cleanings', label: 'Cleanings' },
    { key: 'Kitchen', label: 'Kitchen' },
    { key: 'Garage', label: 'Garage' },
    { key: 'TV', label: 'TV' },
    { key: 'SwimmingPool', label: 'Swimming Pool' },
    { key: 'Wifi', label: 'Wi-fi' },
  ]

  const clearFilters = () => {
    setCheckedStates({})
    if (onChange) {
      onChange([])
    }
  }

  useEffect(() => {
    if (handleFilterClear) {
      clearFilters()
    }
  }, [handleFilterClear])
  const handleCheckboxChange = (key: any) => {
    setCheckedStates((prevState: any) => {
      const newState = { ...prevState, [key]: !prevState[key] }
      const selectedLabels = Object.entries(newState)
        .filter(([key, value]) => value)
        .map(([key]) => amenities.find((item) => item.key === key)?.key)

      if (onChange) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onChange(selectedLabels)
      }
      return newState
    })
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterContainer__header}>Amenities</div>
      <div className={styles.filterContainer__filters}>
        {amenities.map((filter) => (
          <div
            key={filter.key}
            className={styles.filterContainer__filters__filter}
          >
            <div
              className={styles.filterContainer__filters__filter__checkbox}
              onClick={() => handleCheckboxChange(filter.key)}
            >
              {Checkbox(false)}
              {checkedStates[filter.key] && Checkbox(true)}
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
