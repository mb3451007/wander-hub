import React, { useState, useEffect } from 'react'
import styles from './sortFields.module.scss'

export default function sortFields({ onChange, clearedFilter }) {
  const [date, setDate] = useState('')
  const [stay, setStay] = useState('')
  const [location, setLocation] = useState('')
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  useEffect(() => {
    if (clearedFilter) {
      console.log(
        'Cleared Filterss   sort Fields-------------- :',
        clearedFilter
      )
      if (clearedFilter.filterKey === 'stay') {
        setStay('')
      } else if (clearedFilter.filterKey === 'location') {
        setLocation('')
      } else if (clearedFilter.filterKey === 'price') {
        setPriceFrom('')
        setPriceTo('')
      } else if (clearedFilter.filterKey === 'date') {
        setDate('')
      }
      // Add your logic to clear fields in SortFields here
    }
  }, [clearedFilter])
  useEffect(() => {
    const sortObject = {
      stay,
      location,
      date,
      price: {
        from: priceFrom,
        to: priceTo,
      },
    }

    if (onChange) {
      onChange(sortObject)
    }
  }, [stay, location, date, priceFrom, priceTo, onChange])

  return (
    <div className={styles.container}>
      <div className={styles.container__sortFields}>
        <div className={styles.container__sortFields__upperSection}>
          <div className={styles.container__sortFields__results}>
            <span
              className={styles.container__sortFields__results__resultsFound}
            >
              9 Results Found
            </span>
            <span className={styles.container__sortFields__results__icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1 24"
                fill="none"
              >
                <line
                  x1="0.5"
                  x2="0.5"
                  y2="24"
                  stroke="black"
                />
              </svg>
            </span>
            <span className={styles.container__sortFields__results__sortBy}>
              Sort By:
            </span>
          </div>
          <select
            name="date"
            id="date"
            className={styles.container__sortFields__date}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          >
            <option
              value=""
              disabled
              selected
              className={styles.container__sortFields__date__text}
            >
              Date (old to new)
            </option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
          <div className={styles.container__sortFields__date__arrowIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.031 9.53062L12.531 17.0306C12.4614 17.1003 12.3787 17.1557 12.2876 17.1934C12.1966 17.2312 12.099 17.2506 12.0004 17.2506C11.9019 17.2506 11.8043 17.2312 11.7132 17.1934C11.6222 17.1557 11.5394 17.1003 11.4698 17.0306L3.96979 9.53062C3.82906 9.38988 3.75 9.19901 3.75 8.99999C3.75 8.80097 3.82906 8.61009 3.96979 8.46936C4.11052 8.32863 4.30139 8.24957 4.50042 8.24957C4.69944 8.24957 4.89031 8.32863 5.03104 8.46936L12.0004 15.4397L18.9698 8.46936C19.0395 8.39968 19.1222 8.34441 19.2132 8.30669C19.3043 8.26898 19.4019 8.24957 19.5004 8.24957C19.599 8.24957 19.6965 8.26898 19.7876 8.30669C19.8786 8.34441 19.9614 8.39968 20.031 8.46936C20.1007 8.53905 20.156 8.62177 20.1937 8.71282C20.2314 8.80386 20.2508 8.90144 20.2508 8.99999C20.2508 9.09854 20.2314 9.19612 20.1937 9.28716C20.156 9.37821 20.1007 9.46093 20.031 9.53062Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <div className={styles.container__sortFields__lowerSection}>
          <div className="">
            <select
              name="stay"
              id="stay"
              className={styles.container__sortFields__stay}
              value={stay}
              onChange={(event) => setStay(event.target.value)}
            >
              <option
                value=""
                disabled
                selected
                className={styles.container__sortFields__stay__text}
              >
                Stay
              </option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
            <div className={styles.container__sortFields__stay__arrowIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20.031 9.53062L12.531 17.0306C12.4614 17.1003 12.3787 17.1557 12.2876 17.1934C12.1966 17.2312 12.099 17.2506 12.0004 17.2506C11.9019 17.2506 11.8043 17.2312 11.7132 17.1934C11.6222 17.1557 11.5394 17.1003 11.4698 17.0306L3.96979 9.53062C3.82906 9.38988 3.75 9.19901 3.75 8.99999C3.75 8.80097 3.82906 8.61009 3.96979 8.46936C4.11052 8.32863 4.30139 8.24957 4.50042 8.24957C4.69944 8.24957 4.89031 8.32863 5.03104 8.46936L12.0004 15.4397L18.9698 8.46936C19.0395 8.39968 19.1222 8.34441 19.2132 8.30669C19.3043 8.26898 19.4019 8.24957 19.5004 8.24957C19.599 8.24957 19.6965 8.26898 19.7876 8.30669C19.8786 8.34441 19.9614 8.39968 20.031 8.46936C20.1007 8.53905 20.156 8.62177 20.1937 8.71282C20.2314 8.80386 20.2508 8.90144 20.2508 8.99999C20.2508 9.09854 20.2314 9.19612 20.1937 9.28716C20.156 9.37821 20.1007 9.46093 20.031 9.53062Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>

          <div className="">
            <select
              name="location"
              id="location"
              className={styles.container__sortFields__location}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <option
                value=""
                disabled
                selected
                className={styles.container__sortFields__location__text}
              >
                Location
              </option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
            <div className={styles.container__sortFields__location__arrowIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20.031 9.53062L12.531 17.0306C12.4614 17.1003 12.3787 17.1557 12.2876 17.1934C12.1966 17.2312 12.099 17.2506 12.0004 17.2506C11.9019 17.2506 11.8043 17.2312 11.7132 17.1934C11.6222 17.1557 11.5394 17.1003 11.4698 17.0306L3.96979 9.53062C3.82906 9.38988 3.75 9.19901 3.75 8.99999C3.75 8.80097 3.82906 8.61009 3.96979 8.46936C4.11052 8.32863 4.30139 8.24957 4.50042 8.24957C4.69944 8.24957 4.89031 8.32863 5.03104 8.46936L12.0004 15.4397L18.9698 8.46936C19.0395 8.39968 19.1222 8.34441 19.2132 8.30669C19.3043 8.26898 19.4019 8.24957 19.5004 8.24957C19.599 8.24957 19.6965 8.26898 19.7876 8.30669C19.8786 8.34441 19.9614 8.39968 20.031 8.46936C20.1007 8.53905 20.156 8.62177 20.1937 8.71282C20.2314 8.80386 20.2508 8.90144 20.2508 8.99999C20.2508 9.09854 20.2314 9.19612 20.1937 9.28716C20.156 9.37821 20.1007 9.46093 20.031 9.53062Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>

          <div className="">
            <input
              name="priceFrom"
              id="priceFrom"
              className={styles.container__sortFields__priceFrom}
              placeholder="Price (From)"
              value={priceFrom}
              onChange={(event) => setPriceFrom(event.target.value)}
            ></input>
            <div className={styles.container__sortFields__priceFrom__priceIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.5 13.375C14.6935 13.375 15.8381 12.8811 16.682 12.0021C17.5259 11.123 18 9.9307 18 8.6875C18 7.4443 17.5259 6.25201 16.682 5.37294C15.8381 4.49386 14.6935 4 13.5 4H9C8.84087 4 8.68826 4.06585 8.57574 4.18306C8.46321 4.30027 8.4 4.45924 8.4 4.625V12.125H6.6C6.44087 12.125 6.28826 12.1908 6.17574 12.3081C6.06321 12.4253 6 12.5842 6 12.75C6 12.9158 6.06321 13.0747 6.17574 13.1919C6.28826 13.3092 6.44087 13.375 6.6 13.375H8.4V14.625H6.6C6.44087 14.625 6.28826 14.6908 6.17574 14.8081C6.06321 14.9253 6 15.0842 6 15.25C6 15.4158 6.06321 15.5747 6.17574 15.6919C6.28826 15.8092 6.44087 15.875 6.6 15.875H8.4V18.375C8.4 18.5408 8.46321 18.6997 8.57574 18.8169C8.68826 18.9342 8.84087 19 9 19C9.15913 19 9.31174 18.9342 9.42426 18.8169C9.53679 18.6997 9.6 18.5408 9.6 18.375V15.875H13.2C13.3591 15.875 13.5117 15.8092 13.6243 15.6919C13.7368 15.5747 13.8 15.4158 13.8 15.25C13.8 15.0842 13.7368 14.9253 13.6243 14.8081C13.5117 14.6908 13.3591 14.625 13.2 14.625H9.6V13.375H13.5ZM9.6 5.25H13.5C14.3752 5.25 15.2146 5.61216 15.8335 6.25682C16.4523 6.90148 16.8 7.77582 16.8 8.6875C16.8 9.59918 16.4523 10.4735 15.8335 11.1182C15.2146 11.7628 14.3752 12.125 13.5 12.125H9.6V5.25Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>

          <div className="">
            <input
              name="priceTo"
              id="priceTo"
              className={styles.container__sortFields__priceTo}
              placeholder="Price (To)"
              value={priceTo}
              onChange={(event) => setPriceTo(event.target.value)}
            ></input>
            <div className={styles.container__sortFields__priceTo__priceIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.5 13.375C14.6935 13.375 15.8381 12.8811 16.682 12.0021C17.5259 11.123 18 9.9307 18 8.6875C18 7.4443 17.5259 6.25201 16.682 5.37294C15.8381 4.49386 14.6935 4 13.5 4H9C8.84087 4 8.68826 4.06585 8.57574 4.18306C8.46321 4.30027 8.4 4.45924 8.4 4.625V12.125H6.6C6.44087 12.125 6.28826 12.1908 6.17574 12.3081C6.06321 12.4253 6 12.5842 6 12.75C6 12.9158 6.06321 13.0747 6.17574 13.1919C6.28826 13.3092 6.44087 13.375 6.6 13.375H8.4V14.625H6.6C6.44087 14.625 6.28826 14.6908 6.17574 14.8081C6.06321 14.9253 6 15.0842 6 15.25C6 15.4158 6.06321 15.5747 6.17574 15.6919C6.28826 15.8092 6.44087 15.875 6.6 15.875H8.4V18.375C8.4 18.5408 8.46321 18.6997 8.57574 18.8169C8.68826 18.9342 8.84087 19 9 19C9.15913 19 9.31174 18.9342 9.42426 18.8169C9.53679 18.6997 9.6 18.5408 9.6 18.375V15.875H13.2C13.3591 15.875 13.5117 15.8092 13.6243 15.6919C13.7368 15.5747 13.8 15.4158 13.8 15.25C13.8 15.0842 13.7368 14.9253 13.6243 14.8081C13.5117 14.6908 13.3591 14.625 13.2 14.625H9.6V13.375H13.5ZM9.6 5.25H13.5C14.3752 5.25 15.2146 5.61216 15.8335 6.25682C16.4523 6.90148 16.8 7.77582 16.8 8.6875C16.8 9.59918 16.4523 10.4735 15.8335 11.1182C15.2146 11.7628 14.3752 12.125 13.5 12.125H9.6V5.25Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
