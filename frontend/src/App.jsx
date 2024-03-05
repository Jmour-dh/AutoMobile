import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/UseConnecte"; // Assuming useAuth is exported from somewhere
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function App() {
  // Assuming your useAuth hook can be used here directly. If it's not the case, you might need to adjust the structure.
  const { logout } = useAuth();

  useEffect(() => {
    const checkTokenExpiration = async () => {
      const tokenExpiryTime = await localStorage.getItem("tokenExpiryTime");
      const currentTime = new Date().getTime();
      console.log("tokenExpiryTime", tokenExpiryTime);
      if (tokenExpiryTime && currentTime > parseInt(tokenExpiryTime, 10)) {
        console.log("Token expiré. Déconnexion automatique...");
        logout();
      }
    };

    // Vérifier l'expiration du token toutes les minutes
    const interval = setInterval(checkTokenExpiration, 4 * 60 * 60 * 1000); // 4 hours

    return () => clearInterval(interval);
  }, [logout]);

  return (
    <div>
      <AuthProvider>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;