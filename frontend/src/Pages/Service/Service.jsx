import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import styles from "./Service.module.scss";
import IMG from "../../assets/images/vidange2.jpeg";
import ModalAvis from "../../components/ModalAvis/ModalAvis";
import axios from "axios";
import { hostname } from "../../hostname/hostname";

function Service() {
  const [showModal, setShowModal] = useState(false);
  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div className={styles.container}>
      <div className={styles.contentService}>
        <div className={styles.contentImg}>
          <img src={IMG} alt="vidange" />
        </div>
        <div className={styles.contentdetails}>
          <h3>Vidange</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, nisi
            officia ex tenetur pariatur ut earum voluptates provident, modi
            rerum velit excepturi voluptatum, necessitatibus voluptatibus nemo
            qui itaque. Reiciendis, rerum.
          </p>
          <span>à partir de 80 €</span>
        </div>
      </div>
      <div className={styles.contentAvis}>
        <div className="d-flex align-items-center justify-content-center">
          <h3>Avis des utilisateurs </h3>
          <button
            className="d-flex align-items-center justify-content-center m-10"
            onClick={handleModalShow}
          >
            <IoIosAddCircleOutline size={20} />
          </button>
        </div>

        <ul>
          <li className={styles.avisItem}>
            <p >
              <span className={styles.avisUser}>dhia</span>a donné une note de
              <span className={styles.avisStars}>
                {[...Array(5)].map((star, index) => (
                  <BsStarFill color="#f39c12" key={index} />
                ))}
              </span>
            </p>
            <p >Commentaire: trés bonne service</p>
            <p >Date:10/02/2024</p>
          </li>
          <li className={styles.avisItem}>
            <p >
              <span className={styles.avisUser}>dhia</span>a donné une note de
              <span className={styles.avisStars}>
                {[...Array(5)].map((star, index) => (
                  <BsStarFill color="#f39c12" key={index} />
                ))}
              </span>
            </p>
            <p >Commentaire: trés bonne service</p>
            <p >Date:10/02/2024</p>
          </li>
          <li className={styles.avisItem}>
            <p >
              <span className={styles.avisUser}>dhia</span>a donné une note de
              <span className={styles.avisStars}>
                {[...Array(5)].map((star, index) => (
                  <BsStarFill color="#f39c12" key={index} />
                ))}
              </span>
            </p>
            <p >Commentaire: trés bonne service</p>
            <p >Date:10/02/2024</p>
          </li>
          <li className={styles.avisItem}>
            <p >
              <span className={styles.avisUser}>dhia</span>a donné une note de
              <span className={styles.avisStars}>
                {[...Array(5)].map((star, index) => (
                  <BsStarFill color="#f39c12" key={index} />
                ))}
              </span>
            </p>
            <p >Commentaire: trés bonne service</p>
            <p >Date:10/02/2024</p>
          </li>
        </ul>
        <ModalAvis showModal={showModal} handleModalClose={handleModalClose} />
      </div>
    </div>
  );
}

export default Service;
