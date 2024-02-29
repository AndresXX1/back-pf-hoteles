const { Reservas, User } = require('../../db');
const nodemailer = require('nodemailer');

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
    
    const user = await User.findByPk(reserva.userId)
     
    await sendNotificationEmail(user.name, user.email, reserva.totalAmount);

	res.redirect("https://pf-front-hoteler-a-y-turismo.vercel.app/");

    // console.log("esto es un console log de user ===>" ,user.dataValues.name, user.dataValues.email, reserva.dataValues.totalAmount)
};

const sendNotificationEmail = async (name, email, totalAmount) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Usar SSL
        auth: {
            user: 'hostelspremium@gmail.com',
            pass: 'ldwy ozei rdof zikm',
        },
        tls: {
            // Deshabilitar la verificación del certificado SSL
            rejectUnauthorized: false
        }
    });
    
    try {
        const message = {
            from: 'hostelspremium@gmail.com',
            to: email,
            subject: '¡Tu reserva en HostelPremium se ha procesado exitosamente!',
            html: `
                <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f4f4;">
                <h2 style="text-align: center; color: #333; margin-top: 20px;">¡Hola ${name}!</h2>
                <p style="text-align: center; color: #555; font-size: 16px;">Te informamos que tu reserva en HostelPremium ha sido procesada correctamente.</p>
                <p style="text-align: center; color: #555; font-size: 16px;">Valor total de la reservación: $${totalAmount} ARS.</p>
                <p style="text-align: center; color: #555; font-size: 16px;">Si no realizaste esta acción, por favor contáctanos de inmediato.</p>
                <p style="text-align: center; color: #555; font-size: 16px;">¡Gracias por ser parte de HostelPremium!</p>
                <p style="text-align: center; color: #888; font-size: 14px;">Atentamente,<br>El equipo de HostelPremium</p>
                </div>
        `,
        };
    
        const info = await transporter.sendMail(message);
        console.log('Correo electrónico de notificación enviado:', info);
    } catch (error) {
        console.error('Error al enviar el correo electrónico de notificación:', error);
        throw error;
    } finally {
        transporter.close();
    }
}

module.exports = success;