import React from 'react'
import styles from "./Home.module.scss"
import BanniereImg from '../../components/BanniereImg/BanniereImg'
import BanniereInfo from '../../components/BanniereInfo/BanniereInfo'
import BanniereMarque from '../../components/BanniereMarque/BanniereMarque'
import BanniereMoto from '../../components/BanniereMoto/BanniereMoto'

function Home() {
  return (
    <div className={styles.home}>
      <BanniereImg />
      <BanniereInfo/>
      <BanniereMarque/>
      <BanniereMoto/>
    </div>
  )
}

export default Home