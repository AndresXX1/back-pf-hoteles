const { Cart } = require("../../db");

const getCartItemsController = async (userId) => {
  const cart = await Cart.findOne({
    where: { userId },
  });

  return cart;
};

module.exports = getCartItemsController;
