const { Reservas } = require('../../db');

const getProductsReservas = async (productId) => {

        const reservas = await Reservas.findAll({
            where: {
                productId: productId,
                reserved: ["success", "pending"]
            }
        });

        console.log(reservas)

        if(!reservas){

            console.log("Error al obtener las reservas");
            throw new Error("Error al obtener las reservas");
    
        }

        // Filtra las reservas para excluir los estados "pending" y "failure"
        // const filteredReservas = reservas.filter(reserva => !["pending", "failure"].includes(reserva.reserved));

        return reservas;

};

module.exports = getProductsReservas;
