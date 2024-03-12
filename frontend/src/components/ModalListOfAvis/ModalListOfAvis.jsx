import React, { useState, useEffect } from "react";
import styles from "./ModalListOfAvis.module.scss";
import { BsStarFill } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import ModalAvis from "../ModalAvis/ModalAvis";
import { hostname } from "../../hostname/hostname";
import axios from "axios";

function formatDate(dateString) {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
}

function ModalListOfAvis({ show, handleClose, serviceId}) {
  const [showModal, setShowModal] = useState(false);
  const [avisList, setAvisList] = useState([]);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchAvisByServiceID = async () => {
      try {
        const response = await axios.get(`${hostname}/avis/service/${serviceId}`);
        setAvisList(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
      }
    };

    if (show) {
      fetchAvisByServiceID();
    }
  }, [show, serviceId]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button onClick={handleClose}>
          <IoClose size={25} color="red" />
        </button>
        <div className={styles.contentAvis}>
          <div className="d-flex align-items-center justify-content-center">
            <h5>Avis des utilisateurs </h5>
            <button
              className="d-flex align-items-center justify-content-center m-10"
              onClick={handleModalShow}
            >
              <IoIosAddCircleOutline size={20} />
            </button>
          </div>

          <ul>
            {avisList.map((avis) => (
              <li key={avis.Avis_ID} className={styles.avisItem}>
                <p>
                  <span className={styles.avisUser}>{avis.LastNameVisiter}</span>
                  a donné une note de
                  <span className={styles.avisStars}>
                    {/* Utilisation de Array.fill pour générer les étoiles */}
                    {avis.Note && Number.isInteger(parseInt(avis.Note, 10)) ? (
                      [...Array(parseInt(avis.Note, 10))].map((star, index) => (
                        <BsStarFill color="#f39c12" key={index} />
                      ))
                    ) : (
                      <span>Invalid Note</span>
                    )}
                  </span>
                </p>
                <p>Commentaire: {avis.Comment}</p>
                <p>Date: {formatDate(avis.DateOfAvis)}</p>
              </li>
            ))}
          </ul>

          <ModalAvis
            showModal={showModal}
            handleModalClose={handleModalClose}
            serviceId={serviceId}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalListOfAvis;
