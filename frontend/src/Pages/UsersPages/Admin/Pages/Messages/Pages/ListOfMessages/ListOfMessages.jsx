import React, { useState, useEffect } from "react";
import styles from "./ListOfMessages.module.scss";
import axios from "axios";
import { hostname } from "../../../../../../../hostname/hostname";
import { MdDelete } from "react-icons/md";

function ListOfMessages() {
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const processMessage = async (token, message) => {
      try {
        const updatedMessage = {
          ...message,
          FirstNameVisiter: "",
          LastNameVisiter: "",
          EmailVisiter: "",
          MotoTitle: "",
        };

        if (message.User_ID !== null) {
          const user = await getUserInfo(token, message.User_ID);
          Object.assign(updatedMessage, {
            FirstNameVisiter: user.FirstName || "",
            LastNameVisiter: user.LastName || "",
            EmailVisiter: user.Email || "",
          });
        } else {
          Object.assign(updatedMessage, {
            FirstNameVisiter: message.FirstNameVisiter || "",
            LastNameVisiter: message.LastNameVisiter || "",
            EmailVisiter: message.EmailVisiter || "",
          });
        }

        if (message.Moto_ID !== null) {
          updatedMessage.MotoTitle = await getMotoTitle(token, message.Moto_ID);
        }

        return updatedMessage;
      } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
        return message;
      }
    };

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`${hostname}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const updatedMessages = await Promise.all(
          response.data.map(async (message) => {
            const updatedMessage = await processMessage(token, message);
            return updatedMessage;
          })
        );

        updatedMessages.sort(
          (a, b) => new Date(b.DateOfMessage) - new Date(a.DateOfMessage)
        );
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages :", error);
        console.error(
          "Statut de la réponse :",
          error.response ? error.response.status : "Erreur inconnue"
        );
      }
    };

    fetchMessages();
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

  const getMotoTitle = async (token, motoId) => {
    try {
      const response = await axios.get(`${hostname}/motos/${motoId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return response.data.Title || "";
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du titre de la moto :",
        error
      );
      return "";
    }
  };

  const handleDelete = async (messageId) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!messageId) {
        console.error("L'ID de message est indéfini.");
        return;
      }

      await axios.delete(`${hostname}/messages/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.message_ID !== messageId)
      );

      setRefresh((prevRefresh) => !prevRefresh);
    } catch (error) {
      console.error("Erreur lors de la suppression de message :", error);
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
            <th>Titre</th>
            <th>Objet</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.Message_ID}>
              <td>{new Date(message.DateOfMessage).toLocaleString()}</td>
              <td>
                {message.User_ID !== null
                  ? message.FirstNameVisiter
                  : message.FirstNameVisiter}
              </td>
              <td>
                {message.User_ID !== null
                  ? message.LastNameVisiter
                  : message.LastNameVisiter}
              </td>
              <td>
                {message.User_ID !== null
                  ? message.EmailVisiter
                  : message.EmailVisiter}
              </td>
              <td>{message.MotoTitle}</td>
              <td>{message.Objet}</td>
              <td>{message.Message}</td>
              <td className={styles.action}>
                <MdDelete
                  onClick={() => handleDelete(message.Message_ID)}
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

export default ListOfMessages;
