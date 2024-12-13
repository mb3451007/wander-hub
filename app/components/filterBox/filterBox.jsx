import React, { useState, useEffect } from 'react'
import styles from './filterBox.module.scss'

export default function filterBox({ toggleModal, filters }) {
  const [isFieldOpen, setIsFieldOpen] = useState(false)

  useEffect(() => {
    console.log('isFieldOpen', isFieldOpen)
  }, [isFieldOpen])

  function openField() {
    const parentCont = document.getElementById('parentCont')
    const openedCont = document.getElementById('openedCont')
    parentCont.style.display = 'none'
    openedCont.style.display = 'flex'
  }

  function closeField() {
    const parentCont = document.getElementById('parentCont')
    const openedCont = document.getElementById('openedCont')
    parentCont.style.display = 'flex'
    openedCont.style.display = 'none'
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
              Apartment, Canggu
            </div>
            <div className={styles.parentCont__container__desc__price}>
              {filters.filters.price.from !== '' &&
              filters.filters.price.to !== ''
                ? `$ ${filters.filters.price.from} - $ ${filters.filters.price.to}`
                : ''}
            </div>
          </div>
          <div className={styles.parentCont__container__icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.5603 10.1887L13.0603 2.68875C12.779 2.40766 12.3977 2.24976 12 2.24976C11.6024 2.24976 11.221 2.40766 10.9397 2.68875L3.4397 10.1887C3.29973 10.3277 3.18878 10.493 3.1133 10.6752C3.03782 10.8574 2.99931 11.0528 3.00001 11.25V20.25C3.00001 20.4489 3.07903 20.6397 3.21968 20.7803C3.36033 20.921 3.5511 21 3.75001 21H9.75001C9.94892 21 10.1397 20.921 10.2803 20.7803C10.421 20.6397 10.5 20.4489 10.5 20.25V15H13.5V20.25C13.5 20.4489 13.579 20.6397 13.7197 20.7803C13.8603 20.921 14.0511 21 14.25 21H20.25C20.4489 21 20.6397 20.921 20.7803 20.7803C20.921 20.6397 21 20.4489 21 20.25V11.25C21.0007 11.0528 20.9622 10.8574 20.8867 10.6752C20.8112 10.493 20.7003 10.3277 20.5603 10.1887ZM19.5 19.5H15V14.25C15 14.0511 14.921 13.8603 14.7803 13.7197C14.6397 13.579 14.4489 13.5 14.25 13.5H9.75001C9.5511 13.5 9.36033 13.579 9.21968 13.7197C9.07903 13.8603 9.00001 14.0511 9.00001 14.25V19.5H4.50001V11.25L12 3.75L19.5 11.25V19.5Z"
                fill="black"
              />
            </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.5603 10.1887L13.0603 2.68875C12.779 2.40766 12.3977 2.24976 12 2.24976C11.6024 2.24976 11.221 2.40766 10.9397 2.68875L3.4397 10.1887C3.29973 10.3277 3.18878 10.493 3.1133 10.6752C3.03782 10.8574 2.99931 11.0528 3.00001 11.25V20.25C3.00001 20.4489 3.07903 20.6397 3.21968 20.7803C3.36033 20.921 3.5511 21 3.75001 21H9.75001C9.94892 21 10.1397 20.921 10.2803 20.7803C10.421 20.6397 10.5 20.4489 10.5 20.25V15H13.5V20.25C13.5 20.4489 13.579 20.6397 13.7197 20.7803C13.8603 20.921 14.0511 21 14.25 21H20.25C20.4489 21 20.6397 20.921 20.7803 20.7803C20.921 20.6397 21 20.4489 21 20.25V11.25C21.0007 11.0528 20.9622 10.8574 20.8867 10.6752C20.8112 10.493 20.7003 10.3277 20.5603 10.1887ZM19.5 19.5H15V14.25C15 14.0511 14.921 13.8603 14.7803 13.7197C14.6397 13.579 14.4489 13.5 14.25 13.5H9.75001C9.5511 13.5 9.36033 13.579 9.21968 13.7197C9.07903 13.8603 9.00001 14.0511 9.00001 14.25V19.5H4.50001V11.25L12 3.75L19.5 11.25V19.5Z"
                    fill="black"
                  />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10.5 7.5C10.5 7.20333 10.588 6.91332 10.7528 6.66665C10.9176 6.41997 11.1519 6.22771 11.426 6.11418C11.7001 6.00065 12.0017 5.97094 12.2926 6.02882C12.5836 6.0867 12.8509 6.22956 13.0607 6.43934C13.2704 6.64912 13.4133 6.91639 13.4712 7.20736C13.5291 7.49834 13.4994 7.79994 13.3858 8.07403C13.2723 8.34811 13.08 8.58238 12.8334 8.7472C12.5867 8.91203 12.2967 9 12 9C11.6022 9 11.2206 8.84196 10.9393 8.56066C10.658 8.27936 10.5 7.89782 10.5 7.5ZM6 7.5C6 5.9087 6.63214 4.38258 7.75736 3.25736C8.88258 2.13214 10.4087 1.5 12 1.5C13.5913 1.5 15.1174 2.13214 16.2426 3.25736C17.3679 4.38258 18 5.9087 18 7.5C18 13.1203 12.6019 16.2694 12.375 16.4016C12.2617 16.4663 12.1334 16.5004 12.0028 16.5004C11.8723 16.5004 11.744 16.4663 11.6306 16.4016C11.3981 16.2694 6 13.125 6 7.5ZM7.5 7.5C7.5 11.4563 10.86 14.0822 12 14.8594C13.1391 14.0831 16.5 11.4563 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3C10.8065 3 9.66193 3.47411 8.81802 4.31802C7.97411 5.16193 7.5 6.30653 7.5 7.5ZM19.0097 13.8403C18.8251 13.7793 18.624 13.7924 18.4489 13.8768C18.2738 13.9612 18.1382 14.1102 18.0709 14.2926C18.0035 14.475 18.0096 14.6764 18.0879 14.8543C18.1661 15.0323 18.3104 15.1729 18.4903 15.2466C20.0381 15.8194 21 16.5863 21 17.25C21 18.5025 17.5763 20.25 12 20.25C6.42375 20.25 3 18.5025 3 17.25C3 16.5863 3.96187 15.8194 5.50969 15.2475C5.6896 15.1739 5.8339 15.0332 5.91215 14.8553C5.99039 14.6773 5.99648 14.4759 5.92913 14.2935C5.86178 14.1112 5.72624 13.9621 5.5511 13.8777C5.37596 13.7933 5.17491 13.7803 4.99031 13.8412C2.73937 14.6709 1.5 15.8822 1.5 17.25C1.5 20.1731 6.91031 21.75 12 21.75C17.0897 21.75 22.5 20.1731 22.5 17.25C22.5 15.8822 21.2606 14.6709 19.0097 13.8403Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
