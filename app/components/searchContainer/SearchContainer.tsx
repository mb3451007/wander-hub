import Header from '../header/Header'
import React from 'react'
import background from '@/assets/background.png'
import styles from './SearchContainer.module.scss'

interface SearchContainerProps {
  menu?: JSX.Element
  searchForm: JSX.Element
}

export default function SearchContainer({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  menu,
  searchForm,
}: SearchContainerProps) {
  return (
    <div
      style={{ backgroundImage: `url(${background.src})` }}
      className={styles.searchContainer}
    >
      <Header />
      <div className={styles.searchContainer__formWithTitle}>
        <h1 className={styles.searchContainer__formWithTitle__title}>
          Explore Bali,
          <br
            className={styles.searchContainer__formWithTitle__title__titleBreak}
          />{' '}
          live your journey
        </h1>
        {searchForm}
      </div>
    </div>
  )
}
