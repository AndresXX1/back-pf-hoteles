const { Reservas } = require('../../db');

const getReservasByUser = async (req, res) => {
    const {userID} = req.params;
    console.log("esto llega ==>", userID)
    try {
        const reservas = await Reservas.findAll({
            where: {
                userId: userID,
                reserved: "success"
            }
        });
        if (reservas.length > 0) {
            return res.status(200).json(reservas);
        } else {
            return res.status(404).json({ message: 'No se encontraron reservas para el usuario proporcionado.' });
        }
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = getReservasByUser
