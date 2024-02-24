const AbstractManager = require("../AbstractManager");

class ExperiedTokenManager extends AbstractManager {
  constructor() {
    super({ table: "experiedtokens" });
  }

  findByToken(token) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE jwtToken = ?`,
      [token]
    );
  }

  insert(token) {
    return this.database.query(
      `INSERT INTO ${this.table} (jwtToken) VALUES (?)`,
      [token]
    );
  }
}

module.exports = ExperiedTokenManager;
