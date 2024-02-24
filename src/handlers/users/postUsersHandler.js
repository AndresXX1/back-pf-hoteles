const { postUser } = require("../../controllers/users/postUsersDb");

const postUsersHandler = async (req, res) => {
  const { name, surName, email, password, rol, googleId } = req.body;
   
  try {
    console.log("Handling user creation:", req.body);
    const response = await postUser(name, surName, email, password, rol, googleId);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error handling user creation:", error);
    if (error.message === "Ya existe un usuario registrado con este email") {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  }
};


module.exports = postUsersHandler;