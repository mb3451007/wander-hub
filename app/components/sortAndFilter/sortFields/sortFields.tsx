'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './sortFields.module.scss'
import Dropdown from '@/app/icons/Dropdown'
import VerticalDivider from '@/app/icons/VerticalDivider'
import Pound from '@/app/icons/Pound'
interface sortFieldsProps {
  clearedFilter: { filterType: string; filterKey: string } | null
  onChange: (filters: any) => void
  onLocationChange: (newFilters: any) => void
  onStayChange: (newFilters: any) => void
  onPriceChange: (newFilters: any) => void
  onSortByChange: (newFilters: any) => void
}
export default function sortFields(props: sortFieldsProps) {
  const [sortBy, setSortBy] = useState('')
  const [stay, setStay] = useState([])
  const [location, setLocation] = useState([])
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const dropdownRef = useRef<any>(null)

  const locations = [
    {
      key: 'islamabad',
      label: 'islamabad',
    },
    { key: 'rawalpindi', label: 'rawalpindi' },
    { key: 'fatehjang', label: 'fatehjang' },
  ]
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
  useEffect(() => {
    if (props.clearedFilter) {
      if (props.clearedFilter.filterKey === 'clearAll') {
        // Clear all filters
        setStay([])
        setLocation([])
        setPriceFrom('')
        setPriceTo('')
        setSortBy('')

        setSelectedStay({})
        setSelectedLocations({})
        // Call your onChange functions to reset states
        props.onStayChange([])
        props.onLocationChange([])
        props.onPriceChange({ from: '', to: '' })
        props.onSortByChange('')
      } else if (props.clearedFilter.filterKey === 'stay') {
        setStay([])
        props.onStayChange([])
        setSelectedStay({})
      } else if (props.clearedFilter.filterKey === 'location') {
        setLocation([])
        props.onLocationChange([])
        setSelectedLocations({})
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

  const [selectedLocations, setSelectedLocations] = useState<{
    [key: string]: boolean
  }>({})
  const [selectedStay, setSelectedStay] = useState<{ [key: string]: boolean }>(
    {}
  )

  const [locationDropdown, setLocationDropdown] = useState(false)
  const [stayDropdown, setStayDropdown] = useState(false)
  const handleToggle = (type: any, key: any) => {
    if (type === 'location') {
      setSelectedLocations((prevState: any) => {
        const newState = { ...prevState, [key]: !prevState[key] }
        const selectedLabels = Object.entries(newState)
          .filter(([key, value]) => value)
          .map(([key]) => locations.find((item) => item.key === key)?.label)

        if (props.onLocationChange) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          props.onLocationChange(selectedLabels)
        }
        return newState
      })
    } else if (type === 'stay') {
      setSelectedStay((prevState: any) => {
        const newState = { ...prevState, [key]: !prevState[key] }
        const selectedLabels = Object.entries(newState)
          .filter(([key, value]) => value)
          .map(([key]) => stays.find((item) => item.key === key)?.label)

        if (props.onStayChange) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          props.onStayChange(selectedLabels)
        }
        return newState
      })
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

  const handleDateChange = (event: any) => {
    setSortBy(event.target.value)
    if (props.onSortByChange) {
      props.onSortByChange(event.target.value)
    }
  }

  useEffect(() => {
    handlePriceChange()
  }, [priceFrom, priceTo])
  return (
    <div className={styles.container}>
      <div className={styles.container__sortFields}>
        <div className={styles.container__sortFields__upperSection}>
          <div className={styles.container__sortFields__results}>
            <span
              className={styles.container__sortFields__results__resultsFound}
            >
              9 Results Found
            </span>
            <span className={styles.container__sortFields__results__icon}>
              {VerticalDivider()}
            </span>
            <span className={styles.container__sortFields__results__sortBy}>
              Sort By:
            </span>
          </div>
          <select
            name="sortBy"
            id="sortBy"
            className={styles.container__sortFields__date}
            value={sortBy}
            onChange={handleDateChange}
          >
            <option
              value=""
              disabled
              className={styles.container__sortFields__date__text}
            >
              Sort By
            </option>
            <option value="dateOldToNew"> Date (old to new)</option>
            <option value="dateNewToOld">Date (new to old)</option>
            <option value="priceHighToLow">Price (high to low)</option>
            <option value="priceLowToHigh">Price (low to high)</option>
          </select>
          <div className={styles.container__sortFields__date__arrowIcon}>
            {Dropdown()}
          </div>
        </div>
        <div className={styles.container__sortFields__lowerSection}>
          <div className="">
            <div
              className={styles.customDropDown}
              onClick={() => setStayDropdown(true)}
              ref={dropdownRef}
            >
              <p> Stay</p>
              {Dropdown(20)}
            </div>
            {stayDropdown && (
              <ul
                className={styles.customList}
                ref={dropdownRef}
              >
                {stays.map((stay) => {
                  return (
                    <li className={styles.customList__listItem}>
                      <span>{stay.label}</span>
                      <input
                        className={styles.customList__listItem__checkBox}
                        type="checkbox"
                        checked={selectedStay[stay.key]}
                        onChange={() => handleToggle('stay', stay.key)}
                      />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <div className="">
            <div
              className={styles.customDropDown}
              onClick={() => setLocationDropdown(true)}
              ref={dropdownRef}
            >
              <p> Location</p>
              {Dropdown(20)}
            </div>
            {locationDropdown && (
              <ul
                className={styles.customList}
                ref={dropdownRef}
              >
                {locations.map((location) => {
                  return (
                    <li className={styles.customList__listItem}>
                      <span>{location.label}</span>
                      <input
                        className={styles.customList__listItem__checkBox}
                        type="checkbox"
                        checked={selectedLocations[location.key]}
                        onChange={() => handleToggle('location', location.key)}
                      />
                    </li>
                  )
                })}
              </ul>
            )}
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
