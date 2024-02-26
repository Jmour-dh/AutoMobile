import React, { useState, useEffect } from "react";
import axios from "axios";
import { hostname } from "../hostname/hostname";

function VerifyEmail({ email, onVerification }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (email && email.includes("@")) {
      // Validation basique de l'email
      verifyEmail(email);
      console.log("email", email);
    }
  }, [email]);

  const verifyEmail = async (email) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.get(`${hostname}/verifyEmail`, {
        params: { email: encodeURIComponent(email) },
      });

      const data = response.data;

     if (data.conflict) {
  onVerification(true, "Cet email est déjà utilisé.");
} else {
  onVerification(false, "Cet email n'existe pas.");
}

    } catch (error) {
      console.error("Erreur lors de la vérification de l'email", error);
      onVerification(
        false,
        "Erreur lors de la vérification. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <p>Vérification...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default VerifyEmail;
