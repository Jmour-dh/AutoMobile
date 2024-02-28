import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styles from "./ListOfPersonals.module.scss";
import { hostname } from "../../../../../../../hostname/hostname";
import { MdDelete } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import Pagination from "../../../../../../../components/Pagination/Pagination";

function ListOfPersonals() {
  const [personals, setPersonals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get(`${hostname}/users`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        console.log("Réponse de l'API :", response.data);
        setPersonals(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des users :", error);
      });
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem("userToken");
    try {
      if (userId === undefined) {
        console.error("L'ID de l'utilisateur est indéfini.");
        return;
      }

      // Effectuer une requête DELETE à l'API pour supprimer l'utilisateur
      await axios.delete(`${hostname}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      // Mettre à jour la liste des personnels après la suppression
      setPersonals((prevPersonals) =>
        prevPersonals.filter((personal) => personal.User_ID !== userId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = personals
    .filter((user) => user.Role_ID === 3)
    .slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(
    personals.filter((user) => user.Role_ID === 3).length / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Date de Création</th>
            <th>Date de Modification</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.User_ID}>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Address}</td>
              <td>{user.Email}</td>
              <td>{user.Phone}</td>
              <td>
                {new Date(user.CreatedAt).toLocaleString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </td>

              <td>
                {user.UpdatedAt
                  ? new Date(user.UpdatedAt).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    }) !==
                    new Date(user.CreatedAt).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                    ? new Date(user.UpdatedAt).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    : "-"
                  : "-"}
              </td>

              <td className={styles.action}>
                <NavLink to={`../updatePersonal/${user.User_ID}`}>
                  <LuFileEdit style={{ color: "#0984e3" }} />
                </NavLink>
                <MdDelete
                  onClick={() => handleDelete(user.User_ID)}
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

export default ListOfPersonals;
