import React, { useState, useEffect } from "react";
import styles from "./BanniereFilter.module.scss";
import { Marques } from "../../data/Marques";
import { Years } from "../../data/Years";

function BanniereFilter({ onFilterChange, filters }) {
  const [marqueFilter, setMarqueFilter] = useState(filters.Marque);
  const [marques, setMarques] = useState([]);
  const [yearFilter, setYearFilter] = useState(filters.Year);
  const [year, setYear] = useState([]);
  const [odometerMileageIntervals, setOdometerMileageIntervals] = useState([
    { label: "0-50000", value: "50000", checked: false },
    { label: "50001-100000", value: "100000", checked: false },
    { label: "100001+", value: "500000", checked: false },
  ]);

  useEffect(() => {
    setMarques(Marques);
    setYear(Years);
  }, []);

  const getSelectedOdometerMileage = () => {
    const selectedIntervals = odometerMileageIntervals.filter(
      (interval) => interval.checked
    );

    const selectedValues = selectedIntervals.map((interval) => interval.value);
    return selectedValues.join(",");
  };

  const handleFilterChange = () => {
    onFilterChange({
      Marque: marqueFilter,
      Year: yearFilter,
      OdometerMileage: getSelectedOdometerMileage(),
    });
  };

  const toggleOdometerMileageInterval = (value) => {
    const updatedIntervals = odometerMileageIntervals.map(
      (interval) =>
        interval.value === value
          ? { ...interval, checked: !interval.checked }
          : { ...interval, checked: false } // Assurez-vous qu'une seule case est cochée
    );
    setOdometerMileageIntervals(updatedIntervals);
  };

  return (
    <div className={styles.BanniereFilter}>
      <h2>Filtrer par :</h2>
      <label>
        Marque :
        <select
          value={marqueFilter}
          onChange={(e) => setMarqueFilter(e.target.value)}
        >
          <option value="">Sélectionnez une marque</option>
          {marques.map((marque) => (
            <option key={`marque-${marque.id}`} value={marque.name}>
              {marque.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Kilométrage :
        {odometerMileageIntervals.map((interval, index) => (
          <div key={`interval-${index}`}>
            <input
              type="checkbox"
              checked={interval.checked || false}
              onChange={() => toggleOdometerMileageInterval(interval.value)}
            />
            <span>{interval.label}</span>
          </div>
        ))}
      </label>
      <label>
        Année :
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">Sélectionnez une année</option>
          {year.map((year, index) => (
            <option key={`year-${index}`} value={year.year}>
              {year.year}
            </option>
          ))}
        </select>
      </label>
      {/* Ajoutez d'autres éléments de filtre si nécessaire */}
      <button onClick={handleFilterChange}>Appliquer le filtre</button>
    </div>
  );
}

export default BanniereFilter;
