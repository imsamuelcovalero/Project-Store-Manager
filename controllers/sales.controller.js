const salesService = require('../services/sales.service');

const salesController = {
  getSaleById: async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getSaleById(id);

    return res.status(200).json(sale);
  },

  getAll: async (_req, res) => {
    const sales = await salesService.getAll();
    
    res.status(200).json(sales);
  },

  create: async (req, res) => {
    const itemsSold = req.body;
    // console.log(itemsSold);
    const newSale = await salesService.create(itemsSold);

    res.status(201).json(newSale);
  },
};

module.exports = salesController;