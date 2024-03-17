import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Motos.module.scss";
import MotoNav from "./Components/MotoNav/MotoNav";

function Motos() {
  const { key } = useLocation();
  return (
    <div className={styles.container}>
      <h4>Gestion des motos</h4>
      <div>
        <MotoNav />
        <div>
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Motos;
