import React, { useState, useEffect } from "react";
import styles from "./ListOfContacts.module.scss";
import axios from "axios";
import { hostname } from "../../../../../../../hostname/hostname";
import { MdDelete } from "react-icons/md";

function ListOfContacts() {
  const [contacts, setContacts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const processContact = async (token, contact) => {
      try {
        const updatedContact = {
          ...contact,
          FirstNameVisiter: "",
          LastNameVisiter: "",
          EmailVisiter: "",
        };

        if (contact.User_ID !== null) {
          const user = await getUserInfo(token, contact.User_ID);
          Object.assign(updatedContact, {
            FirstNameVisiter: user.FirstName || "",
            LastNameVisiter: user.LastName || "",
            EmailVisiter: user.Email || "",
          });
        } else {
          Object.assign(updatedContact, {
            FirstNameVisiter: contact.FirstNameVisiter || "",
            LastNameVisiter: contact.LastNameVisiter || "",
            EmailVisiter: contact.EmailVisiter || "",
          });
        }

        return updatedContact;
      } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
        return contact;
      }
    };

    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${hostname}/contacts`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const updatedContacts = await Promise.all(
          response.data.map(async (contact) => {
            const updatedContact = await processContact(token, contact);
            return updatedContact;
          })
        );

        updatedContacts.sort(
          (a, b) => new Date(b.DateOfContact) - new Date(a.DateOfContact)
        );
        setContacts(updatedContacts);
      } catch (error) {
        console.error("Erreur lors de la récupération des contacts :", error);
        console.error(
          "Statut de la réponse :",
          error.response ? error.response.status : "Erreur inconnue"
        );
      }
    };

    fetchContacts();
  }, [refresh]);

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

  const handleDelete = async (contactId) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!contactId) {
        console.error("L'ID du contact est indéfini.");
        return;
      }

      await axios.delete(`${hostname}/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.Contact_ID !== contactId)
      );

      setRefresh((prevRefresh) => !prevRefresh);
    } catch (error) {
      console.error("Erreur lors de la suppression du contact :", error);
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
            <th>Objet</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.Contact_ID}>
              <td>{new Date(contact.DateOfContact).toLocaleString()}</td>
              <td>
                {contact.User_ID !== null
                  ? contact.FirstNameVisiter
                  : contact.FirstNameVisiter}
              </td>
              <td>
                {contact.User_ID !== null
                  ? contact.LastNameVisiter
                  : contact.LastNameVisiter}
              </td>
              <td>
                {contact.User_ID !== null
                  ? contact.EmailVisiter
                  : contact.EmailVisiter}
              </td>
              <td>{contact.Objet}</td>
              <td>{contact.Message}</td>
              <td className={styles.action}>
                <MdDelete
                  onClick={() => handleDelete(contact.Contact_ID)}
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

export default ListOfContacts;
