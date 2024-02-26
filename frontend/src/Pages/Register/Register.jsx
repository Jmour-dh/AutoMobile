import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Register.module.scss";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import VerifyEmail from "../../components/VerifyEmail";
import { hostname } from "../../hostname/hostname";

function Register() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("L'email n'est pas valide")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Format d'email invalide"
      ),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
    firstName: yup
      .string()
      .required("Le nom est requise")
      .matches(
        /^[A-Za-z]+$/,
        "Le nom doit contenir uniquement des caractères alphabétiques"
      )
      .min(2, "Le nom doit comporter au moins 2 caractères")
      .max(30, "Le nom ne peut pas dépasser 30 caractères"),
    lastName: yup
      .string()
      .required("Le prénom est requise")
      .matches(
        /^[A-Za-z]+$/,
        "Le prénom doit contenir uniquement des caractères alphabétiques"
      )
      .min(2, "Le prénom doit comporter au moins 2 caractères")
      .max(30, "Le prénom ne peut pas dépasser 30 caractères"),

    phone: yup
      .string()
      .required("Le téléphone est requise")
      .matches(
        /^[0-9]{10}$/,
        "Le numéro de téléphone doit contenir exactement 10 chiffres"
      ),
    address: yup
      .string()
      .required("L'adresse est requise")
      .max(255, "L'adresse ne peut pas dépasser 255 caractères"),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
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

  const submit = handleSubmit(async (client) => {
    try {
      clearErrors();
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("generic", { type: "generic", message: error.message });
    }
  });

  // State pour gérer la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailVerificationMessage, setEmailVerificationMessage] = useState("");

  // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fonction pour basculer la visibilité du mot de passe de confirmation
  const togglePasswordConfVisibility = () => {
    setShowPasswordConf(!showPasswordConf);
  };

  const handleEmailVerification = (isAvailable, message) => {
    setEmailVerified(isAvailable);
    setEmailVerificationMessage(message);
  };
  return (
    <section className={styles.register}>
      <div className={styles.container}>
        <form onSubmit={submit}>
          <h2 className="m-10 p-10">Inscription</h2>
          <div className={styles.content}>
            <div className={styles.contentInfo}>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="firstName"> Nom:</label>
                <input
                  type="text"
                  name="firstName"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="form-error">{errors.firstName.message}</p>
                )}
              </div>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="lastName"> Votre Prénom:</label>
                <input type="text" name="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <p className="form-error">{errors.lastName.message}</p>
                )}
              </div>
              <div className="d-flex flex-column  mx-10">
                <label htmlFor="address"> Adresse:</label>
                <input type="text" name="address" {...register("address")} />
                {errors.address && (
                  <p className="form-error">{errors.address.message}</p>
                )}
              </div>
              <div className="d-flex flex-column  mx-10">
                <label htmlFor="phone"> Téléphone:</label>
                <input type="text" name="phone" {...register("phone")} />
                {errors.phone && (
                  <p className="form-error">{errors.phone.message}</p>
                )}
              </div>
            </div>
            <div className={styles.contentLogin}>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="email"> Email:</label>
                <input type="email" name="email" {...register("email")} />
                {errors.email && (
                  <p className="form-error">{errors.email.message}</p>
                )}
              </div>
              <VerifyEmail
                email={email}
                onVerification={handleEmailVerification}
              />
              {!emailVerified && <p>{emailVerificationMessage}</p>}
              <div className="d-flex flex-column  mx-10">
                <label htmlFor="password"> Mot de passe:</label>
                <div className="passwordInputContainer">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    {...register("password")}
                  />
                  {showPassword ? (
                    <BsFillEyeSlashFill onClick={togglePasswordVisibility} />
                  ) : (
                    <IoEyeSharp onClick={togglePasswordVisibility} />
                  )}
                </div>
                {errors.password && (
                  <p className="form-error">{errors.password.message}</p>
                )}
              </div>
              <div className="d-flex flex-column  mx-10 ">
                <label htmlFor="confirmPassword">
                  Confirmation de mot de passe:
                </label>
                <div className="passwordInputContainer">
                  <input
                    type={showPasswordConf ? "text" : "password"}
                    name="confirmPassword"
                    {...register("confirmPassword")}
                  />
                  {showPasswordConf ? (
                    <BsFillEyeSlashFill
                      onClick={togglePasswordConfVisibility}
                    />
                  ) : (
                    <IoEyeSharp onClick={togglePasswordConfVisibility} />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="form-error">{errors.confirmPassword.message}</p>
                )}
              </div>
              {errors.generic && (
                <div className="mb-10">
                  <p className="form-error">{errors.generic.message}</p>
                </div>
              )}
              <div className="d-flex flex-column  justify-content-center align-items-center">
                <button className="bn5 m-5" disabled={isSubmitting}>
                  Créer votre compte
                </button>

                <p>
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
