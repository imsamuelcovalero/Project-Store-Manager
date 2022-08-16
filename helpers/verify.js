// const ProductsModel = require('../models/Products');

const verify = {
  verifyProduct: (itemsSold, allSales) => {
    const ids = allSales.map(({ id }) => id);
    const validate = itemsSold.every(({ productId }) => ids.includes(productId));

    return validate;
  },
};

module.exports = verify;