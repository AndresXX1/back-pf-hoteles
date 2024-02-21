const success = (req, res) => {
	
	console.log(req.query), "Pago realizado";

	res.redirect("http://localhost:5173/")
};

module.exports = success;