import React, { useState, useEffect } from "react";
import styles from "./Moto.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { hostname } from "../../hostname/hostname";
import { FaArrowLeft } from "react-icons/fa";
import { images } from "../../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModalMessage from "../../components/ModalMessage/ModalMessage";
import { useAuth } from "../../utils/UseConnecte";

function Moto() {
  const { motoId } = useParams();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const roleId = localStorage.getItem("roleId");
  const [moto, setMoto] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTelephoneModal, setShowTelephoneModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
  };

  const handleTelephoneClick = () => {
    setShowTelephoneModal(true);
  };

  const handleCloseTelephoneModal = () => {
    setShowTelephoneModal(false);
  };

  const handleModalShow = () => setShowModal(true);

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.moto}>
      <div className={styles.container}>
        <div className={styles.contentMoto}>
          <div className={styles.contentBtn}>
            <Link className="bn632-hover bn26" onClick={() => navigate(-1)}>
              <FaArrowLeft className="m-5" />
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center w-100 m-10">
            <div className={styles.contentImg}>
              <Slider {...sliderSettings} initialSlide={currentSlide}>
                {moto.images &&
                  moto.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={`${hostname}/upload/${image}`}
                        alt={`Moto ${index + 1} de ${moto.Title}`}
                      />
                    </div>
                  ))}
              </Slider>
            </div>
            <div className={styles.contentInfo}>
              <h3>Informations générales</h3>
              <p>
                {moto.Marque} {moto.Modele}
              </p>
              <div className={styles.content}>
                <div className="d-flex flex-column w-100  m-10">
                  <h4>Caractéristiques</h4>
                  <div className="d-flex m-10">
                    <label>Année :</label>
                    <p>{moto.Year}</p>
                  </div>
                  <div className="d-flex m-10">
                    <label>Provenance :</label>
                    <p>{moto.Origin}</p>
                  </div>
                  <div className="d-flex m-10">
                    <label>Mise en circulation :</label>
                    <p>
                      {new Date(moto.CreationDate).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="d-flex  m-10">
                    <label>Première main :</label>
                    <p>{moto.FirstHand === 1 ? "Oui" : "Non"}</p>
                  </div>
                  <div className="d-flex  m-10">
                    <label>Kilométrage compteur :</label>
                    <p className="d-flex align-items-center">
                      {moto.OdometerMileage} km{" "}
                      <img
                        className="ml-10"
                        src={images.counter}
                        alt="counter"
                      />
                    </p>
                  </div>
                  <div className="d-flex  m-10">
                    <label>Couleur :</label>
                    <p>{moto.Color}</p>
                  </div>
                  <div className="d-flex  m-10">
                    <label>Nombre de places :</label>
                    <p>{moto.NumberOfPlaces}</p>
                  </div>
                </div>
                <div className="d-flex flex-column w-100 m-10">
                  <h4>Puissance du véhicule</h4>
                  <div className="d-flex  m-10">
                    <label>Puissance fiscale :</label>
                    <p>{moto.FiscalPower} CV</p>
                  </div>
                  <div className="d-flex  m-10">
                    <label>Puissances :</label>
                    <p>{moto.Powers} ch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contentMsg}>
          <h3>{moto.Title}</h3>
          <div className="d-flex justify-content-center m-20">
            <p className="  border-right">{moto.Year}</p>
            <p className=" border-right">{moto.OdometerMileage} km</p>
            <p className=" border-right">{moto.Energy}</p>
          </div>
          <p>{moto.Price} €</p>
          {(isLoggedIn && roleId === "2") || !isLoggedIn ? (
            <div className="d-flex justify-content-center ">
              <button
                className="bn632-hover bn26"
                onClick={handleTelephoneClick}
              >
                Télephone
              </button>
              <button className="bn632-hover bn22" onClick={handleModalShow}>
                Message
              </button>
            </div>
          ) : (
            <p style={{ color: "red", textDecoration: "underline" }}>
              Accès utilisateur
            </p>
          )}
        </div>
      </div>
      {showTelephoneModal && (
        <div
          className={styles.modalBackdrop}
          onClick={handleCloseTelephoneModal}
        >
          <div className={styles.modalContent}>
            <p>Numéro de téléphone : 02 65 58 47 49</p>
            <button
              className="btn btn-danger"
              onClick={handleCloseTelephoneModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
      <ModalMessage
        showModal={showModal}
        handleModalClose={handleModalClose}
        motoId={motoId}
      />
    </div>
  );
}

export default Moto;
