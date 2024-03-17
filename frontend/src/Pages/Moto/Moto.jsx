import React, { useState, useEffect } from "react";
import styles from "./Moto.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { hostname } from "../../hostname/hostname";

function Moto() {
  const { motoId } = useParams();
  const [moto, setMoto] = useState({});

  useEffect(() => {
    if (motoId) {
      const fetchMoto = async () => {
        try {
          const response = await axios.get(`${hostname}/motos/${motoId}`);
          setMoto(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de la moto par ID :",
            error
          );
        }
      };

      fetchMoto();
    }
  }, [motoId]);

  return <div>Moto</div>;
}

export default Moto;
