import React, { useEffect, useState } from 'react'
import styles from './customDropdown.module.scss'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
const animatedComponents = makeAnimated()
export default function customDropdown() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      maxWidth: '100%',
    }),
    valueContainer: (provided: any) => ({
      ...provided,

      flexWrap: 'nowrap',
      overflow: 'auto',
    }),
  }
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      styles={customStyles}
    />
  )
}
