const { Reservas } = require('../../db');

const success = async (req, res) => {
    const { preference_id } = req.query;

    // Obtiene el paymentId del objeto devuelto por Mercado Pago
    const paymentId = preference_id;
	console.log("esto es payment: ", paymentId);

    // Actualiza la reserva en la base de datos con reserved = "success"

	const reserva = await Reservas.findOne({

        where: {
            paymentId: paymentId
        },
    })

	if(reserva){
		
		await Reservas.update(
            { 
                reserved: "success"
            },
            {
                where: {
                    id : reserva.id
                } 
            }
        )
		
	}
	console.log("Pago realizado", reserva);

	res.redirect("http://localhost:5173/");

};

module.exports = success;
