import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./BanniereContact.module.scss";
import axios from "axios";
import { hostname } from "../../hostname/hostname";
import { useAuth } from "../../utils/UseConnecte";

function BanniereContact() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const generateValidationSchema = () => {
    const baseSchema = {
      EmailVisiter: yup
        .string()
        .required("Il faut préciser votre Email")
        .email("L'Email n'est pas valide")
        .matches(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          "Format d'Email invalide"
        ),
    };

    if (isLoggedIn) {
      return yup.object({
        ...baseSchema,
        Objet: yup
          .string()
          .required("L'objet est requis")
          .min(10, "L'objet doit comporter au moins 10 caractères")
          .max(100, "L'objet ne peut pas dépasser 100 caractères"),
        Message: yup
          .string()
          .required("Le message est requis")
          .min(10, "Le message doit comporter au moins 10 caractères")
          .max(500, "Le message ne peut pas dépasser 500 caractères"),
      });
    } else {
      return yup.object({
        ...baseSchema,
        FirstNameVisiter: yup
          .string()
          .required("Le nom est requis")
          .matches(
            /^[A-Za-z]+$/,
            "Le nom doit contenir uniquement des caractères alphabétiques"
          )
          .min(2, "Le nom doit comporter au moins 2 caractères")
          .max(30, "Le nom ne peut pas dépasser 30 caractères"),
        LastNameVisiter: yup
          .string()
          .required("Le prénom est requis")
          .matches(
            /^[A-Za-z\s]+$/,
            "Le prénom doit contenir uniquement des caractères alphabétiques"
          )
          .min(2, "Le prénom doit comporter au moins 2 caractères")
          .max(30, "Le prénom ne peut pas dépasser 30 caractères"),
        Objet: yup
          .string()
          .required("L'objet est requis")
          .min(10, "L'objet doit comporter au moins 10 caractères")
          .max(100, "L'objet ne peut pas dépasser 100 caractères"),
        Message: yup
          .string()
          .required("Le message est requis")
          .min(10, "Le message doit comporter au moins 10 caractères")
          .max(500, "Le message ne peut pas dépasser 500 caractères"),
      });
    }
  };

  const validationSchema = generateValidationSchema();


  const initialValues = {
    EmailVisiter: "",
    FirstNameVisiter: "",
    LastNameVisiter: "",
    Objet: "",
    Message: "",
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

  const submit = handleSubmit(async (data) => {
    try {
      clearErrors();
      if (isLoggedIn) {
        // Si l'utilisateur est connecté, récupérez le userId du local storage
        const userId = localStorage.getItem("userId");
        // Ajoutez le userId aux données avant la soumission
        data.userId = userId;
      }
      // Continuez avec la soumission du formulaire
      const response = await axios.post(`${hostname}/contacts`, data);
      console.log("Réponse du serveur:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Erreur côté frontend:", error);
      setError("generic", { type: "generic", message: error.message });
    }
  });
  

  return (
    <div className={styles.container}>
      <div className={styles.contacter}>
        <h2>Contactez-nous</h2>
        {isLoggedIn ? (
          <form onSubmit={submit}>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="Objet"> Objet:</label>
              <input type="text" name="Objet" {...register("Objet")} />
              {errors.Objet && (
                <p className="form-error">{errors.Objet.message}</p>
              )}
            </div>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="Message"> Message:</label>
              <textarea type="text" name="Message" {...register("Message")} />
              {errors.Message && (
                <p className="form-error">{errors.Message.message}</p>
              )}
            </div>
            {errors.generic && (
              <div className="mb-10">
                <p className="form-error">{errors.generic.message}</p>
              </div>
            )}
            <button className="m-5" disabled={isSubmitting}>
              Envoyer
            </button>
          </form>
        ) : (
          <form onSubmit={submit}>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="FirstNameVisiter"> Nom:</label>
              <input
                type="text"
                name="FirstNameVisiter"
                {...register("FirstNameVisiter")}
              />
              {errors.FirstNameVisiter && (
                <p className="form-error">{errors.FirstNameVisiter.message}</p>
              )}
            </div>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="LastNameVisiter"> Prénom:</label>
              <input
                type="text"
                name="LastNameVisiter"
                {...register("LastNameVisiter")}
              />
              {errors.LastNameVisiter && (
                <p className="form-error">{errors.LastNameVisiter.message}</p>
              )}
            </div>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="Objet"> Objet:</label>
              <input type="text" name="Objet" {...register("Objet")} />
              {errors.Objet && (
                <p className="form-error">{errors.Objet.message}</p>
              )}
            </div>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="Message"> Message:</label>
              <textarea type="text" name="Message" {...register("Message")} />
              {errors.Message && (
                <p className="form-error">{errors.Message.message}</p>
              )}
            </div>
            {errors.generic && (
              <div className="mb-10">
                <p className="form-error">{errors.generic.message}</p>
              </div>
            )}
            <button className="m-5" disabled={isSubmitting}>
              Envoyer
            </button>
          </form>
        )}
      </div>
      <div className={styles.hours}></div>
    </div>
  );
}

export default BanniereContact;
