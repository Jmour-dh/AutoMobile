import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { hostname } from "../../hostname/hostname";
import { useAuth } from "../../utils/UseConnecte";
import styles from "./Login.module.scss";

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  // State pour gérer la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);

  // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = yup.object({
    Email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("L'email n'est pas valide")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Format d'email invalide"
      ),
    Password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
  });

  const initialValues = {
    Email: "",
    Password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (credentials) => {
    try {
      clearErrors();
      const response = await axios.post(`${hostname}/login`, credentials);
  
      const { authToken, user } = response.data;
      localStorage.setItem("roleId", user.Role_ID);
      
  
      if (!authToken || !user) {
        setError("generic", {
          type: "generic",
          message: "Réponse du serveur incorrecte",
        });
        return;
      }
  
      auth.login(authToken, user.User_ID);
  
      // Logique conditionnelle pour la redirection en fonction du roleId
      switch (user.Role_ID) {
        case 1:
          navigate("/admin/messages/list");
          break;
        case 2:
          navigate("/user/details/tabBord");
          break;
        default:
          navigate("/personal/messages/list");
          break;
      }
    } catch (error) {
      console.error(error);
  
      if (error.response && error.response.status === 401) {
        setError("generic", {
          type: "generic",
          message: "Mauvais email/mot de passe",
        });
      } else {
        setError("generic", {
          type: "generic",
          message: "Erreur lors de la connexion",
        });
      }
    }
  });
  
  
  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <form onSubmit={submit}>
          <h2 className="m-10 p-10">Connexion</h2>
          <div className="d-flex flex-column m-10">
            <label htmlFor="email">Email:</label>
            <input type="email" name="Email" {...register("Email")} />
            {errors.Email && (
              <p className="form-error">{errors.Email.message}</p>
            )}
            <label htmlFor="password">Mot de passe:</label>
            <div className="passwordInputContainer">
              <input
                type={showPassword ? "text" : "password"}
                name="Password"
                {...register("Password")}
              />
              {showPassword ? (
                <BsFillEyeSlashFill onClick={togglePasswordVisibility} />
              ) : (
                <IoEyeSharp onClick={togglePasswordVisibility} />
              )}
            </div>
            {errors.Password && (
              <p className="form-error">{errors.Password.message}</p>
            )}
            {errors.generic && (
              <div className="mb-10">
                <p className="form-error">{errors.generic.message}</p>
              </div>
            )}
            <button className="bn5 m-20" disabled={isSubmitting}>
              Se connecter
            </button>
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
