const CustomError = require('../errors/CustomError');
const ProductsModel = require('../models/Products');

const productsService = {
  getProduct: async (id) => {
    const result = await ProductsModel.getByPk(id);
    if (!result) {
      throw new CustomError(404, 'Product not found');
    }
    return result;
  },

  getAll: async () => {
    const data = await ProductsModel.getAll();
    return data;
  },
};

module.exports = productsService;