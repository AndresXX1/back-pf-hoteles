const getProductsIDReservas = require("../../controllers/recerba/reservasByProdGet")

const handlerProductsIDReservas = async (req, res) =>{

    const prodID  = req.params.prodID;
    console.log( "this ===>", prodID)
    try {
        
        const reservas = await getProductsIDReservas(prodID)


        return res.status(200).json(reservas);
        

    } catch (error) {

        console.log("Error en el controlador de reservas", error);
        return res.status(400).json(error.message)
    }
}

module.exports = handlerProductsIDReservas;