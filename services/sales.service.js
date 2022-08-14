const CustomError = require('../errors/CustomError');
const SalesModel = require('../models/Sales');
const ProductsModel = require('../models/Products');

const salesService = {
  getSaleById: async (id) => {
    const result = await SalesModel.getByPk(id);
    if (!result) {
      throw new CustomError(404, 'Sale not found');
    }

    return result;
  },

  getAll: async () => {
    const data = await SalesModel.getAll();
    const sales = [{ ...data }];
    console.log('sales', sales);
    return sales;
  },

  create: async (itemsSold) => {
    const verifyArray = [];
    const verifyProductId = await Promise.all(
        itemsSold.map(({ productId }) => ProductsModel
          .getByPk(productId)),
    );
    verifyProductId.forEach((item) => {
      if (item === undefined) verifyArray.push(item);
    });

    if (verifyArray.length > 0) {
      throw new CustomError(404, 'Product not found');
    }

    const { id } = await SalesModel.createSale();
    const sales = await Promise.all(
      itemsSold.map(({ productId, quantity }) => SalesModel
        .insertSalesProducts({ id, productId, quantity })),
    );
    const newSale = { id, itemsSold: sales };
    return newSale;
  },
};

module.exports = salesService;