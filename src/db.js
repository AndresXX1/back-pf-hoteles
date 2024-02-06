require("dotenv").config();
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, NODE_ENV } = process.env;
const productsModel = require("./models/productsModel");
const reviewsModel = require("./models/reviewsModel");
const usersModel = require("./models/usersModel");
const cartModel = require("./models/cartModel"); 
const cartItemsModel = require("./models/cartItemsModel"); 
const { Sequelize } = require("sequelize");

let sequelize;

if (NODE_ENV === "production") {
  sequelize = new Sequelize({
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: 5432, // Puerto predeterminado de PostgreSQL
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
    native: false,
  });
} else {
  sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
    native: false,
  });
}

productsModel(sequelize);
reviewsModel(sequelize);
usersModel(sequelize);
cartModel(sequelize); 
cartItemsModel(sequelize); 

const { Review, Product, User, Cart, CartItem } = sequelize.models; 

Product.hasMany(Review, { foreignKey: "productId", as: "review" });
Review.belongsTo(Product, { foreignKey: "productId", as: "review" });

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Cart, { foreignKey: "userId" }); 
Cart.belongsTo(User, { foreignKey: "userId" }); 

Cart.hasMany(CartItem, { foreignKey: "cartId" }); 
CartItem.belongsTo(Cart, { foreignKey: "cartId" }); 

Product.hasMany(CartItem, { foreignKey: "productId" }); 
CartItem.belongsTo(Product, { foreignKey: "productId" }); 

module.exports = { sequelize, Product, Review, User, Cart, CartItem }; 
