import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddService.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { hostname } from "../../../../../../../hostname/hostname";

function AddService() {
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);

  const validationSchema = yup.object({
    Nom: yup
      .string()
      .required("Le nom est requis")
      .matches(
        /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
        "Le nom doit contenir uniquement des caractères alphabétiques, y compris les accents"
      )
      .min(2, "Le nom doit comporter au moins 2 caractères")
      .max(30, "Le nom ne peut pas dépasser 30 caractères"),
    Description: yup
      .string()
      .required("La description est requise")
      .min(2, "La description doit comporter au moins 2 caractères")
      .max(500, "La description ne peut pas dépasser 500 caractères"),
    Price: yup
      .number()
      .required("Le prix est requis")
      .positive("Le prix doit être un nombre positif")
      .typeError("Le prix doit être un nombre")
      .transform((originalValue, originalObject) => {
        if (typeof originalValue === "string") {
          return originalValue.replace(",", ".");
        }
        return originalValue;
      }),
    ImageUrl: yup.mixed().test("fileSize", "L'image est requise", (value) => {
      return value && value.length > 0;
    }),
  });

  const initialValues = {
    Nom: "",
    Description: "",
    Price: "",
    ImageUrl: "",
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

      const formData = new FormData();
      formData.append("Nom", data.Nom);
      formData.append("Description", data.Description);
      formData.append("Price", data.Price);
      

      // Ajoutez seulement la première image du tableau, car nous permettons à l'utilisateur de sélectionner une seule image
      formData.append("ImageUrl", selectedImages[0]);

      const token = localStorage.getItem("userToken");
      const response = await axios.post(`${hostname}/services`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Mettez à jour le state avec le chemin de l'image retourné par le serveur
      setSelectedImages([response.data.ImageUrl]);

      console.log("Réponse du serveur:", response.data);
      navigate("/admin/services/list");
    } catch (error) {
      console.error("Erreur côté frontend:", error);
      setError("generic", { type: "generic", message: error.message });
    }
  });

  const handleCancelClick = () => {
    navigate("/admin/services/list");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Prenez uniquement le premier fichier sélectionné
    setSelectedImages([file]); // Mettez à jour le state avec le nouveau fichier
  };
  return (
    <section className={styles.container}>
      <form onSubmit={submit}>
        <div className={styles.content}>
          <div className="d-flex flex-column mx-10">
            <label htmlFor="Nom"> Nom:</label>
            <input type="text" name="Nom" {...register("Nom")} />
            {errors.Nom && <p className="form-error">{errors.Nom.message}</p>}
          </div>
          <div className="d-flex flex-column mx-10">
            <label htmlFor="Description">Description:</label>
            <input
              type="text"
              name="Description"
              {...register("Description")}
            />
            {errors.Description && (
              <p className="form-error">{errors.Description.message}</p>
            )}
          </div>
          <div className="d-flex flex-column  mx-10">
            <label htmlFor="Price"> Prix:</label>
            <input type="text" name="Price" {...register("Price")} />
            {errors.Price && (
              <p className="form-error">{errors.Price.message}</p>
            )}
          </div>
          <div className="d-flex flex-column  mx-10">
            <label htmlFor="ImageUrl"> Image:</label>
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="file"
                name="ImageUrl"
                {...register("ImageUrl")}
                onChange={handleImageChange}
              />
            </div>
            {errors.ImageUrl && (
              <p className="form-error">{errors.ImageUrl.message}</p>
            )}
          </div>
          {errors.generic && (
            <div className="mb-10">
              <p className="form-error">{errors.generic.message}</p>
            </div>
          )}
          <div className="d-flex  justify-content-center align-items-center">
            <button className="bn53" onClick={handleCancelClick}>
              Annuler
            </button>
            <button className="bn632-hover bn22 m-5" disabled={isSubmitting}>
              Valider
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddService;
