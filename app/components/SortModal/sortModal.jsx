import React, { useState, useEffect } from 'react'
import styles from './sortModal.module.scss'
import Close from '@/app/icons/Close'

export default function SortModal({ toggleModal, filters }) {
  return (
    <div className={styles.sortModal}>
      <div className={styles.sortModalSubContainer__innerContainer}>
        <hr
          className={
            styles.sortModalSubContainer__innerContainer__quarterVerticalLine
          }
        />
      </div>
      <div
        className={styles.sortModalSubContainer__closeButtonContainer}
        onClick={toggleModal}
      >
        <div> {Close()}</div>
      </div>
      <div className={styles.sortModalSubContainer__headingContainer}>
        <p>Sort By</p>
      </div>

      <form className={styles.sortModalSubContainer__form}>
        <div className={styles.sortModalSubContainer__form__radioContainer}>
          <label>
            Date (Old to New)
            <input
              type="radio"
              name="sortOption"
              value="dateOldToNew"
            />
          </label>
        </div>
        <div className={styles.sortModalSubContainer__form}>
          <hr className={styles.sortModalSubContainer__form__verticalLine} />
        </div>
        <div className={styles.sortModalSubContainer__form__radioContainer}>
          <label>
            Date (New to Old)
            <input
              type="radio"
              name="sortOption"
              value="dateNewToOld"
            />
          </label>
        </div>
        <div className={styles.sortModalSubContainer__form}>
          <hr className={styles.sortModalSubContainer__form__verticalLine} />
        </div>
        <div className={styles.sortModalSubContainer__form__radioContainer}>
          <label>
            Price (Highest)
            <input
              type="radio"
              name="sortOption"
              value="priceHighest"
            />
          </label>
        </div>
        <div className={styles.sortModalSubContainer__form}>
          <hr className={styles.sortModalSubContainer__form__verticalLine} />
        </div>
        <div className={styles.sortModalSubContainer__form__radioContainer}>
          <label>
            Price (Lowest)
            <input
              type="radio"
              name="sortOption"
              value="priceLowest"
            />
          </label>
        </div>
        <div className={styles.sortModalSubContainer__form}>
          <hr className={styles.sortModalSubContainer__form__verticalLine} />
        </div>
      </form>
    </div>
  )
}
