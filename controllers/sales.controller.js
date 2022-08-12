const salesService = require('../services/sales.service');

const salesController = {
  // getProductById: async (req, res) => {
  //   const { id } = req.params;
  //   const product = await productsService.getProductById(id);
  //   if (product === false) {
  //     return res.status(404).json({ message: 'Product not found' });
  //   }
  //   return res.status(200).json(product);
  // },

  // getAll: async (_req, res) => {
  //   const products = await productsService.getAll();
    
  //   res.status(200).json(products);
  // },

  create: async (req, res) => {
    const { quantity } = req.body;
    const newSale = await salesService.create(quantity);

    res.status(201).json(newSale);
  },
};

module.exports = salesController;