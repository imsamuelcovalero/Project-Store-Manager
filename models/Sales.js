const connection = require('./connection');

const Sales = {
  getByPk: async (id) => {
    const [[result]] = await connection.query(`
      SELECT * from StoreManager.sales
      WHERE id = ?
      LEFT JOIN StoreManager.sales_products
      ON StoreManager.sales.id = StoreManager.sales_products.sale_id
      ORDER BY StoreManager.sales.id ASC, StoreManager.sales_products.id ASC;
    `, [id]);
    return result;
  },

  getAll: async () => {
    const [result] = await connection.query(`
    SELECT * from StoreManager.sales
    LEFT JOIN StoreManager.sales_products
    ON StoreManager.sales.id = StoreManager.sales_products.sale_id`);
    console.log('result', result);
    return {
      saleId: result.sale_id,
      date: result.date,
      productId: result.product_id,
      quantity: result.quantity,
    };
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