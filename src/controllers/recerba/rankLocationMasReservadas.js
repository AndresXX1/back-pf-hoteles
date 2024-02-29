const { Reservas, Product, sequelize } = require('../../db');



async function getTopLocationsWithProductData(req, res) {
    try {
      const topLocations = await Reservas.findAll({
        attributes: [
          'productId',
          [sequelize.fn('COUNT', sequelize.col('Reservas.productId')), 'reservationCount'],
          [sequelize.col('Product.id'), 'productId'], 
          [sequelize.col('Product.name'), 'productName'],
          [sequelize.col('Product.location'), 'productLocation'],
         
        ],
        include: [{ model: Product, attributes: [] }], 
        group: ['Reservas.productId', 'Product.id', 'Product.name', 'Product.location'], 
        order: [[sequelize.fn('COUNT', sequelize.col('Reservas.productId')), 'DESC']], 
        limit: 10,
      });
  
      res.json(topLocations);
    } catch (error) {
      console.error('Error al obtener el ranking de localidades con datos de producto:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  module.exports = {
    getTopLocationsWithProductData,
  };