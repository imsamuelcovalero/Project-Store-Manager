const verify = {
  verifyProduct: (itemsSold, allProducts) => {
    const ids = allProducts.map(({ id }) => id);
    const validate = itemsSold.every(({ productId }) => ids.includes(productId));

    return validate;
  },

  verifySaleProducts: (itemsToUpdate, allProducts) => {
    const ids = allProducts.map(({ id }) => id);
    const validate = itemsToUpdate.every(({ productId }) => ids.includes(productId));

    return validate;
  },
};

module.exports = verify;