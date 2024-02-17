const { Cart } = require('../../db');

// Define la función del controlador
const addToCart = async (req, res) => {
    try {
        // Extrae userId y productId del cuerpo de la solicitud
        const { userId, productId } = req.body;

        // Verifica si userId y productId están presentes en la solicitud
        if (!userId || !productId) {
            return res.status(400).json({ error: 'UserId y ProductId son campos obligatorios.' });
        }

        // Busca el carrito del usuario
        let cart = await Cart.findOne({ where: { userId } });

        // Si no hay un carrito para ese usuario, crea uno nuevo
        if (!cart) {
            cart = await Cart.create({ userId, productId: [productId] });
        } else {
            // Si el carrito ya existe, agrega el productId al arreglo existente
            cart.productId.push(productId);
            await cart.save();
        }

        // Retorna una respuesta exitosa
        return res.status(201).json({ message: 'Producto agregado al carrito correctamente.' });
    } catch (error) {
        // Maneja los errores
        console.error('Error al agregar producto al carrito:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Exporta el controlador para que pueda ser utilizado por las rutas
module.exports = addToCart;
