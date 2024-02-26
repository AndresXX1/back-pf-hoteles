const getUserByLocalId  = require("../../controllers/users/getUsersbyLocalId");
const allUsersHandler = async (req, res) => {
  const  {idKey}  = req.params;
  try {
    const response = await getUserByLocalId(idKey);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(`Error with this userId${idKey}, verify again`);
  }
};

module.exports = allUsersHandler;
