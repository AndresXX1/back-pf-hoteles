const { Router } = require("express");
const productsRouter = require("./productsRouter");
const paymentRouter = require("./payment.routes");
const reviewsRouter = require("./reviewsRouter");
const usersRouter = require("./usersRouter");
const favoritesRouter = require("./favoritesRouter")


const mainRouter = Router();

mainRouter.use("/products", productsRouter);
mainRouter.use("/reviews", reviewsRouter);
mainRouter.use("/payment", paymentRouter)
mainRouter.use("/users", usersRouter);
mainRouter.use("/favorites", favoritesRouter)

module.exports = mainRouter;
