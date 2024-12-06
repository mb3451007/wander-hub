import Logo from '@/app/icons/Logo'
import React from 'react'
import burgerIcon from '@/app/icons/Burger'
import styles from './Header.module.scss'

type HeaderProps = object

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Header(_: HeaderProps) {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.header__headerItems}>
          <li className={styles.header__headerItems__burgerButton}>
            {burgerIcon()}
          </li>
          <li className={styles.header__headerItems__logo}>
            <Logo />
          </li>
        </ul>
      </nav>
    </header>
  )
}
