const { User, Cart } = require("../../db");


const postUser = async (name, surName, email, password, rol) => {
  try {
    const maxId = await User.max("id");
    const newId = maxId + 1;
    const user = await User.create({
      id: newId,
      name,
      surName,
      email,
      password,
      rol
    });

    const cart = await Cart.create({ userId: user.id });

    await sendWelcomeEmail(name, surName, email);

    return user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};


module.exports = { postUser };