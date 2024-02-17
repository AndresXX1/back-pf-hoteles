const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User', 
          key: 'id' 
        }
      },
      productId:{
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false 
       }
    },
    { timestamps: false, freezeTableName: true }
  );
};
