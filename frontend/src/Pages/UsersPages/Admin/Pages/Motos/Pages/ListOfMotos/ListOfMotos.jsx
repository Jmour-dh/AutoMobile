import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./ListOfMotos.module.scss";
import { hostname } from '../../../../../../../hostname/hostname';

function ListOfMotos() {
  const [motos, setMotos] = useState([]);

useEffect(() => {
  const fetchMotos = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.get(`${hostname}/motos`, config);
      setMotos(response.data);
      console.log("data moto", response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des motos:", error);
    }
  };

  fetchMotos();
}, []);

  return (
    <div className={styles.listOfMotos}>
      {motos.map(moto => (
        <div key={moto.Moto_ID} className={styles.moto}>
          <h2>{moto.Title}</h2>
          {moto.images && moto.images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image de ${moto.Title}`} style={{ width: "100px", height: "100px" }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default ListOfMotos;
