import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import BanniereProfile from "../../../components/BanniereProfile/BanniereProfile";
import NavigationUser from "../../../components/NavigationUser/NavigationUser";
import styles from "./User.module.scss";

function User() {
  return (
    <div className={styles.container}>
      <div >
        <BanniereProfile />
      </div>
      <div className={styles.content}>
        <div className={styles.contentNav}>
          <NavigationUser />
        </div>
        <div className={styles.contentOutlet}>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default User;
