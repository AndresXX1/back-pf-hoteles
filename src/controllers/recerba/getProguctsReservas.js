const { Reservas } = require('../../db');

const getProductsReservas = async (productId, userId, reserved) => {

        const reservas = await Reservas.findAll({
            where: {
                productId: productId,
                userId,
                reserved: reserved
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
