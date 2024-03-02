const AbstractManager = require("../AbstractManager");

class motoManager extends AbstractManager {
  constructor() {
    super({ table: "moto" });
  }

  async insertMoto(moto) {
    const query = `
      INSERT INTO ${this.table}
      (Title,Modele, Marque, CreationDate, Year, Origin, FirstHand, OdometerMileage, Energy, Gearbox, Color, NumberOfPlaces, FiscalPower, Powers,Price, ImageUrl)
      VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

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
      moto.ImageUrl,
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
      Title = ?,Modele = ?, Marque = ?, CreationDate = ?, Year = ?, Origin = ?, FirstHand = ?, OdometerMileage = ?, Energy = ?, Gearbox = ?, Color = ?, NumberOfPlaces = ?, FiscalPower = ?, Powers = ?,Price = ?, ImageUrl = ?
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
        moto.ImageUrl,
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
