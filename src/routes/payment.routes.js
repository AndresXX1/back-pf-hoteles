const express = require("express");
const handlerOrder = require("../controllers/mercadopago/createOrderHandler");
const paymentRouter = express.Router();

const webhook = require("../controllers/mercadopago/webhook");
const success = require("../controllers/mercadopago/success");
const failure = require("../controllers/mercadopago/failure");

// Crear orden de pago
paymentRouter.post("/create-order", handlerOrder);

// Pago exitoso
paymentRouter.get("/success", success);

// Pago rechazado
paymentRouter.get("/failure", failure)

// Pago pendiente
paymentRouter.get("/pending", (req, res) => {
	return res.status(200).send("GET /pending");
});

// Escuchar eventos previo a la resolución
paymentRouter.post("/webhook", webhook);

module.exports = paymentRouter;