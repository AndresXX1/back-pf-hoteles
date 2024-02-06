const { sequelize } = require("./src/db");
const { Product } = require("./src/db");
const server = require("./src/server");

const PORT = process.env.PORT || 3000;

// Verificar la conexión a la base de datos antes de sincronizar los modelos
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    // Sincronizar modelos después de la conexión exitosa
    return sequelize.sync({ force: true });
  })
  .then(async () => {
    // Consultar productos después de la sincronización exitosa
    const allProducts = await Product.findAll();
    if (!allProducts.length) {
      console.log("No products found in the database.");
    } else {
      console.log("Database loaded with products.");
    }
    // Iniciar el servidor después de cargar la base de datos
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });