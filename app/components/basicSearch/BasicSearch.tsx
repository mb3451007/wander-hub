'use client'

import BikeBasicSearch, {
  BikeSearchParameters,
} from './bikeBasicSearch/BikeBasicSearch'
import HousingBasicSearch, {
  HousingSearchParameters,
} from './housingBasicSearch/HousingBasicSearch'
import Bike from '@/app/icons/Bike'
import React from 'react'
import Stay from '@/app/icons/Stay'
import Tabbed from '../tabbed/Tabbed'
import styles from './BasicSearch.module.scss'

export default function BasicSearch() {
  const setHousingParameters = (
    houseSearchParameters: HousingSearchParameters
  ) => {
    console.log('Housing parameters', houseSearchParameters)
  }

  const setBikeParameters = (bikeSearchParameters: BikeSearchParameters) => {
    console.log('Bike search parameters', bikeSearchParameters)
  }

  return (
    <div className={styles.searchForm}>
      <Tabbed
        tabs={[
          {
            name: 'Stay',
            icon: <Stay />,
            tab: (
              <HousingBasicSearch
                onChange={setHousingParameters}
                key={'stay'}
              />
            ),
          },
          {
            name: 'Bike',
            icon: <Bike />,
            tab: (
              <BikeBasicSearch
                onChange={setBikeParameters}
                key={'bike'}
              />
            ),
          },
        ]}
      />
    </div>
  )
}
