const { sequelize } = require("./src/db");
const server = require("./src/server");

const startServer = async () => {
  await sequelize.sync({ force: false });
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
  });
};

startServer();