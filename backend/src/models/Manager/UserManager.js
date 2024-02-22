const AbstractManager = require("../AbstractManager/AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }
  async insertUser(user) {
    const query = `
      INSERT INTO ${this.table}
        (FirstName, LastName, Address, Email, Phone, HashedPassword, Role_ID)
      VALUES (?, ?, ?, ?, ?, ?, ?) `;
    const values = [
      user.FirstName,
      user.LastName,
      user.Address,
      user.Email,
      user.Phone,
      user.HashedPassword,
      2,
    ];
    return this.database.query(query, values);
  }
}

module.exports = userManager;

