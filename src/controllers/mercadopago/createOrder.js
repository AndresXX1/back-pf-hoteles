const { MercadoPagoConfig, Payment, Preference } = require ('mercadopago');
const { Product, User } = require('../../db');
const nodemailer = require('nodemailer');
const card = require('./creditCard.json')
require("dotenv").config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });
console.log(ACCESS_TOKEN)

const createOrder = async (productId, userId, quantity, card ) => {

    const user = await User.findByPk(userId)

    const product = await Product.findByPk(productId)

    if (!user || !product) {

        return( {quantity,user, product, error: 'user o product not found'} );
    }

    // Calcula el monto total a pagar
    const pricePerNight = product.dataValues.pricePerNight;
    const totalAmount = pricePerNight * quantity;


    const body = {

        items:[
            {
                title: `${product.dataValues.name}`,
                quantity: quantity,
                unit_price: Number(product.dataValues.pricePerNight),
                currency_id: "ARS",
                payment_method_id: card,
                payer: {
                    email: `${user.dataValues.email}`
                },
            },
        ],

        back_urls: {
            success: "http://localhost:3000/payment/success",
            failure: "http://localhost:3000/payment/failure",
            pending: "http://localhost:3000/payment/pending",
        },

        auto_return: "approved",

        notification_url: "https://6736-190-190-85-204.ngrok-free.app/payment/webhook"
    };

    // Crear preferencia en Mercado Pago
    const preference = new Preference(client);

    const result = await preference.create({body});

    // if(result.init_point){

    //     const transporter = nodemailer.createTransport({
    //         host: 'smtp.gmail.com',
    //         port: 465,
    //         auth: {
    //           user: 'hostelspremium@gmail.com',
    //           pass: 'ldwy ozei rdof zikm',
    //         },
    //       });

    //       const message = {
    //         from: 'hostelspremium@gmail.com',
    //         to: user.dataValues.email,
    //         subject: '¡Se ha realizado una reserva !',
    //         html: `
    //           <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f4f4;">
    //             <h2 style="text-align: center; color: #333; margin-top: 20px;">¡Hola ${user.dataValues.name}!</h2>
    //             <p style="text-align: center; color: #555; font-size: 16px;">Te informamos que tu reserva en HostelPremium se ha procesado correctamente.</p>
    //             <p style="text-align: center; color: #555; font-size: 16px;">Valor de la reserva: ${totalAmount}$ ARS.</p>
    //             <p style="text-align: center; color: #555; font-size: 16px;">Si no realizaste esta acción, por favor contáctanos de inmediato.</p>
    //             <p style="text-align: center; color: #555; font-size: 16px;">¡Gracias por ser parte de HostelPremium!</p>
    //             <p style="text-align: center; color: #888; font-size: 14px;">Atentamente,<br>El equipo de HostelPremium</p>
    //           </div>
    //         `,
    //       };
      
    //       const info = await transporter.sendMail(message);

    //       console.log('Correo electrónico de notificación enviado:', info);

    // }

    // Redireccionar al usuario a la página de pago de Mercado Pago
    return(result.init_point);
};

module.exports = createOrder