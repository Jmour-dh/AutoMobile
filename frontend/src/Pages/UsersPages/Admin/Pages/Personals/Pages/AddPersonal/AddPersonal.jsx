import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddPersonal.module.scss";
import VerifyEmail from "../../../../../../../components/VerifyEmail";
import VerifyPhone from "../../../../../../../components/VerifyPhone";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { hostname } from "../../../../../../../hostname/hostname";

function AddPersonal() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    Email: yup
      .string()
      .required("Il faut préciser votre Email")
      .email("L'Email n'est pas valide")
      .matches(
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Format d'Email invalide"
      ),
    Password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("Password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
    FirstName: yup
      .string()
      .required("Le nom est requise")
      .matches(
        /^[A-Za-z]+$/,
        "Le nom doit contenir uniquement des caractères alphabétiques"
      )
      .min(2, "Le nom doit comporter au moins 2 caractères")
      .max(30, "Le nom ne peut pas dépasser 30 caractères"),
    LastName: yup
      .string()
      .required("Le prénom est requis")
      .matches(
        /^[A-Za-z\s]+$/,
        "Le prénom doit contenir uniquement des caractères alphabétiques"
      )
      .min(2, "Le prénom doit comporter au moins 2 caractères")
      .max(30, "Le prénom ne peut pas dépasser 30 caractères"),

    Phone: yup
      .string()
      .required("Le téléPhone est requise")
      .matches(
        /^[0-9]{10}$/,
        "Le numéro de téléPhone doit contenir exactement 10 chiffres"
      ),
    Address: yup
      .string()
      .required("L'adresse est requise")
      .max(255, "L'adresse ne peut pas dépasser 255 caractères"),
  });

  const initialValues = {
    Email: "",
    Password: "",
    confirmPassword: "",
    FirstName: "",
    LastName: "",
    Phone: "",
    Address: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    watch,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const email = watch("Email");
  const phone = watch("Phone");

  const submit = handleSubmit(async (data) => {
    try {
      // Effectuez vos vérifications ici
      if (!emailVerified && !phoneVerified) {
        clearErrors();
        // Continuez avec la soumission du formulaire
        const response = await axios.post(
          `${hostname}/users/createPersonal`,
          data
        );
        console.log("Réponse du serveur:", response.data);
        navigate("/admin/personals/list");
      } else {
        alert(
          (emailVerificationMessage || "") +
            (phoneVerificationMessage ? "\n" + phoneVerificationMessage : "") ||
            "Vérification requise."
        );
      }
    } catch (error) {
      console.error("Erreur côté frontend:", error);
      setError("generic", { type: "generic", message: error.message });
    }
  });

  // State pour gérer la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailVerificationMessage, setEmailVerificationMessage] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneVerificationMessage, setPhoneVerificationMessage] = useState("");

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

  const handlePhoneVerification = (isAvailable, message) => {
    setPhoneVerified(isAvailable);
    setPhoneVerificationMessage(message);
  };

  return (
    <section className={styles.container}>
      <form onSubmit={submit}>
        <div className={styles.contentInfo}>
          <div className="d-flex flex-column mx-10">
            <label htmlFor="FirstName"> Nom:</label>
            <input type="text" name="FirstName" {...register("FirstName")} />
            {errors.FirstName && (
              <p className="form-error">{errors.FirstName.message}</p>
            )}
          </div>
          <div className="d-flex flex-column mx-10">
            <label htmlFor="LastName"> Votre Prénom:</label>
            <input type="text" name="LastName" {...register("LastName")} />
            {errors.LastName && (
              <p className="form-error">{errors.LastName.message}</p>
            )}
          </div>
          <div className="d-flex flex-column  mx-10">
            <label htmlFor="Address"> Adresse:</label>
            <input type="text" name="Address" {...register("Address")} />
            {errors.Address && (
              <p className="form-error">{errors.Address.message}</p>
            )}
          </div>
          <div className="d-flex flex-column  mx-10">
            <label htmlFor="Phone"> Téléphone:</label>
            <input type="text" name="Phone" {...register("Phone")} />
            {errors.Phone && (
              <p className="form-error">{errors.Phone.message}</p>
            )}
          </div>
          <VerifyPhone phone={phone} onVerification={handlePhoneVerification} />
          {!phoneVerified && <p>{phoneVerificationMessage}</p>}
        </div>
        <div className={styles.contentLogin}>
          <div className="d-flex flex-column mx-10">
            <label htmlFor="Email"> Email:</label>
            <input type="email" name="Email" {...register("Email")} />
            {errors.Email && (
              <p className="form-error">{errors.Email.message}</p>
            )}
          </div>
          <VerifyEmail email={email} onVerification={handleEmailVerification} />
          {!emailVerified && <p>{emailVerificationMessage}</p>}
          <div className="d-flex flex-column  mx-10">
            <label htmlFor="Password"> Mot de passe:</label>
            <div className="passwordInputContainer">
              <input
                type={showPassword ? "text" : "Password"}
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
          </div>
          <div className="d-flex flex-column  mx-10 ">
            <label htmlFor="confirmPassword">
              Confirmation de mot de passe:
            </label>
            <div className="passwordInputContainer">
              <input
                type={showPasswordConf ? "text" : "Password"}
                name="confirmPassword"
                {...register("confirmPassword")}
              />
              {showPasswordConf ? (
                <BsFillEyeSlashFill onClick={togglePasswordConfVisibility} />
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
              Valider
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddPersonal;
