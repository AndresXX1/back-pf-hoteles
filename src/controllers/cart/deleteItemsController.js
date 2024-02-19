const { Cart } = require('../../db'); 

const removeFromCart = async (req, res) => {
  try {
      const { userId, productId } = req.body;
      if (!userId || !productId) {
          return res.status(400).json({ error: 'UserId y ProductId son campos obligatorios.' });
      }
      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
          return res.status(404).json({ error: 'No se encontró el carrito para el usuario proporcionado.' });
      }
      const cartNew = cart.productId.filter(id => id !== productId);

      if (cartNew !== cart.productId){
      cart.productId = cartNew
      await cart.save();
      return res.status(200).json({ message: 'Producto eliminado del carrito correctamente.' });
    }
      else{
        return res.status(400).json({ error: 'No se borro correctamente' });
      }
  } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = removeFromCart;
