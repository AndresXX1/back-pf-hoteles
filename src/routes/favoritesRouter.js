const { Router } = require("express");
const addItems = require("../controllers/cart/addItemsController");
const deleteItems = require("../controllers/cart/deleteItemsController")



const favoritesRouter = Router();

favoritesRouter.post("/add", addItems);
favoritesRouter.delete("/delete", deleteItems);



module.exports = favoritesRouter;


