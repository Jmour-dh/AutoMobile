const AbstractManager = require("../AbstractManager");

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

  async insertPersonal(user) {
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
      3,
    ];
    return this.database.query(query, values);
  }

  findByPK(id) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE User_ID = ?`,
      [id]
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET 
        FirstName = ?, 
        LastName = ?, 
        Address = ?, 
        Email = ?, 
        Phone = ? 
      WHERE User_ID = ?`,
      [
        user.FirstName,
        user.LastName,
        user.Address,
        user.Email,
        user.Phone,
        user.id,
      ]
    );
  }

  login(user) {
    return this.database.query(`SELECT * FROM  ${this.table} WHERE Email = ?`, [
      user.Email,
    ]);
  }

  verifyExistingEmail(email) {
    return this.database
      .query("SELECT COUNT(*) AS count FROM user WHERE Email = ?", [email])
      .then(([results]) => {
        const { count } = results[0];
        return count > 0;
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la vérification de l'utilisateur existant :",
          error
        );
        throw error;
      });
  }

  verifyExistingPhone(phone) {
    return this.database
      .query("SELECT COUNT(*) AS count FROM user WHERE Phone = ?", [phone])
      .then(([results]) => {
        const { count } = results[0];
        return count > 0;
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la vérification de l'utilisateur existant :",
          error
        );
        throw error;
      });
  }
}

module.exports = userManager;
