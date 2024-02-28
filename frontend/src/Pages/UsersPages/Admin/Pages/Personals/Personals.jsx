import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Personals.module.scss";
import PersonalNav from "./Components/PersonalNav/PersonalNav";

function Personals() {
  const { key } = useLocation();
  return (
    <div className={styles.container}>
      <h4>Gestion des personnels</h4>
      <div>
        <PersonalNav />
        <div>
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Personals;
