import React from "react";
import styles from "./BanniereImg.module.scss";
import { images } from "../../constants";

function BanniereImg() {
  return (
    <div className={styles.ban}>
      <div className={styles.banImg}>
        <div className={styles.img1}>
          <img id="img1" src={images.ImgHome1} alt="imgHome1" />
        </div>
        <div className={styles.img2}>
          <h2>Nous sélectionnons les meilleures motos d'occasion pour vous.</h2>
          <img src={images.ImgHome2} alt="imgHome2" />
        </div>
      </div>
    </div>
  );
}

export default BanniereImg;
