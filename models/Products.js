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
};

module.exports = Products;