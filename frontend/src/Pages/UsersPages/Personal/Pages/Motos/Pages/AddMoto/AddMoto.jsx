import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddMoto.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { hostname } from "../../../../../../../hostname/hostname";
import { useDropzone } from "react-dropzone";

function AddMoto() {
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [fileError, setFileError] = useState(null);

  const validationSchema = yup.object({
    Title: yup.string().required("Le titre est requis"),
    Modele: yup.string().required("Le modèle est requis"),
    Marque: yup.string().required("La marque est requise"),
    CreationDate: yup.string().required("La date de création est requise"),
    Year: yup.number().required("L'année est requise"),
    Origin: yup.string(),
    FirstHand: yup
      .string()
      .oneOf(["1", "0"], "Veuillez sélectionner une option")
      .required("La sélection est requise"),
    OdometerMileage: yup.number(),
    Energy: yup
      .string()
      .oneOf(["Electrique", "Essence"], "Veuillez sélectionner une option")
      .required("La sélection est requise"),
    Gearbox: yup
      .string()
      .oneOf(["Manuelle", "Automatique"], "Veuillez sélectionner une option"),
    Color: yup.string(),
    NumberOfPlaces: yup.number(),
    FiscalPower: yup.number(),
    Powers: yup.number(),
    Price: yup.number(),
    ImageUrl: yup.array(),
    // .min(1, "Veuillez sélectionner au moins une image")
    // .max(6, "Vous ne pouvez sélectionner que jusqu'à six images")
    // .required("Veuillez sélectionner au moins une image"),
  });

  const initialValues = {
    Title: "",
    Modele: "",
    Marque: "",
    CreationDate: "",
    Year: "",
    Origin: "",
    FirstHand: "",
    OdometerMileage: "",
    Energy: "",
    Gearbox: "",
    Color: "",
    NumberOfPlaces: "",
    FiscalPower: "",
    Powers: "",
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

const onDrop = (acceptedFiles) => {
  // Filtrez les fichiers pour s'assurer qu'ils ne soient pas déjà sélectionnés (évitez les doublons)
  const newFiles = acceptedFiles.filter(newFile =>
    !selectedImages.find(existingFile => existingFile.name === newFile.name));

  // Combine les fichiers existants avec les nouveaux, tout en s'assurant de ne pas dépasser 6 fichiers au total
  const updatedFiles = [...selectedImages, ...newFiles].slice(0, 6);

  setSelectedImages(updatedFiles);

  // Réinitialise ou affiche les erreurs si nécessaire
  if (updatedFiles.length < 1) {
    setFileError("Au moins une image est requise.");
  } else if (updatedFiles.length > 6) {
    setFileError("Vous ne pouvez sélectionner que jusqu'à six images.");
  } else {
    setFileError(null);
  }
};

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 6,
    onDrop,
    multiple: true,
  });

