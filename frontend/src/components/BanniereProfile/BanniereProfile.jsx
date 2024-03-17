import React from 'react'
import styles from './BanniereProfile.module.scss'
import { images } from '../../constants';

function BanniereProfile() {
  return (
    <div className={styles.profileClient}>
      <img src={images.profile} alt="imgProfileClient" />
      <h1>Mon profil</h1>
    </div>
  )
}

export default BanniereProfile