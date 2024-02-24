const { Review } = require("../../db");

const getReviewsByUserID = async (req, res) => {
    const { userID } = req.body;

    try {
        const reviews = await Review.findAll({ where: { userID } });

        if (reviews && reviews.length > 0) {
            return res.status(200).json({ reviews });
        } else {
            return res.status(404).json({ message: "No reviews found for the given userID" });
        }
    } catch (error) {
        console.error("Error while retrieving reviews:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = getReviewsByUserID;