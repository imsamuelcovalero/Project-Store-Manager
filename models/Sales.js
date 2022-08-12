const connection = require('./connection');

const Sales = {
  // getByPk: async (id) => {
  //   const [[result]] = await connection.query(`
  //     SELECT * from StoreManager.products
  //     WHERE id = ?
  //   `, [id]);
  //   return result;
  // },

  // getAll: async () => {
  //   const [result] = await connection.query('SELECT * from StoreManager.products');
  //   return result;
  // },

  create: async (quantity) => {
    const [result] = await connection.query(`
    INSERT INTO StoreManager.sales(productId, quantity)
    VALUES(?)
    `, [quantity]);
    return { productId: result.insertId, quantity };
  },
};

module.exports = Sales;