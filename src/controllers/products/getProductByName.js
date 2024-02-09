const { Product } = require("../../db");
const { Sequelize } = require("sequelize");

const getProductByName = async (name) => {
  const productByName = await Product.findAll({
    where: {
      name: {
        [Sequelize.Op.iLike]: `%${name}%`,
      },
    },
  });

  const results = productByName.map(product => ({
      id: product.id,
      name: product.name,
      location: product.location,
      season: product.season,
      totalRooms: product.totalRooms,
      pool: product.pool,
      pricePerNight: `${product.pricePerNight} ars$ the night per person`,
      image: product.image,
  }));

  return results;
};

module.exports = getProductByName;