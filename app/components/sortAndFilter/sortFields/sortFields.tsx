'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './sortFields.module.scss'
import Dropdown from '@/app/icons/Dropdown'
import VerticalDivider from '@/app/icons/VerticalDivider'
import Pound from '@/app/icons/Pound'
import CustomDropdown from '../../customDropdown/customDropdown'
interface sortFieldsProps {
  clearedFilter: { filterType: string; filterKey: string } | null
  onChange: (filters: any) => void
  onLocationChange: (newFilters: any) => void
  onStayChange: (newFilters: any) => void
  onPriceChange: (newFilters: any) => void
  onSortByChange: (newFilters: any) => void
}
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()
export default function sortFields(props: sortFieldsProps) {
  const [sortBy, setSortBy] = useState('')
  const [stay, setStay] = useState([])
  const [location, setLocation] = useState([])
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const dropdownRef = useRef<any>(null)
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      maxWidth: '100%',
      border: '1.5px solid rgba(0, 0, 0, 0.3)',
    }),
    valueContainer: (provided: any) => ({
      ...provided,

      flexWrap: 'nowrap',
      overflow: 'auto',
    }),
  }
  const locations = [
    { value: 'rawalpindi', label: 'rawalpindi' },
    { value: 'fatehjang', label: 'fatehjang' },
    { value: 'islamabad', label: 'islamabad' },
  ]

  const stays = [
    {
      value: 'apartment',
      label: 'Apartment',
    },
    { value: 'villa', label: 'Villa' },
    { value: 'guestHouse', label: 'GuestHouse' },
    { value: 'room', label: 'Room' },
    { value: 'hotel', label: 'Hotel' },
  ]
  const sortByOptions = [
    { value: 'dateOldToNew', label: 'Date (old to new)' },
    { value: 'dateNewToOld', label: 'Date (new to old)' },
    { value: 'priceHighToLow', label: 'Price (high to low)' },
    { value: 'priceLowToHigh', label: 'Price (low to high)' },
  ]

  useEffect(() => {
    if (props.clearedFilter) {
      if (props.clearedFilter.filterKey === 'clearAll') {
        // Clear all filters
        setStay([])
        setLocation([])
        setPriceFrom('')
        setPriceTo('')
        setSortBy('')

        setSelectedStays([])
        setSelectedLocations([])
        // Call your onChange functions to reset states
        props.onStayChange([])
        props.onLocationChange([])
        props.onPriceChange({ from: '', to: '' })
        props.onSortByChange('')
      } else if (props.clearedFilter.filterKey === 'stay') {
        setStay([])
        props.onStayChange([])
        setSelectedStays([])
      } else if (props.clearedFilter.filterKey === 'location') {
        setLocation([])
        props.onLocationChange([])
        setSelectedLocations([])
      } else if (props.clearedFilter.filterKey === 'price') {
        setPriceFrom('')
        setPriceTo('')
        props.onPriceChange({
          from: '',
          to: '',
        })
      } else if (props.clearedFilter.filterKey === 'sortBy') {
        setSortBy('')
        props.onSortByChange('')
      }
      // Add your logic to clear fields in SortFields here
    }
  }, [props.clearedFilter])

  useEffect(() => {
    // Function to hide keypad when clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLocationDropdown(false)
        setStayDropdown(false)
      }
    }

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  // useEffect(() => {
  //   const sortObject = {
  //     stay,
  //     location,
  //     date,
  //     price: {
  //       from: priceFrom,
  //       to: priceTo,
  //     },
  //   }

  //   if (onChange) {
  //     onChange(sortObject)
  //   }
  // }, [stay, location, date, priceFrom, priceTo, onChange])

  const [selectedLocations, setSelectedLocations] = useState<any[]>([])
  const [selectedStays, setSelectedStays] = useState<any[]>([])

  const [locationDropdown, setLocationDropdown] = useState(false)
  const [stayDropdown, setStayDropdown] = useState(false)
  const handleToggle = (type: any, selectedOptions: any) => {
    console.log('here', type, selectedOptions)
    if (type === 'location') {
      const selectedLabels = selectedOptions.map((selectedOption: any) => {
        return locations.find(
          (item: any) => item.value === selectedOption.value
        )?.label
      })

      if (props.onLocationChange) {
        props.onLocationChange(selectedLabels)
      }
    } else if (type === 'stay') {
      const selectedLabels = selectedOptions.map((selectedOption: any) => {
        return stays.find((item: any) => item.value === selectedOption.value)
          ?.label
      })

      if (props.onStayChange) {
        props.onStayChange(selectedLabels)
      }
    }
  }

  const handlePriceChange = () => {
    if (props.onPriceChange) {
      props.onPriceChange({
        from: priceFrom,
        to: priceTo,
      })
    }
  }

  const handleDateChange = (selectedOption: any) => {
    if (props.onSortByChange) {
      props.onSortByChange(selectedOption)
    }
  }

  useEffect(() => {
    console.log(selectedLocations, '--------------seleceted locations')
  }, [selectedLocations])
  useEffect(() => {
    handlePriceChange()
  }, [priceFrom, priceTo])
  return (
    <div className={styles.container}>
      <div className={styles.container__sortFields}>
        <div className={styles.container__sortFields__upperSection}>
          <div className={styles.container__sortFields__results}>
            <p className={styles.container__sortFields__results__resultsFound}>
              9 Results Found
            </p>
            <p className={styles.container__sortFields__results__icon}>
              {VerticalDivider()}
            </p>
            <p className={styles.container__sortFields__results__sortBy}>
              Sort By:
            </p>
          </div>

          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            options={sortByOptions}
            styles={customStyles}
            value={sortBy}
            onChange={(selectedOption: any) => {
              setSortBy(selectedOption)
              handleDateChange(selectedOption.value)
            }}
          />
        </div>
        <div className={styles.container__sortFields__lowerSection}>
          <div className="">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={stays}
              styles={customStyles}
              value={selectedStays}
              onChange={(selectedOptions: any) => {
                setSelectedStays(selectedOptions)
                handleToggle('stay', selectedOptions)
              }}
            />
          </div>
          <div className="">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={locations}
              styles={customStyles}
              value={selectedLocations}
              onChange={(selectedOptions: any) => {
                setSelectedLocations(selectedOptions)
                handleToggle('location', selectedOptions)
              }}
            />
          </div>

          <div className="">
            <input
              name="priceFrom"
              id="priceFrom"
              className={styles.container__sortFields__priceFrom}
              placeholder="Price (From)"
              value={priceFrom}
              onChange={(event) => setPriceFrom(event.target.value)}
            ></input>
            <div className={styles.container__sortFields__priceFrom__priceIcon}>
              {Pound()}
            </div>
          </div>

          <div className="">
            <input
              name="priceTo"
              id="priceTo"
              className={styles.container__sortFields__priceTo}
              placeholder="Price (To)"
              value={priceTo}
              onChange={(event) => setPriceTo(event.target.value)}
            ></input>
            <div className={styles.container__sortFields__priceTo__priceIcon}>
              {Pound()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
