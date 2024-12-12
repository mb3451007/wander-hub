import React, { useState, useEffect } from 'react'
import styles from './filterModal.module.scss'
import Close from '@/app/icons/Close'

import Pound from '@/app/icons/Pound'
import Backspace from '@/app/icons/Backspace'
export default function FilterModal({ toggleModal, onFiltersChange, filters }) {
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
  const objets = ['Apartment', 'Villa', 'GuestHouse', 'Room', 'Hotel']

  const handleFiltersChange = (filterType, value) => {
    const updatedFilters = { ...filters }
    updatedFilters.filters[filterType] = value
    onFiltersChange(updatedFilters)
  }
  const clearFilters = () => {
    console.log('clearing filters')
    onFiltersChange('clear') // Reset the filters in parent component
  }

  const [keypad, setKeypad] = useState(false)
  const [activeInput, setActiveInput] = useState(null)
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')

  const handleDigitClick = (digit) => {
    if (activeInput === 'from') {
      setPriceFrom(priceFrom + digit)
    } else if (activeInput === 'to') {
      setPriceTo(priceTo + digit)
    }
  }

  const handleBackspace = () => {
    if (activeInput === 'from') {
      setPriceFrom(priceFrom.slice(0, -1))
    } else if (activeInput === 'to') {
      setPriceTo(priceTo.slice(0, -1))
    }
  }

  const handleInputFocus = (inputType) => {
    setActiveInput(inputType)
  }

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
              onClick={toggleModal}
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
                    filters.filters.bedroom.includes(bedroom.key)
                      ? `${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble__selected}`
                      : ''
                  }`}
                  onClick={() =>
                    handleFiltersChange(
                      'bedroom',
                      filters.filters.bedroom.includes(bedroom.key)
                        ? filters.filters.bedroom.filter(
                            (b) => b !== bedroom.key
                          )
                        : [...filters.filters.bedroom, bedroom.key]
                    )
                  }
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
                    filters.filters.bathroom.includes(bathroom.key)
                      ? `${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble__selected}`
                      : ''
                  }`}
                  onClick={() =>
                    handleFiltersChange(
                      'bathroom',
                      filters.filters.bathroom.includes(bathroom.key)
                        ? filters.filters.bathroom.filter(
                            (b) => b !== bathroom.key
                          )
                        : [...filters.filters.bathroom, bathroom.key]
                    )
                  }
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
                    filters.filters.amenities.includes(amenity.key)
                      ? `${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble__selected}`
                      : ''
                  }`}
                  onClick={() =>
                    handleFiltersChange(
                      'amenities',
                      filters.filters.amenities.includes(amenity.key)
                        ? filters.filters.amenities.filter(
                            (b) => b !== amenity.key
                          )
                        : [...filters.filters.amenities, amenity.key]
                    )
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
                    filters.filters.additionally.includes(additional.key)
                      ? `${styles.priceSectionContainer__innerContainer__selectablesContainer__selectAble__selected}`
                      : ''
                  }`}
                  onClick={() =>
                    handleFiltersChange(
                      'additionally',
                      filters.filters.additionally.includes(additional.key)
                        ? filters.filters.additionally.filter(
                            (b) => b !== additional.key
                          )
                        : [...filters.filters.additionally, additional.key]
                    )
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
        <div className={styles.keypadContainer}>
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
