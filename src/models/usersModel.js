const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      googleId:{
        type: DataTypes.STRING,
        allowNull:true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rol: {
        type: DataTypes.ENUM("admin", "buyer"),
        allowNull: false,
        defaultValue: "buyer",
      },
      compras: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
      },
      paymentMethods: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
      },
      banned: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bannedAt: { 
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};