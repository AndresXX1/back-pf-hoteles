// const { sequelize } = require("./src/db");
// const server = require("./src/server");

// const startServer = async () => {
//   await sequelize.sync({ force: false });
//   server.listen(process.env.PORT || 3000, () => {
//     console.log(`Server listening on port ${process.env.PORT || 3000}`);
//   });
// };

// startServer();

const express = require('express');
const { sequelize } = require('./src/db');
const serverRoutes = require('./src/server');

const app = express();

// Aquí puedes agregar cualquier middleware que necesites
// app.use(...);

// Agrega tus rutas al app
app.use('/', serverRoutes);

// Exporta una función que maneje las solicitudes HTTP
module.exports = async (req, res) => {
  // Inicializa la base de datos si es necesario
  await sequelize.sync({ force: false });

  // Pasa la solicitud y la respuesta a tu aplicación Express
  return app(req, res);
};