const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
const { validateSales } = require('../middlewares/validators');

const route = Router();

// route.get('/', salesController.getAll);
// route.get('/:id', salesController.getSaleById);
route.post('/', validateSales, salesController.create);

module.exports = route;