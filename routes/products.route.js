const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const route = Router();

route.get('/:id', productsController.getProductById);
route.get('/', productsController.getAll);

module.exports = route;