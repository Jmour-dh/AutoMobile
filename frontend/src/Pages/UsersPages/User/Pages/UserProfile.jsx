import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from './UserProfile.module.scss'
import ProfileNav from "../Components/ProfileNav/ProfileNav";

function UserProfile() {
  const { key } = useLocation();
  return (
    <div className={styles.container}>
      <h4>Gestion de profil</h4>
      <div>
        <ProfileNav/>
        <div>
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default UserProfile