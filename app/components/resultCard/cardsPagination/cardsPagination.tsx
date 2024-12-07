import React from 'react'
import styles from './cardsPagination.module.scss'

interface CardsPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
}

export default function CardsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CardsPaginationProps) {
  return (
    <div className={styles.container}>
      <div
        className={styles.container__arrowLeft}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.7071 6.70711C15.0976 6.31658 15.0976 5.68342 14.7071 5.29289C14.3166 4.90237 13.6834 4.90237 13.2929 5.29289L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L13.2929 18.7071C13.6834 19.0976 14.3166 19.0976 14.7071 18.7071C15.0976 18.3166 15.0976 17.6834 14.7071 17.2929L9.41421 12L14.7071 6.70711Z"
            fill="black"
          />
        </svg>
      </div>
      <div className={styles.container__numbers}>
        {[...Array(totalPages)].map((_, index) => (
          <span
            key={index}
            className={`${
              currentPage === index + 1 ? styles.container__numbers__activeNumber : styles.container__numbers__number
            }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </span>
        ))}
      </div>
      <div
        className={styles.container__arrowRight}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.7071 6.70711C15.0976 6.31658 15.0976 5.68342 14.7071 5.29289C14.3166 4.90237 13.6834 4.90237 13.2929 5.29289L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L13.2929 18.7071C13.6834 19.0976 14.3166 19.0976 14.7071 18.7071C15.0976 18.3166 15.0976 17.6834 14.7071 17.2929L9.41421 12L14.7071 6.70711Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  )
}
