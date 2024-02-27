import React, { useEffect, useState } from "react";
import axios from "axios";
import { hostname } from "../hostname/hostname";

const VerifyPhone = ({ phone, onVerification }) => {
  const [verificationMessage, setVerificationMessage] = useState("");

  const verifyPhone = async (phoneValue) => {
    try {
      // Vérifiez si phone existe avant d'utiliser trim
      if (phoneValue && phoneValue.trim() !== "") {
        const response = await axios.post(`${hostname}/verifyPhone`, {
          phone: phoneValue,
        });

        const { conflict } = response.data;

        if (conflict) {
          setVerificationMessage("Le numéro de téléphone existe déjà");
        } else {
          setVerificationMessage("");
        }

        // Utilisez la valeur mise à jour de verificationMessage
        onVerification(
          conflict,
          conflict ? "Le numéro de téléphone existe déjà." : ""
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de le numéro de téléphone :",
        error
      );
    }
  };

  useEffect(() => {
    // Exécutez la vérification de le numero lorsque le composant monte
    verifyPhone(phone);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  useEffect(() => {
    // Vérifiez la longueur de le numero avant de déclencher la vérification
    if (phone && phone.length >= 1) {
      verifyPhone(phone);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  return <p style={{ color: "red" }}>{verificationMessage}</p>;
};

export default VerifyPhone;
