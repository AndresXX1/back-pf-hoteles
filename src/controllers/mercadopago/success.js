const success = (req, res) => {
	console.log(req.query);
	// res.send("Pago realizado");
	res.redirect("http://localhost:5173/")
};

module.exports = success;