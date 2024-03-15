const AbstractManager = require("../AbstractManager");

class motoManager extends AbstractManager {
  constructor() {
    super({ table: "moto" });
  }

  async insertMoto(moto) {
    const query = `
    INSERT INTO ${this.table}
    (Title, Modele, Marque, CreationDate, Year, Origin, FirstHand, OdometerMileage, Energy, Gearbox, Color, NumberOfPlaces, FiscalPower, Powers, Price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      moto.Title,
      moto.Modele,
      moto.Marque,
      moto.CreationDate,
      moto.Year,
      moto.Origin,
      moto.FirstHand,
      moto.OdometerMileage,
      moto.Energy,
      moto.Gearbox,
      moto.Color,
      moto.NumberOfPlaces,
      moto.FiscalPower,
      moto.Powers,
      moto.Price,
    ];

    const result = await this.database.query(query, values);
    return result[0].insertId; // Retourne l'ID de la moto insérée
  }

  async insertMotoImages(motoId, imageUrls) {
    const query = `INSERT INTO moto_images (Moto_ID, ImageUrl) VALUES ?`;
    const values = imageUrls.map((url) => [motoId, url]);

    return this.database.query(query, [values]);
  }

  async findAllWithImages() {
    const query = `
    SELECT moto.*, GROUP_CONCAT(moto_images.ImageUrl) AS images
    FROM moto
    LEFT JOIN moto_images ON moto.Moto_ID = moto_images.Moto_ID
    GROUP BY moto.Moto_ID`;

    const [rows] = await this.database.query(query);
    return rows.map((row) => ({
      ...row,
      images: row.images ? row.images.split(",") : [],
    }));
  }

  async updateMotoImages(motoId, newImageUrls) {
    try {
      // Supprime d'abord toutes les images existantes associées à la moto
      await this.database.query("DELETE FROM moto_images WHERE Moto_ID = ?", [
        motoId,
      ]);

      // Insère les nouvelles images associées à la moto
      const query = "INSERT INTO moto_images (Moto_ID, ImageUrl) VALUES ?";
      const values = newImageUrls.map((url) => [motoId, url]);

      await this.database.query(query, [values]);

      return true; // Ou tout autre indicateur de succès
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour des images de la moto :",
        err
      );
      throw err;
    }
  }

  async findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Moto_ID = ?`,
      [id]
    );
  }

  async findImagesByPK(id) {
    const query = `
    SELECT ImageUrl
    FROM moto_images
    WHERE Moto_ID = ?`;

    const [rows] = await this.database.query(query, [id]);
    return rows.map((row) => row.ImageUrl);
  }

  async update(moto, motoID) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      Title = ?,Modele = ?, Marque = ?, CreationDate = ?, Year = ?, Origin = ?, FirstHand = ?, OdometerMileage = ?, Energy = ?, Gearbox = ?, Color = ?, NumberOfPlaces = ?, FiscalPower = ?, Powers = ?,Price = ?
      WHERE Moto_ID = ?`,
      [
        moto.Title,
        moto.Modele,
        moto.Marque,
        moto.CreationDate,
        moto.Year,
        moto.Origin,
        moto.FirstHand,
        moto.OdometerMileage,
        moto.Energy,
        moto.Gearbox,
        moto.Color,
        moto.NumberOfPlaces,
        moto.FiscalPower,
        moto.Powers,
        moto.Price,
        motoID,
      ]
    );
  }

  async deleteMoto(motoID) {
    const query = `
      DELETE FROM ${this.table}
      WHERE Moto_ID = ?`;

    const values = [motoID];

    return this.database.query(query, values);
  }

  async filterMotosByCriteria(criteria) {
    let query = `SELECT * FROM ${this.table}`;

    // Vérifiez si des critères de filtre ont été fournis
    if (criteria && Object.keys(criteria).length > 0) {
      query += " WHERE";

      // Ajoutez les conditions de filtre en fonction des critères fournis
      if (criteria.Marque) {
        query += ` Marque = '${criteria.Marque}' AND`;
      }

      if (criteria.Year) {
        query += ` Year = '${criteria.Year}' AND`;
      }

      if (criteria.OdometerMileage) {
        query += ` OdometerMileage = ${criteria.OdometerMileage} AND`;
      }

      // Supprimez le "AND" superflu à la fin de la requête
      query = query.slice(0, -3);
    }

    const [rows] = await this.database.query(query);
    return rows;
  }
}

module.exports = motoManager;
