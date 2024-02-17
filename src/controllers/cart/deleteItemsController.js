// Importa los modelos y los módulos necesarios
const { Cart } = require('../../db'); // Asegúrate de importar el modelo Cart adecuadamente

// Define la función del controlador
const removeFromCart = async (req, res) => {
  try {
      // Extrae userId y productId del cuerpo de la solicitud
      const { userId, productId } = req.body;

      // Verifica si userId y productId están presentes en la solicitud
      if (!userId || !productId) {
          return res.status(400).json({ error: 'UserId y ProductId son campos obligatorios.' });
      }

      // Busca el carrito del usuario
      const cart = await Cart.findOne({ where: { userId } });

      // Si no se encuentra el carrito, devuelve un error
      if (!cart) {
          return res.status(404).json({ error: 'No se encontró el carrito para el usuario proporcionado.' });
      }

      // Filtra el arreglo del carrito para excluir el productId que se desea eliminar
      const cartNew = cart.productId.filter(id => id !== productId);

      cart.productId = cartNew

      // Guarda los cambios en el carrito
      await cart.save();

      // Retorna una respuesta exitosa
      return res.status(200).json({ message: 'Producto eliminado del carrito correctamente.' });
  } catch (error) {
      // Maneja los errores
      console.error('Error al eliminar producto del carrito:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


// Exporta el controlador para que pueda ser utilizado por las rutas
module.exports = removeFromCart;
