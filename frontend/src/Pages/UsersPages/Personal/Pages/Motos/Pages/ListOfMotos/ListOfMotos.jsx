import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import styles from "./ListOfMotos.module.scss";
import { hostname } from "../../../../../../../hostname/hostname";
import { MdDelete } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import Pagination from "../../../../../../../components/Pagination/Pagination";

function ListOfMotos() {
  const [motos, setMotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(`${hostname}/motos`, config);
        setMotos(response.data);
        console.log("data moto", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des motos:", error);
      }
    };

    fetchMotos();
  }, []);

  const handleDelete = async (motoId) => {
    const token = localStorage.getItem("userToken");
    try {
      if (motoId === undefined) {
        console.error("L'ID de la moto est indéfini.");
        return;
      }

      // Effectuer une requête DELETE à l'API pour supprimer l'utilisateur
      await axios.delete(`${hostname}/motos/${motoId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      // Mettre à jour la liste des users après la suppression
      setMotos((prevMotos) =>
        prevMotos.filter((moto) => moto.Moto_ID !== motoId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la moto :", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = motos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(motos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Titre</th>
            <th>Modele</th>
            <th>Marque</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((moto) => (
            <tr key={moto.Moto_ID}>
              <td className={styles.photo}>
                {moto.images &&
                  moto.images.map((images, index) => (
                    <img
                      key={index}
                      src={`${hostname}/upload/${moto.images[index]}`}
                      alt={`Moto ${index} de ${moto.Title}`}
                    />
                  ))}
              </td>
              <td>{moto.Title}</td>
              <td>{moto.Modele}</td>
              <td>{moto.Marque}</td>
              <td>{moto.Price} €</td>
              <td className={styles.action}>
                <NavLink to={`../updateMoto/${moto.Moto_ID}`}>
                  <LuFileEdit style={{ color: "#0984e3" }} />
                </NavLink>
                <MdDelete
                  onClick={() => handleDelete(moto.Moto_ID)}
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

export default ListOfMotos;
