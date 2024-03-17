import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { hostname } from "../../hostname/hostname";
import axios from "axios";
import styles from "./Occasion.module.scss";
import BanniereFilter from "../../components/BanniereFilter/BanniereFilter";

function Occasion() {
  const [motos, setMotos] = useState([]);
  const [filters, setFilters] = useState({
    Marque: "",
    OdometerMileage: "",
    Year: "",
  });

  const fetchMotos = async () => {
    try {
      const response = await axios.get(`${hostname}/motos-filter`, {
        params: filters,
      });
      setMotos(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des motos :", error);
    }
  };
  
  useEffect(() => {
    fetchMotos(filters); // Passer les nouveaux filtres à la fonction fetchMotos
  }, [filters]); // Mettre à jour la liste des motos lorsque les filtres changent
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.occasion}>
      <div className={styles.filterSection}>
        <BanniereFilter onFilterChange={handleFilterChange} filters={filters} />
      </div>
      <div className={styles.carsList}>
        <ul>
          {motos.map((moto) => (
            <li key={moto.Moto_ID}>
              <Link to={`/motos/${moto.Moto_ID}`}>
                <img
                  src={`${hostname}/upload/${moto.images[0]}`}
                  alt={` ${moto.Title}`}
                />
                <div className={styles.details}>
                  <h3>{moto.Title}</h3>
                  <div className="d-flex justify-content-center">
                    <p className="p-10 m-5 mr-10 border-right">{moto.Year}</p>
                    <p className="p-10 m-5 mr-10 border-right">{moto.OdometerMileage} km</p>
                    <p className="p-10 m-5 mr-10 border-right">{moto.Energy}</p>
                  </div>
                  <p className="p-10 m-5 ">{moto.Price} €</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Occasion;
