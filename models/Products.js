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
};

module.exports = Products;