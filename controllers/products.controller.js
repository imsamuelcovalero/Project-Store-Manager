const productsService = require('../services/products.service');

const productsController = {
  getProductById: async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    
    res.status(200).json(product);
  },

  getAll: async (_req, res) => {
    const products = await productsService.getAll();
    
    res.status(200).json(products);
  },

  create: async (req, res) => {
    const { name } = req.body;
    const newProduct = await productsService.create(name);

    res.status(201).json(newProduct);
  },
};

module.exports = productsController;