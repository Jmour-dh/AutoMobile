import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavigationAdmin from "../../../components/NavigationAdmin/NavigationAdmin";
import styles from "./Admin.module.scss";

function Admin() {
  return (
    <div className={styles.container}>
      <div className={styles.contentNav}>
        <NavigationAdmin />
      </div>
      <div className={styles.contentOutlet}>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default Admin;
