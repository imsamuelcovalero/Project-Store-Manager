const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const { validateSales } = require('../middlewares/validators');

const route = Router();

route.get('/', salesController.getAll);
route.post('/', validateSales, salesController.create);
route.get('/:id', salesController.getSaleById);
route.delete('/:id', salesController.delete);
route.put('/:id', validateSales, salesController.update);

module.exports = route;