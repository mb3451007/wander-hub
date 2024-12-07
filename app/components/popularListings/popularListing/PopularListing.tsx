import Bed from '@/app/icons/Bed'
import Image from 'next/image'
import { ListingDTO } from '@/app/models/dtos/ListingDTO'
import Location from '@/app/icons/Location'
import React, { useEffect, useState } from 'react'
import Shower from '@/app/icons/Shower'
import styles from './PopularListing.module.scss'
import image1 from '../../../../assets/search-results-card-img.jpeg'
import image2 from '../../../../assets/apartment-sample.jpeg'
import image3 from '../../../../assets/apartment.jpeg'
import image4 from '../../../../assets/bike.jpeg'
import image5 from '../../../../assets/room.jpeg'
import Pagination from '../../resultCard/pagination/pagination'
import Heart from '@/app/icons/Heart'
import Arrow from '@/app/icons/Arrow'

interface PopularListingProps {
  listing: ListingDTO
  page: string
}

const titleCase = (s: string) => `${s[0].toUpperCase()}${s.substring(1)}`

const baseCurrencyFormat: Intl.NumberFormatOptions = {
  currency: 'USD',
  style: 'currency',
  currencySign: 'accounting',
  currencyDisplay: 'symbol',
  minimumFractionDigits: 0,
}

const currencyFormaters = {
  USD: Intl.NumberFormat('en-US', {
    ...baseCurrencyFormat,
    currency: 'USD',
  }),
  IDR: Intl.NumberFormat('en-US', {
    ...baseCurrencyFormat,
    currency: 'USD',
  }),
}

export default function PopularListing(props: PopularListingProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const images = props.listing.images
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrevious = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }
  if (props.page === 'home') {
    return (
      <div className={styles.popularListing}>
        {/* <Image
          className={styles.popularListing__image}
          width={390}
          height={358}
          alt={props.listing.title}
          src={props.listing.images[0]}
        /> */}

        <div className={styles.popularListing__image}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.popularListing__image__inner} ${
                index === activeIndex ? styles.active : ''
              }`}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          ))}
          <Pagination
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <div className={styles.popularListing__image__arrows}>
            <div
              className={styles.popularListing__image__arrows__arrowContainer}
            >
              <div
                className={
                  styles.popularListing__image__arrows__arrowContainer__arrowLeft
                }
                onClick={handlePrevious}
              >
                {Arrow()}
              </div>
            </div>
            <div
              className={styles.popularListing__image__arrows__arrowContainer}
            >
              <div
                className={
                  styles.popularListing__image__arrows__arrowContainer__arrowRight
                }
                onClick={handleNext}
              >
                {Arrow()}
              </div>
            </div>
          </div>
        </div>

        <h4 className={styles.popularListing__title}>
          {`${props.listing.title} - ${titleCase(props.listing.listingType)}`}
        </h4>

        <div className={styles.popularListing__details}>
          <div className={styles.popularListing__details__detail}>
            {Bed()}
            <p>{props.listing.roomCount} rooms</p>
          </div>

          <div className={styles.popularListing__details__detail}>
            {Shower()}
            <p>{props.listing.bathroomCount} bathrooms</p>
          </div>

          <div className={styles.popularListing__details__detail}>
            {Location()}
            <p>{props.listing.location}</p>
          </div>

          <div className={styles.popularListing__details__lowestOffer}>
            From{' '}
            {currencyFormaters[
              props.listing.lowestOffer.price.currencyISO
            ].format(props.listing.lowestOffer.price.value)}
            /{props.listing.lowestOffer.duration}
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.card}>
        <div className={styles.card__heartLargeScreen}>
          <div className={styles.card__heart__icon}>{Heart()}</div>
        </div>

        <div className={styles.card__bgIMG}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.popularListing__image__inner} ${
                index === activeIndex ? styles.active : ''
              }`}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          ))}
          <div className={styles.card__heart}>
            <div className={styles.card__heart__icon}>{Heart()}</div>
          </div>
          <Pagination
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <div className={styles.card__arrows}>
            <div className={styles.card__arrows__arrowContainer}>
              <div
                className={styles.card__arrows__arrowContainer__arrowLeft}
                onClick={handlePrevious}
              >
                {Arrow()}
              </div>
            </div>
            <div className={styles.card__arrows__arrowContainer}>
              <div
                className={styles.card__arrows__arrowContainer__arrowRight}
                onClick={handleNext}
              >
                {Arrow()}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card__cardContent}>
          <div className={styles.card__cardContent__topSec}>
            <div className={styles.card__cardContent__topSec__header}>
              {`${props.listing.title} - ${titleCase(props.listing.listingType)}`}
            </div>
            <div className={styles.card__cardContent__topSec__desc}>
              <div className={styles.card__cardContent__topSec__desc__rooms}>
                {Bed()}
                <div
                  className={
                    styles.card__cardContent__topSec__desc__rooms__name
                  }
                >
                  {props.listing.roomCount} rooms
                </div>
              </div>
              <div
                className={styles.card__cardContent__topSec__desc__bathrooms}
              >
                {Shower()}
                <div
                  className={
                    styles.card__cardContent__topSec__desc__bathrooms__name
                  }
                >
                  {props.listing.bathroomCount} bathrooms
                </div>
              </div>
            </div>
            <div className={styles.card__cardContent__topSec__location}>
              {Location()}
              <div className={styles.card__cardContent__topSec__location__name}>
                {props.listing.location}
              </div>
            </div>
          </div>

          <div className={styles.card__cardContent__midSec}>
            {props.listing.description}
          </div>

          <div className={styles.card__cardContent__bottomSec}>
            From {props.listing.lowestOffer.price.value}$/
            {props.listing.lowestOffer.duration}
          </div>
        </div>
      </div>
    )
  }
}
