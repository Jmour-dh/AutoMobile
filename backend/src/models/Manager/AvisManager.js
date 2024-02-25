const AbstractManager = require("../AbstractManager");

class avisManager extends AbstractManager {
  constructor() {
    super({ table: "avis" });
  }

  async insertAvis(avis) {
    const query = `
      INSERT INTO ${this.table}
        (FirstNameVisiter, LastNameVisiter,EmailVisiter, Comment, Note, Service_ID,User_ID)
      VALUES (?, ?, ?, ?, ?, ?, ?) `;
    const values = [
      avis.FirstNameVisiter,
      avis.LastNameVisiter,
      avis.EmailVisiter,
      avis.Comment,
      avis.Note,
      avis.Service_ID,
      avis.User_ID,
    ];
    return this.database.query(query, values);
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Avis_ID = ?`,
      [id]
    );
  }

  update(avis) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      FirstNameVisiter =?, LastNameVisiter=?, EmailVisiter=?, Comment=?, Note=?
      WHERE Avis_ID = ?`,
      [
        avis.FirstNameVisiter,
        avis.LastNameVisiter,
        avis.EmailVisiter,
        avis.Comment,
        avis.Note,
        avis.id,
      ]
    );
  }

  async deleteAvis(avisID) {
    const query = `
      DELETE FROM ${this.table}
      WHERE Avis_ID = ?`;

    const values = [avisID];

    return this.database.query(query, values);
  }
}
module.exports = avisManager;
