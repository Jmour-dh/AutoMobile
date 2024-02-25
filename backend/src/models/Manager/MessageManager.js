const AbstractManager = require("../AbstractManager");

class messageManager extends AbstractManager {
  constructor() {
    super({ table: "message" });
  }

  async insertMessage(message) {
    const query = `
      INSERT INTO ${this.table}
        (FirstNameVisiter, LastNameVisiter, EmailVisiter, Objet, Message, User_ID, Moto_ID)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      message.FirstNameVisiter,
      message.LastNameVisiter,
      message.EmailVisiter,
      message.Objet,
      message.Message,
      message.User_ID,
      message.Moto_ID,
    ];

    return this.database.query(query, values);
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE Message_ID = ?`,
      [id]
    );
  }

  update(message) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      FirstNameVisiter = ?, 
      LastNameVisiter = ?, 
      EmailVisiter = ?, 
      Objet = ?, 
      Message = ? 
      WHERE Message_ID = ?`,
      [
        message.FirstNameVisiter,
        message.LastNameVisiter,
        message.EmailVisiter,
        message.Objet,
        message.Message,
        message.id,
      ]
    );
  }

  async deleteMessage(messageID) {
    const query = `
      DELETE FROM ${this.table}
      WHERE Message_ID = ?`;

    const values = [messageID];

    return this.database.query(query, values);
  }
}

module.exports = messageManager;
