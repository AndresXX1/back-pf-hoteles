const axios = require("axios");
const { Product } = require("../../db");
const allProducts = async () => {
  const response = await Product.findAll();
  const mappedSneakers = response.map((ofer) => ({
    id: ofer.id,
    name: ofer.name,
    location: ofer.location,
    season: ofer.season,
    pricePerNight: ofer.pricePerNight,
    totalRooms: ofer.totalRooms,
    pool: ofer.pool,
    image: ofer.image
  }));
  console.log("se ingresaron correctamente");
  return  mappedSneakers;
};
module.exports = {
  allProducts,
};
