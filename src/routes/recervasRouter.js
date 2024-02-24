const { Router } = require("express");
const {createReservation} = require("../controllers/recerba/postRecerva");
const handlerProguctsReservas = require("../controllers/recerba/getProductsReservasHandler");

const RecerbaRouter = Router();

RecerbaRouter.post("/get", handlerProguctsReservas);
RecerbaRouter.post("/new", createReservation);

module.exports = RecerbaRouter;