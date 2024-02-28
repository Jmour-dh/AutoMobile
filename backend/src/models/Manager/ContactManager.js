const AbstractManager = require("../AbstractManager");

class contactManager extends AbstractManager {
  constructor() {
    super({ table: "contact" });
  }

  async insertContact(contact) {
    const query = `
      INSERT INTO ${this.table}
        (FirstNameVisiter, LastNameVisiter,EmailVisiter, Objet, Message,User_ID)
      VALUES ( ?, ?, ?, ?, ?, ?) `;
    const values = [
      contact.FirstNameVisiter,
      contact.LastNameVisiter,
      contact.EmailVisiter,
      contact.Objet,
      contact.Message,
      contact.User_ID,
    ];
    return this.database.query(query, values);
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Contact_ID = ?`,
      [id]
    );
  }

  update(contact) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      FirstNameVisiter =?, LastNameVisiter=?, EmailVisiter=?, Objet=?, Message=?
      WHERE Contact_ID = ?`,
      [
        contact.FirstNameVisiter,
        contact.LastNameVisiter,
        contact.EmailVisiter,
        contact.Objet,
        contact.Note,
        contact.id,
      ]
    );
  }

  async deleteContact(contactID) {
    const query = `
      DELETE FROM ${this.table}
      WHERE Contact_ID = ?`;

    const values = [contactID];

    return this.database.query(query, values);
  }
}
module.exports = contactManager;
