import React from 'react';
import styles from './BanniereMarque.module.scss';
import { Marques } from '../../data/Marques';

function BanniereMarque() {
  return (
    <div className={styles.marques}>
      <h2>Les marques les plus populaires</h2>
      <div className={styles.logoMarque}>
        {Marques.map((marque) => (
          <div key={marque.id} className={`${styles.marqueItem} d-flex flex-column align-items-center justify-content-center`}>
            <img src={marque.image} alt={marque.name} />
            <p>{marque.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BanniereMarque;
