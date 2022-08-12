const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const { validateName } = require('../middlewares/validators');

const route = Router();

route.get('/:id', productsController.getProductById);
route.get('/', productsController.getAll);
route.post('/', validateName, productsController.create);

module.exports = route;