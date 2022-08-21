const productsService = require('../services/products.service');

const productsController = {
  getProductById: async (req, res) => {
    console.log('aqui');
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

    res.status(200).json(updatedProduct);
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await productsService.delete(id);
    
    res.status(204).json();
  },

  getProductsByName: async (req, res) => {
    const { q } = req.query;
    const products = await productsService.getProductsByName(q);
    console.log('products', products);

    res.status(200).json(products);
  },
};

module.exports = productsController;