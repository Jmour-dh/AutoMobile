import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import styles from "./Login.module.scss";

function Login() {
  // State pour gérer la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);

  // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <form>
          <h2 className="m-10 p-10">Connexion</h2>
          <div className="d-flex flex-column m-10">
            <label htmlFor="email">Votre e-mail:</label>
            <input type="email" name="email" />
            <label htmlFor="password">Votre mot de passe:</label>
            <div className="passwordInputContainer">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
              />
              {showPassword ? (
                <BsFillEyeSlashFill onClick={togglePasswordVisibility} />
              ) : (
                <IoEyeSharp onClick={togglePasswordVisibility} />
              )}
            </div>
            <button className="bn5 m-20">Se connecter</button>
            <p className="m-5">
              Vous n'avez pas de compte?
              <Link to="/register" className="m-5">
                Inscription
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
