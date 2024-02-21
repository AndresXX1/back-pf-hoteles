const { Router } = require("express");
const {createReservation} = require("../controllers/recerba/postRecerva");

const RecerbaRouter = Router();

RecerbaRouter.post("/new", createReservation);

module.exports = RecerbaRouter;