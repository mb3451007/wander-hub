import React from 'react'
import styles from './pagination.module.scss'

interface PaginationProps {
  activeIndex: number // Active dot index
  setActiveIndex: (index: number) => void
  totalImages: number // Function to update active index
}

export default function Pagination({
  activeIndex,
  setActiveIndex,
  totalImages,
}: PaginationProps) {
  const dots = Array.from({ length: totalImages }, (_, index) => index)
  return (
    <div className={styles.container}>
      <div className={styles.container__dots}>
        {dots.map((dot, index) => (
          <div
            key={index}
            className={`${index === activeIndex ? styles.container__dots__activeDot : styles.container__dots__dot}`}
            onClick={() => {
              setActiveIndex(index)
            }} // Update the active index
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 8 9"
              fill="none"
            >
              <circle
                cx="4"
                cy="4.95361"
                r="4"
                fill="currentcolor"
                fillOpacity={`${index === activeIndex ? '1' : '0.5'}`} // Highlight active dot
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}
