const connection = require('./connection');

const Sales = {
  getByPk: async (id) => {
    const [result] = await connection.query(`
    SELECT s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
    FROM StoreManager.sales_products as sp
    LEFT JOIN StoreManager.sales as s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY productId
    `, [id]);
    return result;
  },

  getAll: async () => {
    const [result] = await connection.query(`
    SELECT sp.sale_id AS saleId, s.date AS date, sp.product_id AS productId, sp.quantity AS quantity
    FROM StoreManager.sales_products as sp
    LEFT JOIN StoreManager.sales as s
    ON sp.sale_id = s.id
    ORDER BY saleId ASC, productId ASC`); 
    return result;
  },

  createSale: async () => {
    const [result] = await connection.query(`
    INSERT INTO StoreManager.sales(date)
    VALUES(NOW())`);
    return { id: result.insertId };
  },
  insertSalesProducts: async ({ id, productId, quantity }) => {
    await connection.query(`
    INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity)
    VALUES(?, ?, ?)
    `, [id, productId, quantity]);
    return { productId, quantity };
  },
};

module.exports = Sales;