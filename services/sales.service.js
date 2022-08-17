const CustomError = require('../errors/CustomError');
const SalesModel = require('../models/Sales');
const ProductsModel = require('../models/Products');
const verify = require('../helpers/verify');

const salesService = {
  getSaleById: async (id) => {
    const result = await SalesModel.getByPk(id);
    if (result.length === 0) {
      throw new CustomError(404, 'Sale not found');
    }

    return result;
  },

  getAll: async () => {
    const sales = await SalesModel.getAll();
    return sales;
  },
  
  create: async (itemsSold) => {
    const allProducts = await ProductsModel.getAll();
    const verifyIfProductExists = verify.verifyProduct(itemsSold, allProducts);
    if (verifyIfProductExists === false) {
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

  delete: async (id) => {
    const verifySale = await SalesModel.getByPk(id);
    if (verifySale.length === 0) {
      throw new CustomError(404, 'Sale not found');
    }
    const result = await SalesModel.delete(id);
    return result;
  },

  update: async (id, itemsToUpdate) => {
    const verifySale = await SalesModel.getByPk(id);
    if (verifySale.length === 0) {
      throw new CustomError(404, 'Sale not found');
    }

    const allProducts = await ProductsModel.getAll();
    const verifyIfProductExists = verify.verifySaleProducts(itemsToUpdate, allProducts);
    if (verifyIfProductExists === false) {
      throw new CustomError(404, 'Product not found');
    }

    const salesToUpdate = await Promise.all(
      itemsToUpdate.map(({ productId, quantity }) => SalesModel
        .update({ id, productId, quantity })),
    );
    const saleUpdated = { saleId: id, itemsUpdated: salesToUpdate };
    return saleUpdated;
  },
};

module.exports = salesService;