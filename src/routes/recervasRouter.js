const { Router } = require("express");
const {createReservation} = require("../controllers/recerba/postRecerva");
const handlerProguctsReservas = require("../controllers/recerba/getProductsReservasHandler");
const reservasByUser = require("../controllers/recerba/getReservasByUser")

const RecerbaRouter = Router();

RecerbaRouter.post("/get", handlerProguctsReservas);
RecerbaRouter.get("/getByUserID", reservasByUser);
RecerbaRouter.post("/new", createReservation);

module.exports = RecerbaRouter;