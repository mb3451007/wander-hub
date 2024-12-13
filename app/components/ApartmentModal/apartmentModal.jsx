import React, { useState, useEffect } from 'react'
import styles from './apartmentModal.module.scss'
import Close from '@/app/icons/Close'

export default function ApartmentModal({ toggleModal }) {
  const objets = ['Apartment', 'Villa', 'GuestHouse', 'Room', 'Hotel']
  return (
    <div className={styles.apartmentModal}>
      <div className={styles.modalHeaderNonSticky}>
        <div className={styles.modalHeader__modalHeaderSubContainer}>
          <p>Choose Object</p>
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
      <form className={styles.sortModalSubContainer__form}>
        {objets.map((obj) => {
          return (
            <>
              <div
                key={obj}
                className={styles.sortModalSubContainer__form__radioContainer}
              >
                <label>
                  {obj}
                  <input type="checkbox" />
                </label>
              </div>
              <div className={styles.sortModalSubContainer__form}>
                <hr
                  className={styles.sortModalSubContainer__form__verticalLine}
                />
              </div>
            </>
          )
        })}
      </form>

      <div className={styles.confirmButtonContainer}>
        <button onClick={toggleModal}>Done</button>
      </div>
    </div>
  )
}
