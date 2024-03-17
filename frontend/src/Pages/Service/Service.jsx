import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Service.module.scss";
import { hostname } from "../../hostname/hostname";
import ModalListOfAvis from "../../components/ModalListOfAvis/ModalListOfAvis";
import { useAuth } from "../../utils/UseConnecte";

function Service() {
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [showListModal, setShowListModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const roleId = localStorage.getItem("roleId");
  const handleListModalShow = (serviceId) => {
    setSelectedServiceId(serviceId);
    setShowListModal(true);
  };

  const handleListModalClose = () => setShowListModal(false);

  useEffect(() => {
    // Utilisez Axios pour récupérer les services depuis l'API
    axios
      .get(`${hostname}/services`)
      .then((response) => {
        setServices(response.data);
        console.log("data service", response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des services :", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      {services.map((service) => (
        <div key={service.Service_ID} className={styles.contentService}>
          <div className={styles.contentImg}>
            <img
              src={`${hostname}/upload/${service.ImageUrl}`}
              alt={service.Nom}
            />
          </div>
          <div className={styles.contentdetails}>
            <h3>{service.Nom}</h3>
            <p>{service.Description}</p>
            <span>{`à partir de ${service.Price} €`}</span>
            {(isLoggedIn && roleId === "2") || !isLoggedIn ? (
              <div className={styles.avisBtn}>
                <button
                  className={styles.avis}
                  onClick={() => handleListModalShow(service.Service_ID)}
                >
                  Liste des avis
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <ModalListOfAvis
            show={showListModal}
            handleClose={handleListModalClose}
            serviceId={selectedServiceId}
          />
        </div>
      ))}
    </div>
  );
}

export default Service;
