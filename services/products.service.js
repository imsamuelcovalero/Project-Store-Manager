// const CustomError = require('../errors/CustomError');
const NotFoundError = require('../errors/NotFoundError');
const ProductsModel = require('../models/Products');

const productsService = {
  getProductById: async (id) => {
    const result = await ProductsModel.getByPk(id);
    if (!result) {
      return false;
    }
    return result;
  },

  getAll: async () => {
    const data = await ProductsModel.getAll();
    return data;
  },
};

module.exports = productsService;