const submit = handleSubmit(async (data) => {
  try {
    clearErrors();

    const formData = new FormData();
    formData.append("Title", data.Title);
    formData.append("Modele", data.Modele);
    formData.append("Marque", data.Marque);
    formData.append("CreationDate", data.CreationDate);
    console.log(data.CreationDate);
    formData.append("Year", data.Year);
    formData.append("Origin", data.Origin);
    formData.append("FirstHand", data.FirstHand);
    formData.append("OdometerMileage", data.OdometerMileage);
    formData.append("Energy", data.Energy);
    formData.append("Gearbox", data.Gearbox);
    formData.append("Color", data.Color);
    formData.append("NumberOfPlaces", data.NumberOfPlaces);
    formData.append("FiscalPower", data.FiscalPower);
    formData.append("Powers", data.Powers);
    formData.append("Price", data.Price);

    // Ajoutez correctement toutes les images sélectionnées
selectedImages.forEach((image, index) => {
  formData.append("images", image, image.name); // Utilisez "images" au lieu de "ImageUrl"
});

    const token = localStorage.getItem("userToken");

    const response = await axios.post(`${hostname}/motos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log("Réponse du serveur:", response.data);
    navigate("/personal/motos/list");
  } catch (error) {
    console.error("Erreur côté frontend:", error);
    setError("generic", { type: "generic", message: error.message });
  }
});


  const handleCancelClick = () => {
    navigate("/personal/motos/list");
  };

  return (
    <section className={styles.container}>
      <form onSubmit={submit}>
        <div className={styles.content}>
          <div className={styles.contentInfo}>
            <div className="d-flex flex-column  mx-10">
              <label htmlFor="ImageUrl"> Image:</label>
              <div
                {...getRootProps()}
                className="d-flex align-items-center justify-content-center dropzone"
              >
                <input {...getInputProps({ name: "ImageUrl" })} />

                <p>
                  Glissez-déposez des fichiers ici ou cliquez pour sélectionner
                </p>
              </div>
              {fileError && <p className="form-error">{fileError}</p>}
              {selectedImages.length > 0 && (
                <div className="selected-images">
                  {selectedImages.map((file) => (
                    <img
                      key={file.name}
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  ))}
                </div>
              )}
              {errors.ImageUrl && (
                <p className="form-error">{errors.ImageUrl.message}</p>
              )}
            </div>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="Title"> Titre:</label>
              <input type="text" name="Title" {...register("Title")} />
              {errors.Title && (
                <p className="form-error">{errors.Title.message}</p>
              )}
            </div>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="Modele"> Modele:</label>
              <input type="text" name="Modele" {...register("Modele")} />
              {errors.Modele && (
                <p className="form-error">{errors.Modele.message}</p>
              )}
            </div>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="Marque"> Marque:</label>
              <input type="text" name="Marque" {...register("Marque")} />
              {errors.Marque && (
                <p className="form-error">{errors.Marque.message}</p>
              )}
            </div>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="CreationDate"> Mise en circulation:</label>
              <input
                type="date"
                name="CreationDate"
                {...register("CreationDate")}
              />
              {errors.CreationDate && (
                <p className="form-error">{errors.CreationDate.message}</p>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column mx-10">
                <label htmlFor="Year"> Année:</label>
                <input type="text" name="Year" {...register("Year")} />
                {errors.Year && (
                  <p className="form-error">{errors.Year.message}</p>
                )}
              </div>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="Origin"> Origine:</label>
                <input type="text" name="Origin" {...register("Origin")} />
                {errors.Origin && (
                  <p className="form-error">{errors.Origin.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.contentInfo}>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column mx-10">
                <label htmlFor="OdometerMileage"> Kilometrage:</label>
                <input
                  type="text"
                  name="OdometerMileage"
                  {...register("OdometerMileage")}
                />
                {errors.OdometerMileage && (
                  <p className="form-error">{errors.OdometerMileage.message}</p>
                )}
              </div>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="FirstHand">Première main:</label>
                <select name="FirstHand" {...register("FirstHand")}>
                  <option value="">Sélectionner votre choix</option>
                  <option value="1">Oui</option>
                  <option value="0">Non</option>
                </select>

                {errors.FirstHand && (
                  <p className="form-error">{errors.FirstHand.message}</p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column mx-10">
                <label htmlFor="Energy">Energie:</label>
                <select name="Energy" {...register("Energy")}>
                <option value="">
                    Sélectionner votre choix
                  </option>
                  <option value="Essence">Essence</option>
                  <option value="Electrique">Electrique</option>
                </select>
                {errors.Energy && (
                  <p className="form-error">{errors.Energy.message}</p>
                )}
              </div>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="Gearbox">Boite de vitesses:</label>
                <select name="Gearbox" {...register("Gearbox")}>
                  <option value="">
                    Sélectionner votre choix
                  </option>
                  <option value="Manuelle">Manuelle</option>
                  <option value="Automatique">Automatique</option>
                </select>
                {errors.Gearbox && (
                  <p className="form-error">{errors.Gearbox.message}</p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column mx-10">
                <label htmlFor="Color"> Couleur:</label>
                <input type="text" name="Color" {...register("Color")} />
                {errors.Color && (
                  <p className="form-error">{errors.Color.message}</p>
                )}
              </div>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="NumberOfPlaces"> Nombre des places:</label>
                <input
                  type="text"
                  name="NumberOfPlaces"
                  {...register("NumberOfPlaces")}
                />
                {errors.NumberOfPlaces && (
                  <p className="form-error">{errors.NumberOfPlaces.message}</p>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column mx-10">
                <label htmlFor="FiscalPower"> Pouvoir Fiscal:</label>
                <input
                  type="text"
                  name="FiscalPower"
                  {...register("FiscalPower")}
                />
                {errors.FiscalPower && (
                  <p className="form-error">{errors.FiscalPower.message}</p>
                )}
              </div>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="Powers">Puissances:</label>
                <input type="text" name="Powers" {...register("Powers")} />
                {errors.Powers && (
                  <p className="form-error">{errors.Powers.message}</p>
                )}
              </div>
            </div>
            <div className="d-flex flex-column mx-10">
              <label htmlFor="Price">Prix:</label>
              <input type="text" name="Price" {...register("Price")} />
              {errors.Price && (
                <p className="form-error">{errors.Price.message}</p>
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
        </div>
      </form>
    </section>
  );
}

export default AddMoto;
