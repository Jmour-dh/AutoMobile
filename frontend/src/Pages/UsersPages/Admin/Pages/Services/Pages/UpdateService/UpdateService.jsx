import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { hostname } from "../../../../../../../hostname/hostname";
import styles from "./UpdateService.module.scss";

function UpdateService() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageName, setImageName] = useState("");

  const validationSchema = yup.object({
    Nom: yup
      .string()
      .required("Le nom est requis")
      .matches(
        /^[A-Za-z\s]+$/,
        "Le nom doit contenir uniquement des caractères alphabétiques"
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
    setValue,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchServiceById = async () => {
      const token = localStorage.getItem("userToken");
      try {
        const response = await axios.get(`${hostname}/services/${serviceId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const service = response.data;

        // Pré-remplir le formulaire avec les détails du service
        Object.keys(service).forEach((key) => {
          if (key === "ImageUrl") {
            setSelectedImages([service[key]]);
            setImageName(service[key].split("/").pop()); // Récupérez le nom du fichier à partir de l'URL
          } else {
            setValue(key, service[key]);
          }
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du service par ID :",
          error
        );
      }
    };

    fetchServiceById();
  }, [serviceId, setValue, setSelectedImages]);

  const submit = handleSubmit(async (data) => {
    try {
      clearErrors();

      console.log("Données du formulaire:", data);

      const formData = new FormData();
      formData.append("Nom", data.Nom);
      formData.append("Description", data.Description);
      formData.append("Price", data.Price);

      // Ajoutez seulement la première image du tableau, car nous permettons à l'utilisateur de sélectionner une seule image
      formData.append("ImageUrl", selectedImages[0]);

      console.log("Image sélectionnée:", selectedImages[0]);

      const token = localStorage.getItem("userToken");

      const response = await axios.put(
        `${hostname}/services/${serviceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Réponse du serveur:", response.data);

      // Mettez à jour le state avec le chemin de l'image retourné par le serveur
      setSelectedImages([response.data.ImageUrl]);

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
    const file = event.target.files[0];
    console.log(file);

    setSelectedImages([file]);
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
            <div className="d-flex flex-column align-items-center justify-content-center">
              <input
                type="file"
                name="ImageUrl"
                {...register("ImageUrl")}
                onChange={handleImageChange}
              />
              <div className="d-flex align-items-center justify-content-center">
                <p>{imageName}</p>
              </div>
            </div>
            {errors.ImageUrl && (
              <p className="form-error">{errors.ImageUrl.message}</p>
            )}
          </div>
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

export default UpdateService;
