const { Reservas } = require('../../db');
const { Op } = require('sequelize');
const moment = require('moment')

const getProductsIDReservas = async (prodID) => {

        const reservas = await Reservas.findAll({
            where: {
                productId: prodID,
                reserved: {
                    [Op.in]: ["success", "pending"]
                }
    
            }
        });

        console.log(reservas.length)

        if (!reservas || reservas.length === 0) {
            console.log("No se encontraron reservas para el producto con ID:", prodID);
            return []; // Devuelve un arreglo vacío si no se encuentran reservas
        }
    
        return reservas.map(reserva => ({
            startDate: moment(reserva.startDate).format('YYYY-MM-DD'),
            endDate: moment(reserva.endDate).format('YYYY-MM-DD')
        }));

};

module.exports = getProductsIDReservas;