const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        indexes: [
          {
            fields: ["location", "season"],
          },
        ],
      },
      pricePerNight: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      season: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      totalRooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pool: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};