const getProguctsReservas  = require('./getProguctsReservas');


const handlerProguctsReservas = async (req, res) =>{

    const { productId } = req.body;

    try {
        
        const reservas = await getProguctsReservas(productId)


        return res.status(200).json(reservas);
        

    } catch (error) {

        console.log("Error en el controlador de reservas", error);
        return res.status(400).json(error.message)
    }
}

module.exports = handlerProguctsReservas;