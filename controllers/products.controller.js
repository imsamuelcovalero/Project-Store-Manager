const productsService = require('../services/products.service');
// const CustomError = require('../errors/CustomError');

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

  update: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedProduct = await productsService.update(id, name);

    // if (updatedProduct === false) {
    //   throw new CustomError(404, 'Product not found');
    // }

    res.status(200).json(updatedProduct);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await productsService.delete(id);

    // if (deletedProduct === false) {
    //   throw new CustomError(404, 'Product not found');
    // }
    
    res.status(204).json();
  },
};

module.exports = productsController;