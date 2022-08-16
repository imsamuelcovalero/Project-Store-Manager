// const NotFoundError = require('../errors/NotFoundError');
const CustomError = require('../errors/CustomError');
const ProductsModel = require('../models/Products');

const productsService = {
  getProductById: async (id) => {
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

  create: async (newProductName) => {
    const result = await ProductsModel.create(newProductName);
    return result;
  },

  update: async (id, newProductName) => {
    const verifyProduct = await ProductsModel.getByPk(id);
    if (!verifyProduct) {
      throw new CustomError(404, 'Product not found');
    }
    const result = await ProductsModel.update(id, newProductName);
    return result;
  },

  delete: async (id) => {
    const verifyProduct = await ProductsModel.getByPk(id);
    if (!verifyProduct) {
      throw new CustomError(404, 'Product not found');
    }
    const result = await ProductsModel.delete(id);
    return result;
  },
};

module.exports = productsService;