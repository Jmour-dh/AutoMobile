import React from 'react'
import styles from "./About.module.scss"
import BanniereAbout from '../../components/BanniereAbout/BanniereAbout'
import BanniereDescription from '../../components/BanniereDescription/BanniereDescription'
import BanniereInfo from '../../components/BanniereInfo/BanniereInfo'
import BanniereContact from '../../components/BanniereContact/BanniereContact'

function About() {
  return (
    <div className={styles.about}>
      <BanniereAbout />
      <BanniereDescription />
      <BanniereInfo/>
      <BanniereContact/>
    </div>
  )
}

export default About