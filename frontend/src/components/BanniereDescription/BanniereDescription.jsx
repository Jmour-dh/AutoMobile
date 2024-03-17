import React from "react";
import styles from "./BanniereDescription.module.scss";

function BanniereDescription() {
  return (
    <div className={styles.description}>
      <div className={styles.text}>
        <h2>AutoMobile</h2>
        <p>
          Bienvenue chez <span>AutoMobile</span> , votre destination ultime pour
          les amateurs de motos. Nous sommes fiers de vous offrir une expérience
          unique dans le monde des deux-roues.
        </p>
        <p>
          {" "}
          Notre mission est de fournir les motos les plus exceptionnelles du
          marché tout en offrant un service à la clientèle exceptionnel. Que
          vous soyez un passionné chevronné ou que vous commenciez tout juste
          votre aventure à moto, nous sommes là pour répondre à tous vos
          besoins.
        </p>
      </div>
    </div>
  );
}

export default BanniereDescription;
