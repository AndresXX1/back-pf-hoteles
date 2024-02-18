const createOrder  = require('./createOrder');


const handlerOrder = async (req, res) =>{

    const {
		productId,
        userId,
        quantity,
        card
	} = req.body;

    try {
        
        const order = await createOrder(productId, userId, quantity, card)

        return res.status(200).json(order);
        

    } catch (error) {

        console.log("Error en el controlador de orders", error);
        return res.status(400).json(error.message)
    }
}

module.exports = handlerOrder;