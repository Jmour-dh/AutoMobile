import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Personal.module.scss";
import NavigationPersonal from "../../../components/NavigationPersonal/NavigationPersonal";

function Personal() {
  return (
    <div className={styles.container}>
    <div className={styles.contentNav}>
      <NavigationPersonal />
    </div>
    <div className={styles.contentOutlet}>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  </div>
  )
}

export default Personal