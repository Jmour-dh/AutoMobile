const AbstractManager = require("../AbstractManager");

class motoManager extends AbstractManager {
  constructor() {
    super({ table: "moto" });
  }

  async insertMoto(moto) {
    const query = `
      INSERT INTO ${this.table}
      (Modele, Marque, CreationDate, Year, Origin, FirstHand, OdometerMileage, Energy, Gearbox, Color, NumberOfPlaces, FiscalPower, Powers, Photo1, Photo2, Photo3, Photo4, Photo5, Photo6)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?) `;

    const values = [
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
      moto.Photo1,
      moto.Photo2,
      moto.Photo3,
      moto.Photo4,
      moto.Photo5,
      moto.Photo6,
    ];

    return this.database.query(query, values);
  }

  async findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Moto_ID = ?`,
      [id]
    );
  }

  async update(moto) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      Modele = ?, Marque = ?, CreationDate = ?, Year = ?, Origin = ?, FirstHand = ?, OdometerMileage = ?, Energy = ?, Gearbox = ?, Color = ?, NumberOfPlaces = ?, FiscalPower = ?, Powers = ?, Photo1 = ?, Photo2 = ?, Photo3 = ?, Photo4 = ?, Photo5 = ?, Photo6 = ?
      WHERE Moto_ID = ?`,
      [
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
        moto.Photo1,
        moto.Photo2,
        moto.Photo3,
        moto.Photo4,
        moto.Photo5,
        moto.Photo6,
        moto.id,
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
}

module.exports = motoManager;
