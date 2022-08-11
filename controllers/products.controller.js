const productsService = require('../services/products.service');

const productsController = {
  getProductById: async (req, res) => {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (product === false) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  },

  getAll: async (_req, res) => {
    const products = await productsService.getAll();
    res.status(200).json(products);
  },

  // create: async(req, res) => {
  //   const { cep, logradouro, bairro, localidade, uf } = req.body;
  //   const address = {cep, logradouro, bairro, localidade, uf};
  //   await cepService.create(address);

  //   res.status(201).json(address);
  // }
};

module.exports = productsController;