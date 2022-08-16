const { Router } = require('express');
const productsController = require('../controllers/products.controller');
const { validateName } = require('../middlewares/validators');

const route = Router();

route.get('/search', productsController.getProductsByName);
route.get('/:id', productsController.getProductById);
route.put('/:id', validateName, productsController.update);
route.delete('/:id', productsController.delete);
route.get('/', productsController.getAll);
route.post('/', validateName, productsController.create);

module.exports = route;