import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styles from "./ListOfServices.module.scss";
import { hostname } from "../../../../../../../hostname/hostname";
import { MdDelete } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import Pagination from "../../../../../../../components/Pagination/Pagination";

function ListOfServices() {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(`${hostname}/services`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        // Mettre à jour l'état services avec les données récupérées
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des services :", error);
      });
  }, []); // Le tableau de dépendances vide signifie que ce useEffect s'exécute uniquement après le montage initial du composant

  const handleDelete = async (serviceId) => {
    const token = localStorage.getItem("userToken");
    try {
      if (serviceId === undefined) {
        console.error("L'ID de la service est indéfini.");
        return;
      }

      // Effectuer une requête DELETE à l'API pour supprimer l'utilisateur
      await axios.delete(`${hostname}/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      // Mettre à jour la liste des users après la suppression
      setServices((prevServices) =>
        prevServices.filter((service) => service.Service_ID !== serviceId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((service) => (
            <tr key={service.Service_ID}>
              <td className={styles.photo}>
                <img src={service.ImageUrl} alt={service.Nom} />
              </td>
              <td>{service.Nom}</td>
              <td>{service.Description}</td>
              <td>à partir de {service.Price} €</td>
              <td className={styles.action}>
                <NavLink to={`../updateService/${service.Service_ID}`}>
                  <LuFileEdit style={{ color: "#0984e3" }} />
                </NavLink>
                <MdDelete
                  onClick={() => handleDelete(service.Service_ID)}
                  style={{ color: "red" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ListOfServices;
