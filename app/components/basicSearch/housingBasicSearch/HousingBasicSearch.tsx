/* eslint-disable sort-imports */
import React, { useEffect, useState } from 'react'

import House from '@/app/icons/House'

import styles from './HousingBasicSearch.module.scss'
import { housingTypes } from '@/app/utils/housingTypes'
import { optionsFromTranslated } from '@/app/utils/options'
import {
  LabeledSelectRemoteOptions,
  LabeledSelectStaticOptions,
} from '../../labeledInput/labeledSelect/LabeledSelect'
import Map from '@/app/icons/Map'
import { getLocations } from '@/app/clients/locationsApi'
import PriceInput from '../../labeledInput/priceInput/PriceInput'
import Button from '../../button/Button'

export interface HousingSearchParameters {
  housingType: string
  location: string
  // TODO Should be money i.e. with currency
  minPrice: number
  maxPrice: number
}

interface HousingBasicSearchProps {
  onChange: (params: HousingSearchParameters) => void
}
interface Option {
  value: string
  label: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function HousingBasicSearch(_props: HousingBasicSearchProps) {
  const [housingType, setHousingType] = useState<Option | null>(null)
  const [location, setLocation] = useState<Option | null>(null)

  useEffect(() => {
    console.log(housingType, location)
  }, [housingType, location])

  return (
    <form className={styles.housingBasicSearch}>
      <LabeledSelectStaticOptions
        icon={<House />}
        label={'Looking for'}
        placeHolder={'What to look for?'}
        options={optionsFromTranslated('en')(housingTypes)}
        onSelection={(housingType) => setHousingType(housingType)}
      />

      <LabeledSelectRemoteOptions
        optionsFetcher={async function (input: string): Promise<Option[]> {
          const locations = await getLocations(input)
          return optionsFromTranslated('en')(locations)
        }}
        icon={<Map />}
        label={'Location'}
        placeHolder={'Choose Location'}
        onSelection={(location) => setLocation(location)}
      />

      <PriceInput />

      <Button
        className={styles.housingBasicSearch__button}
        text={'Search'}
        onClick={() => console.log('Searching for')}
      />
    </form>
  )
}
