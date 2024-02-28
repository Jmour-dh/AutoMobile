import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Avis.module.scss";
import AvisNav from "./Components/AvisNav/AvisNav";

function Avis() {
  const { key } = useLocation();
  return (
    <div className={styles.container}>
      <h4>Gestion des avis</h4>
      <div>
        <AvisNav />
        <div>
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Avis;
