import React from 'react'
import styles from "./BanniereAbout.module.scss"
import { images } from "../../constants";

function BanniereAbout() {
  return (
    <div className={styles.about}>
    <img src={images.imgAbout} alt="imgAbout" />
    <h1>À propos de nous</h1>
  </div>
  )
}

export default BanniereAbout