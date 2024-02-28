import React, { useState, useEffect } from "react";
import styles from "./ListOfAvis.module.scss";
import { BsStarFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { hostname } from "../../../../../../../hostname/hostname";

function ListOfAvis() {
  const [avis, setAvis] = useState([]);

  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${hostname}/avis`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const processedAvis = await processAvis(token, response.data);
        setAvis(processedAvis);
      } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
        console.error(
          "Statut de la réponse :",
          error.response ? error.response.status : "Erreur inconnue"
        );
      }
    };

    fetchAvis();
  }, []);

  const processAvis = async (token, avis) => {
    const processedAvis = await Promise.all(
      avis.map(async (avisItem) => {
        const updatedAvis = await processAvisDetails(token, avisItem);
        return updatedAvis;
      })
    );

    return processedAvis;
  };

  const processAvisDetails = async (token, avisItem) => {
    try {
      const updatedAvis = {
        ...avisItem,
        FirstNameVisiter: "",
        LastNameVisiter: "",
        EmailVisiter: "",
        ServiceNom: "",
      };

      if (avisItem.User_ID !== null) {
        const user = await getUserInfo(token, avisItem.User_ID);
        Object.assign(updatedAvis, {
          FirstNameVisiter: user.FirstName || "",
          LastNameVisiter: user.LastName || "",
          EmailVisiter: user.Email || "",
        });
      } else {
        Object.assign(updatedAvis, {
          FirstNameVisiter: avisItem.FirstNameVisiter || "",
          LastNameVisiter: avisItem.LastNameVisiter || "",
          EmailVisiter: avisItem.EmailVisiter || "",
        });
      }

      if (avisItem.Service_ID !== null) {
        updatedAvis.ServiceNom = await getServiceNom(token, avisItem.Service_ID);
      }

      return updatedAvis;
    } catch (error) {
      console.error("Erreur lors de la récupération des informations :", error);
      return avisItem;
    }
  };

  const getUserInfo = async (token, userId) => {
    try {
      const response = await axios.get(`${hostname}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'utilisateur :",
        error
      );
      return {};
    }
  };

  const getServiceNom = async (token, serviceId) => {
    try {
      const response = await axios.get(`${hostname}/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data.Nom || "";
    } catch (error) {
      console.error("Erreur lors de la récupération du service :", error);
      return "";
    }
  };

  const handleDelete = async (avisId) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!avisId) {
        console.error("L'ID de l'avis est indéfini.");
        return;
      }

      await axios.delete(`${hostname}/avis/${avisId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setAvis((prevAvis) =>
        prevAvis.filter((avisItem) => avisItem.Avis_ID !== avisId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'avis :", error);
    }
  };

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Service</th>
            <th>Note</th>
            <th>Commentaires</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {avis.map((avisItem) => (
            <tr key={avisItem.Avis_ID}>
              <td>{new Date(avisItem.DateOfAvis).toLocaleString()}</td>
              <td>{avisItem.FirstNameVisiter}</td>
              <td>{avisItem.LastNameVisiter}</td>
              <td>{avisItem.EmailVisiter}</td>
              <td>{avisItem.ServiceNom}</td>
              <td>
                {[...Array(avisItem.Note)].map((star, index) => (
                  <BsStarFill color="#f39c12" key={index} />
                ))}
              </td>
              <td>{avisItem.Comment}</td>
              <td className={styles.action}>
                <MdDelete
                  onClick={() => handleDelete(avisItem.Avis_ID)}
                  style={{ color: "red" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListOfAvis;
