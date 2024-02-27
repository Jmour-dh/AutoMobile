import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Users.module.scss";
import UserNav from "./Components/UserNav/UserNav";

function Users() {
  const { key } = useLocation();
  return (
    <div className={styles.container}>
      <h4>Gestion des utilisateurs</h4>
      <div>
        <UserNav/>
        <div>
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Users;
