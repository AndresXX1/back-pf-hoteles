const { MercadoPagoConfig, Preference } = require ('mercadopago');
const { Product, User, Reservas } = require('../../db');
const nodemailer = require('nodemailer');
require("dotenv").config();
const ACCESS_TOKEN = "TEST-6077027000073308-021516-0afa6250aab64c3e4ede6757c0e353dc-1685251308"

const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });
console.log(ACCESS_TOKEN);

const createOrder = async (productId, userId, startDate, endDate, quantity, totalGuests) => {
    
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);
    const totalRooms = product.dataValues.totalRooms

    const capacidad = totalRooms * 2

    if (!user || !product) {
        return { error: 'User or product not found' };
    }

    if (capacidad < totalGuests) {
        return { error: "there's no capacity for that many guests" };
    }

    // Calcula el monto total a pagar
    const pricePerNight = product.dataValues.pricePerNight * 1.5;
    const totalAmount = pricePerNight * quantity;

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
            success: "https://back-hostel.onrender.com/payment/success",
            failure: "https://back-hostel.onrender.com/payment/failure",
            pending: "https://back-hostel.onrender.com/payment/pending",
        },

        auto_return: "approved",

        notification_url: "https://back-hostel.onrender.com/payment/webhook"
    };

    // Crea preferencia en Mercado Pago
    const preference = new Preference(client);

    const result = await preference.create({ body });
    //Guarda la preference_id 
    const paymentId = result.id

    // Crea un nuevo objeto de reserva
    const newReserva = await Reservas.create({ productId, userId, startDate, endDate, totalAmount, paymentId, totalRooms, totalGuests });

    // Redirecciona al usuario a la API de pago de Mercado Pago
    return ({link:result.init_point, preferenceId:result.id})
};

module.exports = createOrder;
