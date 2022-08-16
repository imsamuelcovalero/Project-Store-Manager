const connection = require('./connection');

const Products = {
  getByPk: async (id) => {
    const [[result]] = await connection.query(`
      SELECT * from StoreManager.products
      WHERE id = ?
    `, [id]);
    return result;
  },

  getAll: async () => {
    const [result] = await connection.query('SELECT * from StoreManager.products');
    return result;
  },

  create: async (name) => {
    const [result] = await connection.query(`
    INSERT INTO StoreManager.products(name)
    VALUES(?)
    `, [name]);
    return { id: result.insertId, name };
  },

  update: async (id, name) => {
    await connection.query(`
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
    `, [name, id]);
    return { id, name };
  },

  delete: async (id) => {
    const [{ affectedRows }] = await connection.query(`
    DELETE FROM StoreManager.products
    WHERE id = ?
    `, [id]);
    return affectedRows;
  },

  getProductsByName: async (name) => {
    const [result] = await connection.query(`
    SELECT * from StoreManager.products
    WHERE name LIKE ?
    `, [`%${name}%`]);
    return result;
  },
};

module.exports = Products;