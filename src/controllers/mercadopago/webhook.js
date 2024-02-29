const {Payment, MercadoPagoConfig, Preference } = require('mercadopago')

const ACCESS_TOKEN = "TEST-6077027000073308-021516-0afa6250aab64c3e4ede6757c0e353dc-1685251308"

const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });

const prefecerence = new Preference(client);

const webhook = async (req, res) => {

	const {data, type} = req.body

	if (type && type === 'payment'){
		
		prefecerence.search({options:{external_reference: data.id}}).then(console.log).catch(console.log);
	}

	console.log("esto es webhook",req.body);
	res.send("Procesando pago...")
}

module.exports = webhook;