import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Contacts.module.scss";
import ContactNav from "./Components/ContactNav/ContactNav";

function Contacts() {
  const { key } = useLocation();
  return (
    <div className={styles.container}>
      <h4>Gestion des contacts</h4>
      <div>
        <ContactNav />
        <div>
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
