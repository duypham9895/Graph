const jwt = require('jsonwebtoken');

module.exports = auth = (req, res, next) => {
	const token = req.header('x-auth-token');

	if (token === null || token === undefined) {
		console.log('hi');
		return res.status(401).json({ msg: 'Unauthorize.' });
	}
	console.log(token);
	jwt.verify(token, 'ngochuyou', (err, id) => {
		if(id === undefined) {
			return res.status(401).json({ msg: 'Unauthorize.' });
		}

		next();
	})
}