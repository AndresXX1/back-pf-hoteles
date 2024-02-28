const { Router } = require("express");
const {createReservation} = require("../controllers/recerba/postRecerva");
const handlerProguctsReservas = require("../controllers/recerba/getProductsReservasHandler");
const reservasByUser = require("../controllers/recerba/getReservasByUser")
const handlerProductsIDReservas = require("../handlers/reserva/getReservabyProd")

const RecerbaRouter = Router();

RecerbaRouter.post("/get", handlerProguctsReservas);
RecerbaRouter.get("/getByUserID/:userID", reservasByUser);
RecerbaRouter.post("/new", createReservation);
RecerbaRouter.get("/reservByProduct/:prodID",handlerProductsIDReservas)

module.exports = RecerbaRouter;