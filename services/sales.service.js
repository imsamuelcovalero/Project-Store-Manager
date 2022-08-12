// const CustomError = require('../errors/CustomError');
// const NotFoundError = require('../errors/NotFoundError');
const SalesModel = require('../models/Sales');

const salesService = {
  // getProductById: async (id) => {
  //   const result = await ProductsModel.getByPk(id);
  //   if (!result) {
  //     return false;
  //   }
  //   return result;
  // },

  // getAll: async () => {
  //   const data = await ProductsModel.getAll();
  //   return data;
  // },

  create: async (quantity) => {
    const result = await SalesModel.create(quantity);
    return result;
  },
};

module.exports = salesService;