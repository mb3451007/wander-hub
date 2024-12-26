import React, { useState, useEffect } from 'react'
import styles from './filterBox.module.scss'
import House from '@/app/icons/House'
import Map from '@/app/icons/Map'
interface filterBoxProps {
  filters: any

  toggleModal: () => void
}
export default function filterBox({ toggleModal, filters }: filterBoxProps) {
  const [isFieldOpen, setIsFieldOpen] = useState(false)

  useEffect(() => {
    console.log('isFieldOpen', isFieldOpen)
  }, [isFieldOpen])

  function openField() {
    const parentCont = document.getElementById('parentCont')
    const openedCont = document.getElementById('openedCont')
    if (parentCont && openedCont) {
      parentCont.style.display = 'none'
      openedCont.style.display = 'flex'
    }
  }

  function closeField() {
    const parentCont = document.getElementById('parentCont')
    const openedCont = document.getElementById('openedCont')
    if (parentCont && openedCont) {
      parentCont.style.display = 'flex'
      openedCont.style.display = 'none'
    }
  }

  function checkViewportWidth() {
    const viewportWidth = window.innerWidth
    if (viewportWidth > 767) {
      const elementsToHide = ['parentCont', 'openedCont']
      elementsToHide.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          element.style.display = 'none'
        }
      })
    }
    if (viewportWidth <= 767) {
      const element = document.getElementById('parentCont')
      if (element) {
        element.style.display = 'flex'
      }
    }
  }

  // Check on load
  checkViewportWidth()

  // Check on resize
  window.addEventListener('resize', checkViewportWidth)

  return (
    <>
      <div
        id="parentCont"
        className={styles.parentCont}
      >
        <div className={styles.parentCont__container}>
          <div
            className={styles.parentCont__container__desc}
            onClick={() => {
              openField()
              setIsFieldOpen(true)
            }}
          >
            <div className={styles.parentCont__container__desc__location}>
              {filters.filters.stay.length > 0
                ? `${filters.filters.stay[0]}`
                : 'Stay'}
              ,
              {filters.filters.location.length > 0
                ? `${filters.filters.location[0]}`
                : 'Location'}
            </div>
            <div className={styles.parentCont__container__desc__price}>
              {filters.filters.price.from !== '' &&
              filters.filters.price.to !== ''
                ? `$ ${filters.filters.price.from} - $ ${filters.filters.price.to}`
                : ''}
            </div>
          </div>
          <div
            className={styles.parentCont__container__icon}
            onClick={() => toggleModal()}
          >
            {House()}
          </div>
        </div>
      </div>

      <div
        id="openedCont"
        className={styles.openedParentContainer}
      >
        <div className={styles.openedParentContainer__container}>
          <div className={styles.openedParentContainer__container__line}></div>
          <div className={styles.openedParentContainer__container__fields}>
            <div
              className={
                styles.openedParentContainer__container__fields__apartment
              }
              onClick={() => {
                closeField()
                toggleModal()
              }}
            >
              <div
                className={
                  styles.openedParentContainer__container__fields__apartment__tag
                }
              >
                Apartment
              </div>
              <div
                className={
                  styles.openedParentContainer__container__fields__apartment__icon
                }
                onClick={(e) => e.stopPropagation()}
              >
                {House()}
              </div>
            </div>
            <div
              className={
                styles.openedParentContainer__container__fields__location
              }
            >
              <input
                className={
                  styles.openedParentContainer__container__fields__location__tag
                }
                style={{
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  outline: 'none',
                }}
                placeholder="Location"
              />

              <div
                className={
                  styles.openedParentContainer__container__fields__location__icon
                }
              >
                {Map()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
