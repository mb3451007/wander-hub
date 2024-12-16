import React, { useState, useEffect, useRef } from 'react'
import styles from './filterModal.module.scss'
import Close from '@/app/icons/Close'

import Pound from '@/app/icons/Pound'
import Backspace from '@/app/icons/Backspace'

interface sortAndFilterProps {
  filters: any
  onFiltersChange: (filters: any) => void
  toggleModal: () => void
}
export default function FilterModal(props: sortAndFilterProps) {
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

  const digits = [
    { key: '1', label: '1' },
    { key: '2', label: '2 ABC' },
    { key: '3', label: '3 DEF' },
    { key: '4', label: '4 GHI' },
    { key: '5', label: '5 JKL' },
    { key: '6', label: '6 MNO' },
    { key: '7', label: '7 PQRS' },
    { key: '8', label: '8 TUV' },
    { key: '9', label: '9 WXYZ' },
  ]

  const Bedrooms = [
    { key: 'any', label: 'Any' },
    { key: 'oneBedroom', label: '1' },
    { key: 'twoBedrooms', label: '2' },
    { key: 'threeBedrooms', label: '3' },
    { key: 'fourPlusBedrooms', label: '4 and more' },
  ]
  const Bathrooms = [
    { key: 'any', label: 'Any' },
    { key: 'oneBathroom', label: '1' },
    { key: 'twoBathrooms', label: '2' },
    { key: 'threeBathrooms', label: '3' },
    { key: 'fourPlusBathrooms', label: '4 and more' },
  ]

  const Additionally = [
    { key: 'availableNow', label: 'Available Now' },
    { key: 'corporate', label: 'Corporate' },
    { key: 'petAllowed', label: 'Pet Allowed' },
  ]

  const handleFiltersChange = (filterType: any, key: any) => {
    const updatedFilters = { ...props.filters }
    const currentFilterValues = updatedFilters.filters[filterType]

    if (filterType === 'bedroom') {
      if (key === 'any') {
        if (currentFilterValues.includes('any')) {
          updatedFilters.filters[filterType] = []
          props.onFiltersChange(updatedFilters)
          return
        } else {
          updatedFilters.filters[filterType] = [
            'any',
            'oneBedroom',
            'twoBedrooms',
            'threeBedrooms',
            'fourPlusBedrooms',
          ]
          props.onFiltersChange(updatedFilters)
          return
        }
      } else if (
        currentFilterValues.includes(key) &&
        key !== 'any' &&
        currentFilterValues.includes('any')
      ) {
        let updatedFilterValues = currentFilterValues.includes(key)
          ? currentFilterValues.filter((value: any) => value !== key)
          : [...currentFilterValues, key]

        updatedFilterValues = updatedFilterValues.filter(
          (value: any) => value !== 'any'
        )

        updatedFilters.filters[filterType] = updatedFilterValues

        props.onFiltersChange(updatedFilters)
        return
      }
    }
    if (filterType === 'bathroom') {
      if (key === 'any') {
        if (currentFilterValues.includes('any')) {
          updatedFilters.filters[filterType] = []
          props.onFiltersChange(updatedFilters)
          return
        } else {
          updatedFilters.filters[filterType] = [
            'any',
            'oneBathroom',
            'twoBathrooms',
            'threeBathrooms',
            'fourPlusBathrooms',
          ]
          props.onFiltersChange(updatedFilters)
          return
        }
      } else if (
        currentFilterValues.includes(key) &&
        key !== 'any' &&
        currentFilterValues.includes('any')
      ) {
        let updatedFilterValues = currentFilterValues.includes(key)
          ? currentFilterValues.filter((value: any) => value !== key)
          : [...currentFilterValues, key]

        updatedFilterValues = updatedFilterValues.filter(
          (value: any) => value !== 'any'
        )

        updatedFilters.filters[filterType] = updatedFilterValues

        props.onFiltersChange(updatedFilters)
        return
      }
    }

    console.log(
      currentFilterValues,
      '---------current filter values',
      'key:',
      key
    )
    const updatedFilterValues = currentFilterValues.includes(key)
      ? currentFilterValues.filter((value: any) => value !== key)
      : [...currentFilterValues, key]

    updatedFilters.filters[filterType] = updatedFilterValues
    props.onFiltersChange(updatedFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      bedroom: [],
      bathroom: [],
      amenities: [],
      additionally: [],
      price: { from: '', to: '' },
    }
    setPriceFrom('')
    setPriceTo('')
    props.onFiltersChange({ filters: clearedFilters })
  }

  const [keypad, setKeypad] = useState(false)
  const [activeInput, setActiveInput] = useState(null)
  const [priceFrom, setPriceFrom] = useState(
    props.filters.filters.price.from || ''
  )
  const [priceTo, setPriceTo] = useState(props.filters.filters.price.to || '')
  const keypadRef = useRef<any>(null)
  const inputRef = useRef<any>(null)

  const handleDigitClick = (digit: any) => {
    if (activeInput === 'from') {
      const updatedPriceFrom = priceFrom + digit
      setPriceFrom(updatedPriceFrom)
      handleFiltersChange('price', { from: updatedPriceFrom, to: priceTo })
    } else if (activeInput === 'to') {
      const updatedPriceTo = priceTo + digit
      setPriceTo(updatedPriceTo)
      handleFiltersChange('price', { from: priceFrom, to: updatedPriceTo })
    }
  }

  const handleBackspace = () => {
    if (activeInput === 'from') {
      setPriceFrom(priceFrom.slice(0, -1))
    } else if (activeInput === 'to') {
      setPriceTo(priceTo.slice(0, -1))
    }
  }

  const handleInputFocus = (inputType: any) => {
    setActiveInput(inputType)
    setKeypad(true)
  }
  useEffect(() => {
    // Function to hide keypad when clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        keypadRef.current &&
        !keypadRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setKeypad(false)
      }
    }

    // Add event listener for clicks outside
    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeader__modalHeaderSubContainer}>
            <p>Property Filter</p>
            <div
              className={
                styles.modalHeader__modalHeaderSubContainer__closeIconContainer
              }
              onClick={props.toggleModal}
            >
              {Close()}
            </div>
          </div>
        </div>

        <div className={styles.priceSectionContainer}>
          <div className={styles.priceSectionContainer__innerContainer}>
            <p>Price</p>
          </div>
          <div
            className={styles.priceSectionContainer__innerContainer}
            style={{ gap: '10px' }}
          >
            <div
              className={
                styles.priceSectionContainer__innerContainer__inputBoxContainer
              }
              ref={inputRef}
            >
              <input
                type="number"
                placeholder="From"
                value={priceFrom}
                onFocus={() => handleInputFocus('from')}
                readOnly
              />
              {Pound()}
            </div>
            <div
              className={
                styles.priceSectionContainer__innerContainer__inputBoxContainer
              }
              ref={inputRef}
            >
              <input
                type="number"
                placeholder="To"
                value={priceTo}
                onFocus={() => handleInputFocus('to')}
                readOnly
              />
              {Pound()}
            </div>
          </div>
          <div className={styles.priceSectionContainer__innerContainer}>
            <hr
              className={
                styles.priceSectionContainer__innerContainer__verticalLine
              }
            />
          </div>
        </div>

        <div className={styles.priceSectionContainer}>
          <div className={styles.priceSectionContainer__innerContainer}>
            <p>Bedrooms</p>
          </div>
          <div
            className={
              styles.priceSectionContainer__innerContainer__selectablesContainer
            }
          >
            {Bedrooms.map((bedroom) => {
              return (
                <div
                  key={bedroom.key}
                  className={`${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble} ${
                    props.filters.filters.bedroom.includes(bedroom.key)
                      ? `${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble__selected}`
                      : ''
                  }`}
                  onClick={() => handleFiltersChange('bedroom', bedroom.key)}
                >
                  <p>{bedroom.label}</p>
                </div>
              )
            })}
          </div>
          <div className={styles.priceSectionContainer__innerContainer}>
            <hr
              className={
                styles.priceSectionContainer__innerContainer__verticalLine
              }
            />
          </div>
        </div>

        <div className={styles.priceSectionContainer}>
          <div className={styles.priceSectionContainer__innerContainer}>
            <p>Bathrooms</p>
          </div>
          <div
            className={
              styles.priceSectionContainer__innerContainer__selectablesContainer
            }
          >
            {Bathrooms.map((bathroom) => {
              return (
                <div
                  key={bathroom.key}
                  className={`${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble} ${
                    props.filters.filters.bathroom.includes(bathroom.key)
                      ? `${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble__selected}`
                      : ''
                  }`}
                  onClick={() => handleFiltersChange('bathroom', bathroom.key)}
                >
                  <p>{bathroom.label}</p>
                </div>
              )
            })}
          </div>
          <div className={styles.priceSectionContainer__innerContainer}>
            <hr
              className={
                styles.priceSectionContainer__innerContainer__verticalLine
              }
            />
          </div>
        </div>

        <div className={styles.priceSectionContainer}>
          <div className={styles.priceSectionContainer__innerContainer}>
            <p>Amenities</p>
          </div>
          <div
            className={
              styles.priceSectionContainer__innerContainer__selectablesContainer
            }
          >
            {amenities.map((amenity) => {
              return (
                <div
                  key={amenity.key}
                  className={`${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble} ${
                    props.filters.filters.amenities.includes(amenity.key)
                      ? `${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble__selected}`
                      : ''
                  }`}
                  onClick={() =>
                    handleFiltersChange('amenities', amenities.keys)
                  }
                >
                  <p>{amenity.label}</p>
                </div>
              )
            })}
          </div>
          <div className={styles.priceSectionContainer__innerContainer}>
            <hr
              className={
                styles.priceSectionContainer__innerContainer__verticalLine
              }
            />
          </div>
        </div>

        <div className={styles.priceSectionContainer}>
          <div className={styles.priceSectionContainer__innerContainer}>
            <p>Additionally</p>
          </div>
          <div
            className={
              styles.priceSectionContainer__innerContainer__selectablesContainer
            }
          >
            {Additionally.map((additional) => {
              return (
                <div
                  key={additional.key}
                  className={`${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble} ${
                    props.filters.filters.additionally.includes(additional.key)
                      ? `${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble__selected}`
                      : ''
                  }`}
                  onClick={() =>
                    handleFiltersChange('additionally', additional.key)
                  }
                >
                  <p>{additional.label}</p>
                </div>
              )
            })}
          </div>
          <div className={styles.priceSectionContainer__innerContainer}>
            <hr
              className={
                styles.priceSectionContainer__innerContainer__verticalLine
              }
            />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            className={styles.modalFooter__clearAll}
            onClick={() => clearFilters()}
          >
            Clear All
          </button>
          <button className={styles.modalFooter__confirm}>Show Results</button>
        </div>
      </div>
      {keypad && (
        <div
          className={styles.keypadContainer}
          ref={keypadRef}
        >
          <div className={styles.keypadContainer__buttonContainer}>
            {digits.map((digit) => {
              const [number, letters] = digit.label.split(' ')
              return (
                <div
                  className={styles.keypadContainer__buttonContainer__button}
                  onClick={() => handleDigitClick(digit.key)}
                >
                  {number}

                  {letters && <span>{letters}</span>}
                </div>
              )
            })}

            <div
              className={styles.keypadContainer__buttonContainer__button}
              style={{
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
              }}
            ></div>

            <div
              className={styles.keypadContainer__buttonContainer__button}
              onClick={() => handleDigitClick(0)}
            >
              0
            </div>
            <div
              className={styles.keypadContainer__buttonContainer__button}
              style={{
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
              }}
              onClick={handleBackspace}
            >
              {Backspace()}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
