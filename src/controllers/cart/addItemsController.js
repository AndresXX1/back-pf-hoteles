const { Cart } = require('../../db');

const addToCart = async (req, res) => {
  try {
      const { userId, productId } = req.body;
      if (!userId || !productId) {
          return res.status(400).json({ error: 'UserId y ProductId son campos obligatorios.' });
      }
      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
          cart = await Cart.create({ userId, productId: [productId] }); 
      } else {
          await cart.update({ productId: [...cart.productId, productId] }); 
      }
      return res.status(201).json({ message: 'Producto agregado al carrito correctamente.' });
  } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
module.exports = addToCart;
