import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./utils/UseConnecte";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Suspense>
          <Outlet />
        </Suspense>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
