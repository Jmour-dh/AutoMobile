import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Messages.module.scss";
import MessageNav from "./Components/MessageNav/MessageNav";

function Messages() {
  const { key } = useLocation();
  return (
    <div className={styles.container}>
      <h4>Gestion des messages</h4>
      <div>
        <MessageNav />
        <div>
          <Suspense>
            <Outlet key={key} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Messages;
