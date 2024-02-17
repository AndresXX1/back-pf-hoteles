require("dotenv").config();
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, NODE_ENV } = process.env;
const productsModel = require("./models/productsModel");
const reviewsModel = require("./models/reviewsModel");
const usersModel = require("./models/usersModel");
const cartModel = require("./models/cartModel")

const { Sequelize } = require("sequelize");

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: "railway",
        username: "postgres",
        password: "*5CDb3b33aBafefDc5c-ggc-46cD-dDE",
        host: "monorail.proxy.rlwy.net",
        port: 41778,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
        native: false,
      })
    : 
    new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          logging: false,
          native: false,
        }
      );

productsModel(sequelize);
reviewsModel(sequelize);
usersModel(sequelize);
cartModel(sequelize);

const { Review, Product, User, Cart } = sequelize.models; 

Product.hasMany(Review, { foreignKey: "productId", as: "review" });
Review.belongsTo(Product, { foreignKey: "productId", as: "review" });

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' }); 






module.exports = { sequelize, Product, Review, User, Cart}; 
