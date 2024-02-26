const { Review } = require("../../db");

const getReviewsByUserID = async (req, res) => {
    const  {prodID}  = req.params;
    const { userID } = req.body;

    try {
        const reviews = await Review.findAll({ where: { userID, productId: prodID } });

        if (reviews && reviews.length > 0) {
            return res.status(200).json({ reviews });
        } else {
            return res.status(404).json({ message: "No hay reviews hechas por el usuario especificado para el producto especificado" });
        }
    } catch (error) {
        console.error("Error al buscar reviews:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = getReviewsByUserID;