const AbstractManager = require("../AbstractManager");

class serviceManager extends AbstractManager {
  constructor() {
    super({ table: "service" });
  }

  async insertService(service) {
    const query = `
      INSERT INTO ${this.table}
        (Nom, Description, Price, ImageUrl)
      VALUES (?, ?, ?, ?) `;
    const values = [
      service.Nom,
      service.Description,
      service.Price,
      service.ImageUrl,
    ];
    return this.database.query(query, values);
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Service_ID = ?`,
      [id]
    );
  }

  update(service) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      Nom =?, Description =?, Price =?, ImageUrl =?
      WHERE Service_ID = ?`,
      [
        service.Nom,
        service.Description,
        service.Price,
        service.ImageUrl,
        service.id,
      ]
    );
  }
  async deleteService(serviceID) {
    const query = `
      DELETE FROM ${this.table}
      WHERE Service_ID = ?`;

    const values = [serviceID];

    return this.database.query(query, values);
  }
}
module.exports = serviceManager;
