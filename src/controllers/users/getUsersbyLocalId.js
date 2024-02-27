const axios = require("axios");
const { User } = require("../../db");
const getUserByLocalId = async (idKey) => {
  const response = await User.findOne({ where: {
    id: idKey
  } });
  if (response) {
    const result = {
      id: response.id,
      googleId: response.googleId,
      name: response.name,
      surName: response.surName,
      email: response.email,
      password: response.password,
      country: response.country,
      phone: response.phone,
      address: response.address,
      profilePicture: response.profilePicture
    };
    console.log("op");
    return result;
  }
};

module.exports = getUserByLocalId;