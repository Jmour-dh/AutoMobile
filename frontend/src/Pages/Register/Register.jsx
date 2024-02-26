import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.scss";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";

function Register() {
  // State pour gérer la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);

  // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fonction pour basculer la visibilité du mot de passe de confirmation
  const togglePasswordConfVisibility = () => {
    setShowPasswordConf(!showPasswordConf);
  };
  return (
    <section className={styles.register}>
      <div className={styles.container}>
        <form>
          <h2 className="m-10 p-10">Inscription</h2>
          <div className={styles.content}>
            <div className={styles.contentInfo}>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="firstName"> Nom:</label>
                <input type="text" name="firstName" />
              </div>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="lastName"> Votre Prénom:</label>
                <input type="text" name="lastName" />
              </div>
              <div className="d-flex flex-column  mx-10">
                <label htmlFor="address"> Adresse:</label>
                <input type="text" name="address" />
              </div>
              <div className="d-flex flex-column  mx-10">
                <label htmlFor="phone"> Télephone:</label>
                <input type="text" name="phone" />
              </div>
            </div>
            <div className={styles.contentLogin}>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="email"> Email:</label>
                <input type="email" name="email" />
              </div>
              <div className="d-flex flex-column  mx-10">
                <label htmlFor="password"> Mot de passe:</label>
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
              </div>
              <div className="d-flex flex-column  mx-10 ">
                <label htmlFor="confirmPassword">
                  Confirmation de mot de passe:
                </label>
                <div className="passwordInputContainer">
                  <input
                    type={showPasswordConf ? "text" : "password"}
                    name="confirmPassword"
                  />
                  {showPasswordConf ? (
                    <BsFillEyeSlashFill
                      onClick={togglePasswordConfVisibility}
                    />
                  ) : (
                    <IoEyeSharp onClick={togglePasswordConfVisibility} />
                  )}
                </div>
              </div>
              <div className="d-flex flex-column  justify-content-center align-items-center">
              <button className="bn5 m-5 ">Créer votre compte</button>

              <p >
                Vous avez déjà un compte ?
                <Link to="/login" className="m-10">
                  Se connecter
                </Link>
              </p>
            </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
