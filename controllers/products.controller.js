const productsService = require('../services/products.service');

const productsController = {
  getProduct: async (req, res) => {
    const { id } = req.params;
    // Aqui foi necessário formatar o CEP também para pesquisá-lo sem o hífen, pois ele não está com hífen no banco de dados.
    const product = await productsService.getProduct(id);

    res.status(200).json(product);
  },

  getAll: async (req, res) => {
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