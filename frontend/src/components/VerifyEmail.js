import React, { useEffect, useState } from "react";
import axios from "axios";
import { hostname } from "../hostname/hostname";

const VerifyEmail = ({ email, onVerification }) => {
  const [verificationMessage, setVerificationMessage] = useState("");

  const verifyEmail = async (emailValue) => {
    try {
      // Vérifiez si email existe avant d'utiliser trim
      if (emailValue && emailValue.trim() !== "") {
        const response = await axios.post(`${hostname}/verifyEmail`, {
          email: emailValue,
        });

        const { conflict } = response.data;

        if (conflict) {
          setVerificationMessage("L'email existe déjà");
        } else {
          setVerificationMessage("");
        }

        // Utilisez la valeur mise à jour de verificationMessage
        onVerification(conflict, conflict ? "L'email existe déjà." : "");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email :", error);
    }
  };

  useEffect(() => {
    // Exécutez la vérification de l'email lorsque le composant monte
    verifyEmail(email);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    // Vérifiez la longueur de l'email avant de déclencher la vérification
    if (email && email.length >= 1) {
      verifyEmail(email);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return <p style={{ color: "red" }}>{verificationMessage}</p>;
};

export default VerifyEmail;
