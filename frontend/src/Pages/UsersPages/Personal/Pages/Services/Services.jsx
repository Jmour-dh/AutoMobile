import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Services.module.scss";
import ServiceNav from "./Components/ServiceNav/ServiceNav";

function Services() {
  const { key } = useLocation();
  return (
    <div className={styles.container}>
      <h4>Gestion des services</h4>
      <div>
        <ServiceNav />
        <div>
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Services;
