import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { hostname } from "../../../../../../../hostname/hostname";
import styles from "./UpdateUser.module.scss";
function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const validationSchema = yup.object({
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
    FirstName: "",
    LastName: "",
    Phone: "",
    Address: "",
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
    const fetchUserById = async () => {
      const token = localStorage.getItem("userToken");
      try {
        const response = await axios.get(`${hostname}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const user = response.data;
        // Pré-remplir le formulaire avec les détails du personnel
        Object.keys(user).forEach((key) => {
          setValue(key, user[key]);
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du user par ID :", error);
      }
    };

    fetchUserById();
  }, [userId, setValue]);

  const submit = handleSubmit(async (user) => {
    const token = localStorage.getItem("userToken");
    try {
      clearErrors();
      // Envoyez la mise à jour au backend
      await axios.put(`${hostname}/users/${userId}`, user, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      navigate("/admin/users/list");
    } catch (error) {
      setError("generic", { type: "generic", message: error.message });
    }
  });

  const handleCancelClick = () => {
    navigate("/admin/users/list");
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
            <label htmlFor="LastName">Prénom:</label>
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
          <div className="d-flex  justify-content-center align-items-center">
            <button className="bn53" onClick={handleCancelClick}>
              Annuler
            </button>
            <button className="bn632-hover bn22 m-5" disabled={isSubmitting}>
              Enregister
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default UpdateUser;
