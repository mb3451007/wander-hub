import React, { useState } from 'react'
import Pagination from '../pagination/pagination'
import image1 from '../../../../assets/search-results-card-img.jpeg'
import image2 from '../../../../assets/apartment-sample.jpeg'
import image3 from '../../../../assets/apartment.jpeg'
import image4 from '../../../../assets/bike.jpeg'
import image5 from '../../../../assets/room.jpeg'
import styles from './card.module.scss'

export default function card() {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = [image1.src, image2.src, image3.src, image4.src, image5.src]

  return (
    <div className={styles.card}>
      <div className={styles.card__heartLargeScreen}>
        <div className={styles.card__heart__icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 2.95375C6.5005 1.20623 3.99481 0.666176 2.11602 2.26638C0.237233 3.86658 -0.0272752 6.54201 1.44815 8.43459C2.67487 10.0081 6.38733 13.3268 7.60408 14.401C7.74017 14.5212 7.80825 14.5813 7.88767 14.6048C7.95692 14.6254 8.03275 14.6254 8.10208 14.6048C8.1815 14.5813 8.2495 14.5212 8.38567 14.401C9.60242 13.3268 13.3148 10.0081 14.5416 8.43459C16.017 6.54201 15.7848 3.84974 13.8737 2.26638C11.9626 0.68301 9.4995 1.20623 8 2.95375Z"
              stroke="black"
              strokeOpacity="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div
        className={styles.card__bgIMG}
        style={{
          background: `url(${images[activeIndex]}) lightgray 50% / cover no-repeat`,
        }}
      >
        <div className={styles.card__heart}>
          <div className={styles.card__heart__icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 2.95375C6.5005 1.20623 3.99481 0.666176 2.11602 2.26638C0.237233 3.86658 -0.0272752 6.54201 1.44815 8.43459C2.67487 10.0081 6.38733 13.3268 7.60408 14.401C7.74017 14.5212 7.80825 14.5813 7.88767 14.6048C7.95692 14.6254 8.03275 14.6254 8.10208 14.6048C8.1815 14.5813 8.2495 14.5212 8.38567 14.401C9.60242 13.3268 13.3148 10.0081 14.5416 8.43459C16.017 6.54201 15.7848 3.84974 13.8737 2.26638C11.9626 0.68301 9.4995 1.20623 8 2.95375Z"
                stroke="black"
                strokeOpacity="0.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <Pagination
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <div className={styles.card__arrows}>
          <div className={styles.card__arrows__arrowContainer}>
            <div className={styles.card__arrows__arrowContainer__arrowLeft}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M7.10091 12.5561L14.6009 5.0561C14.7075 4.95674 14.8486 4.90265 14.9943 4.90522C15.14 4.90779 15.2791 4.96683 15.3821 5.06989C15.4852 5.17295 15.5442 5.31199 15.5468 5.45771C15.5494 5.60344 15.4953 5.74447 15.3959 5.8511L8.29434 12.9536L15.3959 20.0561C15.4953 20.1627 15.5494 20.3038 15.5468 20.4495C15.5442 20.5952 15.4852 20.7343 15.3821 20.8373C15.2791 20.9404 15.14 20.9994 14.9943 21.002C14.8486 21.0046 14.7075 20.9505 14.6009 20.8511L7.10091 13.3511C6.99557 13.2456 6.9364 13.1027 6.9364 12.9536C6.9364 12.8045 6.99557 12.6616 7.10091 12.5561Z"
                  fill="#343330"
                />
              </svg>
            </div>
          </div>
          <div className={styles.card__arrows__arrowContainer}>
            <div className={styles.card__arrows__arrowContainer__arrowRight}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M7.10091 12.5561L14.6009 5.0561C14.7075 4.95674 14.8486 4.90265 14.9943 4.90522C15.14 4.90779 15.2791 4.96683 15.3821 5.06989C15.4852 5.17295 15.5442 5.31199 15.5468 5.45771C15.5494 5.60344 15.4953 5.74447 15.3959 5.8511L8.29434 12.9536L15.3959 20.0561C15.4953 20.1627 15.5494 20.3038 15.5468 20.4495C15.5442 20.5952 15.4852 20.7343 15.3821 20.8373C15.2791 20.9404 15.14 20.9994 14.9943 21.002C14.8486 21.0046 14.7075 20.9505 14.6009 20.8511L7.10091 13.3511C6.99557 13.2456 6.9364 13.1027 6.9364 12.9536C6.9364 12.8045 6.99557 12.6616 7.10091 12.5561Z"
                  fill="#343330"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card__cardContent}>
        <div className={styles.card__cardContent__topSec}>
          <div className={styles.card__cardContent__topSec__header}>
            The Wave Studios - Apartment
          </div>
          <div className={styles.card__cardContent__topSec__desc}>
            <div className={styles.card__cardContent__topSec__desc__rooms}>
              <div
                className={styles.card__cardContent__topSec__desc__rooms__logo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M6 9.95361H10"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 3.95361V21.9536M21 17.9536V21.9536M21 17.9536H3M21 17.9536V14.9536C21 13.849 20.1046 12.9536 19 12.9536H3"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className={styles.card__cardContent__topSec__desc__rooms__name}
              >
                2 rooms
              </div>
            </div>
            <div className={styles.card__cardContent__topSec__desc__bathrooms}>
              <div
                className={
                  styles.card__cardContent__topSec__desc__bathrooms__logo
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <g clipPath="url(#clip0_828_9300)">
                    <path
                      d="M21.75 14.0786H3.75V5.64111C3.74913 5.32336 3.81129 5.0086 3.9329 4.71503C4.0545 4.42147 4.23312 4.15494 4.45842 3.93088L4.47717 3.91213C4.83026 3.55956 5.2836 3.32459 5.77524 3.23933C6.26688 3.15408 6.77286 3.22268 7.22405 3.43578C6.79794 4.14425 6.62083 4.9748 6.72086 5.79546C6.82089 6.61612 7.19233 7.37981 7.77614 7.96518L8.28947 8.4785L7.34461 9.42341L8.4052 10.484L9.35006 9.53914L14.5855 4.30382L15.5303 3.35896L14.4697 2.29832L13.5248 3.24318L13.0115 2.72985C12.3969 2.11697 11.5867 1.73917 10.7222 1.66228C9.85764 1.5854 8.99353 1.8143 8.28042 2.3091C7.52846 1.83421 6.63734 1.6292 5.75346 1.72774C4.86958 1.82628 4.04549 2.22252 3.41658 2.85135L3.39783 2.8701C3.03279 3.23314 2.74338 3.66499 2.54635 4.14063C2.34933 4.61628 2.2486 5.12628 2.25 5.64111V14.0786H0.75V15.5786H2.25V17.0177C2.24997 17.1386 2.26947 17.2587 2.30775 17.3734L3.70312 21.5593C3.77759 21.7835 3.92078 21.9784 4.11235 22.1165C4.30392 22.2546 4.53413 22.3288 4.77028 22.3286H5.37497L4.82812 24.2036H6.39061L6.9375 22.3286H16.6922L17.2547 24.2036H18.8203L18.2578 22.3286H19.2295C19.4657 22.3288 19.696 22.2546 19.8876 22.1165C20.0792 21.9785 20.2224 21.7835 20.2969 21.5593L21.6922 17.3734C21.7304 17.2587 21.75 17.1386 21.75 17.0177V15.5786H23.25V14.0786H21.75ZM8.83687 3.79049C9.25012 3.37814 9.81007 3.14656 10.3939 3.14656C10.9776 3.14656 11.5376 3.37814 11.9508 3.79049L12.4641 4.30382L9.3502 7.41768L8.83687 6.90444C8.42455 6.49118 8.19298 5.93124 8.19298 5.34746C8.19298 4.76369 8.42455 4.20375 8.83687 3.79049ZM20.25 16.9567L18.9594 20.8286H5.04056L3.75 16.9567V15.5786H20.25V16.9567Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_828_9300">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.953613)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div
                className={
                  styles.card__cardContent__topSec__desc__bathrooms__name
                }
              >
                2 bathrooms
              </div>
            </div>
          </div>
          <div className={styles.card__cardContent__topSec__location}>
            <div className={styles.card__cardContent__topSec__location__logo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M4 11.0969C4 6.59949 7.58172 2.95361 12 2.95361C16.4183 2.95361 20 6.59949 20 11.0969C20 15.5591 17.4467 20.766 13.4629 22.628C12.5343 23.0621 11.4657 23.0621 10.5371 22.628C6.55332 20.766 4 15.5591 4 11.0969Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 13.9536C13.6569 13.9536 15 12.6105 15 10.9536C15 9.29676 13.6569 7.95361 12 7.95361C10.3431 7.95361 9 9.29676 9 10.9536C9 12.6105 10.3431 13.9536 12 13.9536Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className={styles.card__cardContent__topSec__location__name}>
              Canggu
            </div>
          </div>
        </div>

        <div className={styles.card__cardContent__midSec}>
          Our apartment features a sleek and modern design, with clean lines and
          upscale finishes that create a welcoming and elegant ambiance.
        </div>

        <div className={styles.card__cardContent__bottomSec}>From 50$/day</div>
      </div>
    </div>
  )
}
