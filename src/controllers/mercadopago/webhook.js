const webhook = async (req, res) => {
	console.log(req.query);
	res.send("Procesando pago...")
}

module.exports = webhook;