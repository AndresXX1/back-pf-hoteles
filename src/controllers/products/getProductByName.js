const { Product } = require("../../db");
const { Sequelize } = require("sequelize");

const getProductByName = async (name) => {
  const productByName = await Product.findAll({
    where: {
      [Sequelize.Op.or]: [
        {
          name: {
            [Sequelize.Op.iLike]: `%${name}%`,
          },
        },
        Sequelize.literal(`"Product"."location"::text ILIKE '%${name}%'`),
        Sequelize.literal(`"Product"."season"::text ILIKE '%${name}%'`)
    
      ],
    },
  });


  const results = productByName.map(product => ({
    id: product.id,
    name: product.name,
    location: product.location, 
    season: product.season, 
    pricePerNight: `${product.pricePerNight} ars$ the night per person`, 
    totalRooms: product.totalRooms, 
    pool: product.pool, 
    req: req, 
    image: image, 
  }));
    
    return results; 

};

module.exports = getProductByName;