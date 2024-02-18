const { Router } = require("express");
const addItems = require("../controllers/cart/addItemsController");
const deleteItems = require("../controllers/cart/deleteItemsController")
const getCart = require("../handlers/cart/getCartItemsHandler");//dfsfdsfdsfds


const favoritesRouter = Router();

favoritesRouter.post("/add", addItems);
favoritesRouter.delete("/delete", deleteItems);
favoritesRouter.get("/get/:id", getCart);//dbfhdsbfdbfjdsbjf


module.exports = favoritesRouter;//sapefgfdgfd


