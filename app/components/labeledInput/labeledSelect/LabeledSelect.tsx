/* eslint-disable sort-imports */
import idFromString from '@/app/utils/idFromString'
import React from 'react'
import Select, { StylesConfig } from 'react-select'
import styles from './LabeledSelect.module.scss'
import AsyncSelect from 'react-select/async'
import LabeledInput from '../LabeledInput'

interface Option {
  value: string
  label: string
}

interface CommonLabeledSelectProps {
  icon: JSX.Element
  label: string
  placeHolder: string
  onSelection: (selection: Option) => void
}

type FixedOptionsProps = {
  options: Option[]
} & CommonLabeledSelectProps

type RemoteOptionsProps = {
  optionsFetcher: (input: string) => Promise<Option[]>
} & CommonLabeledSelectProps

const reactSelectStylesConfig: StylesConfig = {
  control: (baseStyles) => ({
    ...baseStyles,
    borderRadius: '8px',
    border: '1.5px solid var(--grey-30, rgba(143, 143, 143, 0.30))',
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: 'var(--black-30, rgba(0, 0, 0, 0.30))',
    fontFamily: 'Lato',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '18px',
    letterSpacing: '0.28px',
  }),
}

export function LabeledSelectStaticOptions(props: FixedOptionsProps) {
  const inputId = `${idFromString(props.label)}-input`

  return (
    <LabeledInput
      {...props}
      inputField={
        <Select
          id={inputId}
          name={inputId}
          options={props.options}
          components={{
            DropdownIndicator: () => (
              <div className={styles.labeledSelect__icon}>{props.icon}</div>
            ),
            IndicatorSeparator: () => <></>,
          }}
          onChange={(newValue: unknown) => {
            if (newValue) props.onSelection(newValue as Option)
          }}
          styles={reactSelectStylesConfig}
          placeholder={props.placeHolder}
        />
      }
    />
  )
}

export function LabeledSelectRemoteOptions(props: RemoteOptionsProps) {
  const inputId = `${idFromString(props.label)}-input`

  return (
    <LabeledInput
      {...props}
      inputField={
        <AsyncSelect
          id={inputId}
          name={inputId}
          components={{
            DropdownIndicator: () => (
              <div className={styles.labeledSelect__icon}>{props.icon}</div>
            ),
            IndicatorSeparator: () => <></>,
          }}
          loadOptions={(
            input: string,
            callback: (options: Option[]) => void
          ) => {
            props
              .optionsFetcher(input)
              .then(callback, (error) =>
                console.error('Failed to fetch options', error)
              )
          }}
          onChange={(newValue) => {
            if (newValue) props.onSelection(newValue as Option)
          }}
          styles={reactSelectStylesConfig}
          placeholder={props.placeHolder}
        />
      }
    />
  )
}
