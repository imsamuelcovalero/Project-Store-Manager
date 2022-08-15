// const ProductsModel = require('../models/Products');

const verify = {
  verifyProduct: (itemsSold, allSales) => {
    // const verifyArray = [];
    // const verifyProductId = await Promise.all(
    //     itemsSold.map(({ productId }) => ProductsModel
    //       .getByPk(productId)),
    // );
    // verifyProductId.forEach((item) => {
    //   if (item === undefined) verifyArray.push(item);
    // });
    // console.log(verifyArray.length);
    // if (verifyArray.length > 0) {
    //   return false;
    // }
    const ids = allSales.map(({ id }) => id);
    const validate = itemsSold.every(({ productId }) => ids.includes(productId));

    return validate;
  },
};

module.exports = verify;