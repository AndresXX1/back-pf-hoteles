const { MercadoPagoConfig, Preference } = require ('mercadopago');
const { Product, User, Reservas } = require('../../db');
const nodemailer = require('nodemailer');
require("dotenv").config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });
console.log(ACCESS_TOKEN);

const createOrder = async (productId, userId, startDate, endDate, quantity, totalGuests) => {
    
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
        return { error: 'User or product not found' };
    }

    // Calcula el monto total a pagar
    const pricePerNight = product.dataValues.pricePerNight;
    const totalAmount = pricePerNight * quantity;

    const totalRooms = product.dataValues.totalRooms
    console.log(product.dataValues.name)

    const body = {

        items:[
            {
                title: `${product.dataValues.name}`,
                quantity: quantity,
                unit_price: Number(product.dataValues.pricePerNight),
                currency_id: "ARS",
                payer: {
                    email: `${user.dataValues.email}`
                },
            },
        ],

        back_urls: {
            success: "http://localhost:3003/payment/success",
            failure: "http://localhost:3003/payment/failure",
            pending: "http://localhost:3003/payment/pending",
        },

        auto_return: "approved",

        notification_url: "https://6736-190-190-85-204.ngrok-free.app/payment/webhook"
    };

    // Crea preferencia en Mercado Pago
    const preference = new Preference(client);

    const result = await preference.create({ body });

    const paymentId = result.id

    // Crea un nuevo objeto de reserva
    const newReserva = await Reservas.create({ productId, userId, startDate, endDate, totalAmount, paymentId, totalRooms, totalGuests });

    // Redireccionar al usuario a la página de pago de Mercado Pago
    return ({link:result.init_point, preferenceId:result.id});
};

module.exports = createOrder;
