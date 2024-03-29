// const { Router } = require("express");
// const {createReservation} = require("../controllers/recerba/postRecerva");
// const handlerProguctsReservas = require("../controllers/recerba/getProductsReservasHandler");

// const reservasByUser = require("../controllers/recerba/getReservasByUser");
// const {getTopLocationsWithProductData} = require ("../controllers/recerba/rankLocationMasReservadas");


// const RecerbaRouter = Router();

// RecerbaRouter.post("/get", handlerProguctsReservas);
// RecerbaRouter.get("/getByUserID/:userID", reservasByUser);
// RecerbaRouter.post("/new", createReservation);

// RecerbaRouter.get("/reservByProduct/:prodID",handlerProductsIDReservas)//suibr

// RecerbaRouter.get("/rankLocation", getTopLocationsWithProductData);



// module.exports = RecerbaRouter;

const { Router } = require("express");
const {createReservation} = require("../controllers/recerba/postRecerva");
const handlerProguctsReservas = require("../controllers/recerba/getProductsReservasHandler");
const reservasByUser = require("../controllers/recerba/getReservasByUser")
const {getTopLocationsWithProductData} = require ("../controllers/recerba/rankLocationMasReservadas");

const reservasPorID = require("../handlers/reserva/getReservabyProd")

const RecerbaRouter = Router();

RecerbaRouter.post("/get", handlerProguctsReservas);
RecerbaRouter.get("/getByUserID/:userID", reservasByUser);
RecerbaRouter.post("/new", createReservation);
RecerbaRouter.get("/reservByProduct/:prodID", reservasPorID)
RecerbaRouter.get("/rankLocation", getTopLocationsWithProductData);

module.exports = RecerbaRouter;