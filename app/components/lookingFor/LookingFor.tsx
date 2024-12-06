import Apartment from '@/app/icons/Apartment'
import Bike from '@/app/icons/Bike'
import CategoryCard from './categoryCard/CategoryCard'
import React from 'react'
import Stay from '@/app/icons/Stay'
import apartmentImage from '@/assets/apartment.jpeg'
import bikeImage from '@/assets/bike.jpeg'
import guestroomImage from '@/assets/guestroom.jpeg'
import roomImage from '@/assets/room.jpeg'
import styles from './LookingFor.module.scss'
import villaImage from '@/assets/villa.jpeg'

export default function LookingFor() {
  return (
    <div className={styles.lookingFor}>
      <h3 className={styles.lookingFor__title}>
        Are you
        <br />
        looking for
      </h3>
      <div className={styles.lookingFor__categories}>
        <Stay />
        <Bike />
        <Apartment />
      </div>
      <div className={styles.lookingFor__categoryCards}>
        <CategoryCard
          name="Apartment"
          imageUrl={apartmentImage.src}
          description={
            'A private living space in a multi-unit building with rooms for sleeping, living, cooking, and bathing.'
          }
        />

        <CategoryCard
          name="Villa"
          imageUrl={villaImage.src}
          description={
            'A villa is a large, elegant house with spacious grounds, gardens, typically located in secluded area.'
          }
        />

        <CategoryCard
          name="Room"
          imageUrl={roomImage.src}
          description={
            'It’s equipped with essential amenities such as beds, a bathroom, and often include additional features like TV,  Wi-Fi access. '
          }
        />

        <CategoryCard
          name="Guestroom"
          imageUrl={guestroomImage.src}
          description={
            'It’s typically equipped with a bed, storage, and may include additional amenities like a desk, chair, lamp.'
          }
        />

        <CategoryCard
          name="Bike"
          imageUrl={bikeImage.src}
          description={
            'This is necessary for convenient transportation, accessing narrow pathways inaccessible by car.'
          }
        />
      </div>
      <span className={styles.lookingFor__subtitle}>
        <p className={styles.lookingFor__subtitle__whiteText}>
          {'comfortable bike'}
          <br />
        </p>

        <span style={{ display: 'inline-flex' }}>
          <p className={styles.lookingFor__subtitle__neonText}>{'or '}</p>
          <p className={styles.lookingFor__subtitle__whiteText}>
            {'aesthetic room'}
          </p>
          <p className={styles.lookingFor__subtitle__neonText}>{'?'}</p>
        </span>
      </span>
    </div>
  )
}
