const { Reservas } = require("../../db");

const createReservation = async (req, res) => {
  try {
    const { productId, userId, startDate, endDate, totalRooms, totalGuests, customerName, customerEmail, customerPhone } = req.body;
    const reservation = await Reservas.create({ 
      productId, 
      userId, 
      startDate, 
      endDate, 
      totalRooms, 
      totalGuests, 
    });
    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createReservation,
};