import React, { useState, useEffect } from "react";
import { hostname } from "../hostname/hostname";

function VerifyEmail({ email, onVerification }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (email && email.includes("@")) {
      // Validation basique de l'email
      verifyEmail(email);
    }
  });

  const verifyEmail = async (email) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const url = `${hostname}/verifyEmail?email=${encodeURIComponent(email)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.isAvailable) {
        onVerification(true, "");
      } else {
        onVerification(false, "Cet email est déjà utilisé.");
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
