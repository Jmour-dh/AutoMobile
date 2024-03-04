import React from "react";
import styles from "./BanniereInfo.module.scss";
import { images } from "../../constants";
import {
  AiOutlineFundProjectionScreen,
  AiOutlineFileDone,
  AiOutlineCalculator,
  AiOutlineSetting,
} from "react-icons/ai";

const features = [
  {
    icon: <AiOutlineFundProjectionScreen className={styles.icon} />,
    text: "Une analyse objective des prix",
  },
  {
    icon: <AiOutlineFileDone className={styles.icon} />,
    text: "Une visibilité complète sur l'historique du véhicule",
  },
  {
    icon: <AiOutlineCalculator className={styles.icon} />,
    text: "Un budget maîtrisé avec notre simulateur de financement",
  },
  {
    icon: <AiOutlineSetting className={styles.icon} />,
    text: "Une projection claire sur les futurs entretiens de votre moto",
  },
];

function BanniereInfo() {
  return (
    <div className={styles.banInfo}>
      <div>
        <img src={images.ImgInfo} alt="imgInfo " />
      </div>
      <div className={styles.details}>
        <h2>Notre expertise à votre service</h2>
        {features.map((feature, index) => (
          <p key={index} className="d-flex align-items-center p-10">
            {feature.icon}
            {feature.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default BanniereInfo;
