import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { hostname } from "../../hostname/hostname";
import Img from "../../assets/images/about.avif"
import axios from "axios";
import styles from "./Occasion.module.scss";

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
      console.log("data moto", response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des motos :", error);
    }
  }

  useEffect(() => {
    fetchMotos();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.occasion}>
      <div className={styles.carsList}>
        <ul>
          <li>
            <Link to="#">
            <img src={Img} alt="dd" />
            <div className={styles.details}>
            <h3>BMW</h3>
            <div className="d-flex justify-content-center">
                    <p className="p-10 m-5 mr-10 border-right">
                     2500
                    </p>
                    <p className="p-10 m-5 mr-10 border-right">
                      67000 km
                    </p>
                    <p className="p-10 m-5 mr-10 border-right">
                      essance
                    </p>
                  </div>
                  <p className="p-10 m-5 ">15000 €</p>
            </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Occasion;
