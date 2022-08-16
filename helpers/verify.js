// const ProductsModel = require('../models/Products');

const verify = {
  verifyProduct: (itemsSold, allProducts) => {
    const ids = allProducts.map(({ id }) => id);
    const validate = itemsSold.every(({ productId }) => ids.includes(productId));

    return validate;
  },

  verifySaleProducts: (itemsToUpdate, allProducts) => {
    const ids = allProducts.map(({ id }) => id);
    // console.log('ids', ids);
    // console.log('itemsToUpdate', itemsToUpdate);
    const validate = itemsToUpdate.every(({ productId }) => ids.includes(productId));
    // console.log('validate', validate);

    return validate;
  },
};

module.exports = verify;