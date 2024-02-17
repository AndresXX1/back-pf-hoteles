const { MercadoPagoConfig, Payment, Preference } = require ('mercadopago');
const { Product, User } = require('../../db');
const card = require('./creditCard.json')
require("dotenv").config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });
console.log(ACCESS_TOKEN)

const payment = new Payment(client)

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
    
    // Registrar la compra en la base de datos del usuario
    // const compra = {
    //     primaryKey: preference.Id,
    //     productId: product.dataValues.id,
    //     productName: product.dataValues.name,
    //     quantity: quantity,
    //     totalAmount: totalAmount,
    //     userEmail: user.dataValues.email,
    // };

    // User.compras.push(compra);
    // await user.save();

    // Redireccionar al usuario a la página de pago de Mercado Pago
    return(result.init_point);

};

module.exports = createOrder;