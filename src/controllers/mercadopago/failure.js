const { Reservas } = require('../../db');

const failure = async (req, res) => {
    const { preference_id } = req.query;

    // Obtiene el paymentId del objeto devuelto por Mercado Pago
    const paymentId = preference_id;

    // Actualiza la reserva en la base de datos con reserved = "failure"

	const reserva = await Reservas.findOne({

        where: {
            paymentId: paymentId
        },
    })

	if(reserva){
		
		await Reservas.update(
            { 
                reserved: "failure"
            },
            {
                where: {
                    id : reserva.id
                } 
            }
        )
		
	}
	console.log("Pago reachazado", reserva);

	res.redirect("http://localhost:5173/");

};

module.exports = failure;
