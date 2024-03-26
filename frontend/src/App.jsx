import React, { Suspense } from "react"; 
import { Outlet } from "react-router-dom"; 
import { AuthProvider } from "./utils/UseConnecte"; 
import Header from "./Header/Header"; 
import Footer from "./Footer/Footer"; 

function App() {
  return (
    <div>
      <AuthProvider> {/* Enveloppe le contenu avec le composant AuthProvider */}
        <Header /> 
        <Suspense> {/* Utilisation de Suspense pour gérer le chargement asynchrone */}
          <Outlet /> {/* Rendu du contenu principal, probablement défini par les routes, via Outlet de React Router */}
        </Suspense>
        <Footer /> 
      </AuthProvider>
    </div>
  );
}

export default App; 
