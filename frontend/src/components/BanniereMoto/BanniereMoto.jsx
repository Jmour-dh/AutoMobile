import React from "react";
import styles from "./BanniereMoto.module.scss";
import { Motos } from "../../data/Motos";


function BanniereMoto() {
  return (
    <div className={styles.motos}>
      <h2>Les modèles les plus demandés</h2>
      <div className={styles.logoMoto}>
        {Motos.map((moto) => (
          <div key={moto.id} className={`${styles.motoItem} d-flex flex-column align-items-center justify-content-center`}>
            <img src={moto.image} alt={moto.name} />
            <p>{moto.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BanniereMoto;
