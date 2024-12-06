import LabeledInput from '../LabeledInput'
import React from 'react'
import styles from './PriceInput.module.scss'

export default function PriceInput() {
  return (
    <LabeledInput
      label={'Price'}
      inputField={
        <div className={styles.priceInputs}>
          <input
            className={styles.priceInputs__currencyInput}
            id={'price'}
            type={'text'}
            inputMode={'numeric'}
            pattern={'[0-9]*'}
            placeholder={'From'}
          />
          <p className={styles.priceInputs__currency}>₽</p>

          <input
            id={'max-price'}
            className={styles.priceInputs__currencyInput}
            type={'text'}
            inputMode={'numeric'}
            pattern={'[0-9]*'}
            placeholder={'To'}
          />
          <p className={styles.priceInputs__currency}>₽</p>
        </div>
      }
    />
  )
}
