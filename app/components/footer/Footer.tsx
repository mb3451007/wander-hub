import FacebookIcon from '@/app/icons/Facebook'
import InstagramIcon from '@/app/icons/Instagram'
import Logo from '@/app/icons/Logo'
import React from 'react'
import TwitterIcon from '@/app/icons/Twitter'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__descriptionAndLogo}>
        <div className={styles.footer__descriptionAndLogo__logo}>
          <Logo />
        </div>

        <h3 className={styles.footer__descriptionAndLogo__description}>
          We make your journey in Indonesia seamless and stress-free.
        </h3>
      </div>

      <hr className={styles.footer__separator} />

      <div className={styles.footer__links}>
        <a className={styles.footer__links__link}>Home</a>
        <a className={styles.footer__links__link}>About Us</a>
        <a className={styles.footer__links__link}>FAQ</a>
        <a className={styles.footer__links__link}>Contact Us</a>
        <a className={styles.footer__links__link}>My Profile</a>
      </div>

      <div className={styles.footer__legalAndSocial}>
        <div className={styles.footer__links}>
          <a className={styles.footer__links__link}>Privacy policy</a>
          <a className={styles.footer__links__link}>Terms & Conditions</a>
        </div>

        <div className={styles.footer__socialLinks}>
          <a className={styles.footer__socialLinks__link}>
            <FacebookIcon />
          </a>
          <a className={styles.footer__socialLinks__link}>
            <TwitterIcon />
          </a>
          <a className={styles.footer__socialLinks__link}>
            <InstagramIcon />
          </a>
        </div>

        <p className={styles.footer__copyright}>©2024 All rights reserved</p>
      </div>
    </div>
  )
}
