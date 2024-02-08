const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Offer",
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
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      
      pool: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};