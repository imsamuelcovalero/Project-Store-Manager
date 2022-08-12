const { Router } = require('express');
const salesController = require('../controllers/sales.controller');
// const { /* validateNameExists, validateNameLength,  */validateProduct } = require('../middlewares/product.validate');

const route = Router();

route.post('/', /* validateProduct, */ salesController.create);

module.exports = route;