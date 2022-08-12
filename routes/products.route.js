const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const { /* validateNameExists, validateNameLength,  */
  validateName } = require('../middlewares/product.validate');

const route = Router();

route.get('/:id', productsController.getProductById);
route.get('/', productsController.getAll);
route.post('/', validateName, productsController.create);

module.exports = route;