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

  delete: async (id) => {
    const [{ affectedRows }] = await connection.query(`
    DELETE FROM StoreManager.sales
    WHERE id = ?
    `, [id]);
    return affectedRows;
  },

  update: async ({ id, productId, quantity }) => {
    await connection.query(`
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?
    `, [quantity, id, productId]);
    return { productId, quantity };
  },
};

module.exports = Sales;