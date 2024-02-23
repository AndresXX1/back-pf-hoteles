const axios = require("axios");
const { User } = require("../../db");
const getUserById = async (idKey) => {
  const stringifiedGoogleId = idKey.toString()
  const response = await User.findOne({ where: {
    googleId: stringifiedGoogleId
  } });
  if (response) {
    const result = {
      id: response.id,
      name: response.name,
      surName: response.surName,
      email: response.email,
      password: response.password,
    };
    console.log("op");
    return result;
  }
};

module.exports = {
  getUserById,
};
