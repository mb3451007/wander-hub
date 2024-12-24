import React, { useState, useEffect, useRef } from 'react'
import styles from './filterModal.module.scss'
import Close from '@/app/icons/Close'

import Pound from '@/app/icons/Pound'

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

  const handleFiltersChange = (filterType: any, value: any) => {
    const updatedFilters = { ...props.filters }
    updatedFilters.filters[filterType] = value
    props.onFiltersChange(updatedFilters)
  }

  const toggleFilter = (filterType: string, key: string) => {
    if (filterType === 'bedroom' || filterType === 'bathroom') {
      const currentValues = props.filters.filters[filterType] || []

      let updatedValues: string[]

      if (key === 'any') {
        updatedValues = ['any']
      } else {
        if (currentValues.includes('any')) {
          updatedValues = [key]
        } else {
          updatedValues = currentValues.includes(key)
            ? currentValues.filter((v: string) => v !== key)
            : [...currentValues, key]
        }
      }

      handleFiltersChange(filterType, updatedValues)
      return
    }

    const currentValues = props.filters.filters[filterType] || []
    const updatedValues = currentValues.includes(key)
      ? currentValues.filter((v: string) => v !== key)
      : [...currentValues, key]

    handleFiltersChange(filterType, updatedValues)
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

  const [priceFrom, setPriceFrom] = useState(
    props.filters.filters.price.from || ''
  )
  const [priceTo, setPriceTo] = useState(props.filters.filters.price.to || '')

  const onPriceFromChange = (e: any) => {
    setPriceFrom(e.target.value)
    handleFiltersChange('price', { from: e.target.value, to: priceTo })
  }

  const onPriceToChange = (e: any) => {
    setPriceTo(e.target.value)
    handleFiltersChange('price', { from: priceFrom, to: e.target.value })
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
            >
              <input
                type="number"
                placeholder="From"
                value={priceFrom}
                onChange={onPriceFromChange}
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
                onChange={onPriceToChange}
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
                  onClick={() => toggleFilter('bedroom', bedroom.key)}
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
                  onClick={() => toggleFilter('bathroom', bathroom.key)}
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
                  onClick={() => toggleFilter('amenities', amenity.key)}
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
                  onClick={() => toggleFilter('additionally', additional.key)}
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
          <button
            className={styles.modalFooter__confirm}
            onClick={props.toggleModal}
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  )
}
